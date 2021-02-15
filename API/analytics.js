const timestamp = require("console-timestamp");
const check = require('./checkAuthorization');
const fs = require("fs-extra");
const crypto = require('crypto');
const jose = require('jose');
const secure = require('./secure.json');
const zipLocal = require('zip-local')
const util = require('util');
const express = require('express');
const async = require("async");
const app = express();
const cors = require('cors');
// app.use(cors());

const {
    JWE,   // JSON Web Encryption (JWE)
    JWK,   // JSON Web Key (JWK)
    JWKS,  // JSON Web Key Set (JWKS)
    JWS,   // JSON Web Signature (JWS)
    JWT,   // JSON Web Token (JWT)
    errors // errors utilized by jose
} = jose

//middleware configuration and initialization
const basePath = '/ay';
// app.use(express.static('analyticsSecure'));
let port = 3004;
if (process.argv.length >= 3 && parseInt(process.argv[2])) {
    port = parseInt(process.argv[2]);
}
app.listen(port, () => {
    const now1 = new Date();
    console.log(`Restarted ${timestamp('MM/DD hh:mm', now1)} ${port}`);
});

app.get(basePath + '/ping', (req, res) => {
    res.send('PONG');
});

app.post(basePath + '/receive', express.text(), async (req, res) => {
    res.send('Done');
    // res.status(200).end();
    // console.log(req.body);
    if (!(req.headers.origin && req.headers.origin.endsWith("libretexts.org"))) {
        return res.status(400).end();
    }
    
    let body = req.body;
    try {
        let date = new Date();
        let event = JSON.parse(body);
        let courseName = event.actor.courseName;
        
        let user = event.actor.id.user || event.actor.id;
        if (!courseName || !user)
            return false;
        
        const cipher = crypto.createCipheriv('aes-256-cbc', secure.analyticsSecure, Buffer.from(secure.analyticsSecure, 'hex'));
        
        user = cipher.update(user, 'utf8', 'hex')
        user += cipher.final('hex');
        event.actor.id = user;
        body = JSON.stringify(event);
        
        const datePath = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
        
        if (courseName) {
            if (!Array.isArray(courseName))
                courseName = [courseName];
            for (let i = 0; i < courseName.length; i++) {
                await fs.ensureDir(`./analyticsData/ay-${courseName[i]}/${datePath}`);
                await fs.appendFile(`./analyticsData/ay-${courseName[i]}/${datePath}/${user}.txt`, body + "\n");
                await fs.appendFile(`./analyticsData/ay-${courseName[i]}/${user}.txt`, body + "\n");
            }
        }
    } catch (e) {
        console.error(e);
    }
})

//TODO: Make this work
app.put(basePath + '/secureAccess/:library([a-z]+)-:bookId(\\d+)', express.json(), check, async (req, res) => {
    // res.send('Here\'s some data');
    if (req?.params?.library && req?.params?.library) {
        let courseName = `${req.params.library}-${req.params.bookId}`;
        let filename;
        try {
            filename = await secureAccess(courseName);
        } catch (e) {
            res.status(400);
            res.send(e.message);
            return;
        }
        if (filename) {
            res.sendFile(filename, {root: __dirname});
            return;
        }
    }
    
    //else fallback to failure
    res.status(400);
    res.send('Invalid Request');
});

async function secureAccess(courseName) {
    await fs.emptyDir(`./analyticsData/ZIP/${courseName}/CSV`);
    await fs.emptyDir(`./analyticsData/ZIP/${courseName}/JSON`);
    
    console.log(`Beginning ${courseName}`);
    const stats = await fs.exists(`./analyticsSecure/secureAccess-${courseName}.zip`)
        && await fs.stat(`./analyticsSecure/secureAccess-${courseName}.zip`);

    if (stats && Date.now() - stats.mtime < 10 * 60000) { //10 minute cache
        console.log(`Found ${courseName} in cache`);
    }
    else {
        console.time('Reprocessing');
        let students = await fs.readdir(`./analyticsData/ay-${courseName}`, {withFileTypes: true});
        students = students.filter(f => f.isFile());
        await async.map(students,  async (student) => {
            student = student.name;
            const fileRoot = student.replace('.txt', '');
            let lines = await fs.readFile(`./analyticsData/ay-${courseName}/${student}`);
            lines = lines.toString().replace(/\n$/, "").split('\n');
            lines = lines.map((line) => {
                try {
                    return JSON.parse(line);
                } catch (e) {
                    console.error(`Invalid: ${line}`);
                    return undefined;
                }
            });
            let resultCSV = 'courseName, library, id, platform, verb, pageURL, pageID, timestamp, pageSession, timeMe, beeline status, [type or percent],';
            resultCSV = resultCSV.replace(/,/g, '##');
            
            //CSV Handling
            for (let line of lines) {
                if (!line)
                    continue;
                resultCSV += `\n${line.actor.courseName}##${line.object.subdomain}##${line.actor.id}##${line.actor.platform}##${line.verb}##${line.object.url}##${line.object.id}##"${line.object.timestamp}"##${line.object.pageSession}##${line.object.timeMe}##${line.object.beeline}`;
                switch (line.verb) {
                    case 'left':
                        resultCSV += `##${line.type}`;
                        break;
                    case 'read':
                        resultCSV += `##${line.result.percent}`;
                        break;
                    case 'answerReveal':
                        resultCSV += `##${line.result.answer}`;
                        break;
                }
                
            }
            //escape any commas already in file
            resultCSV = resultCSV.replace(/,/g, '%2C');
            resultCSV = resultCSV.replace(/##/g, ',');
            
            await fs.writeFile(`./analyticsData/ZIP/${courseName}/JSON/${fileRoot}.json`, JSON.stringify(lines));
            await fs.writeFile(`./analyticsData/ZIP/${courseName}/CSV/${fileRoot}.csv`, resultCSV);
        })
        console.timeEnd('Reprocessing');
        
        //create output zipfile
        console.time('Compressing');
        await fs.ensureDir('./analyticsSecure');
        zipLocal.zip = util.promisify(zipLocal.zip);
        let zip = await zipLocal.zip(`./analyticsData/ZIP/${courseName}`);
        zip.compress();
        zip.save = util.promisify(zip.save);
        await zip.save(`./analyticsSecure/secureAccess-${courseName}.zip`);
        
        console.timeEnd('Compressing');
    }
    
    // await fs.emptyDir(`./analyticsData/ZIP/${courseName}`);
    console.log(`Secure Access ${courseName}`);
    
    return `./analyticsSecure/secureAccess-${courseName}.zip`;
}

// createLinker('chem-2737')

//TODO: Get this to work
async function createLinker(courseName) {
    let students = await fs.readdir(`./analyticsData/ay-${courseName}`, {withFileTypes: true});
    let output = '';
    for (const studentsKey of students) {
        if (studentsKey.isFile()) {
            const user = studentsKey.name.replace('.txt', '');
            
            const decipher = crypto.createDecipheriv('aes-256-cbc', secure.analyticsSecure, Buffer.from(secure.analyticsSecure, 'hex'));
            let user2 = decipher.update(Buffer.from(user, 'hex'))
            user2 += decipher.final('utf8');
            
            console.log(user2);
            output += `${user}, ${user2}\n`;
        }
    }
    // await fs.writeFile('linker.csv',output);
    // console.log(output);
}
