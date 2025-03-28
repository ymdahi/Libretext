import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {grey} from "@material-ui/core/colors";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import {Divider} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";


const target = document.createElement("div");
// noinspection JSValidateTypes
target.id = Math.random() * 100;
// noinspection XHTMLIncompatabilitiesJS
document.currentScript.parentNode.insertBefore(target, document.currentScript);


const useStyles = makeStyles({
    flexToggleGroup: {
        display: 'flex',
        '& .MuiToggleButtonGroup-grouped': {
            flex: 1
        }
    },
});
const urlParams = new URLSearchParams(window.location.search);
const orderID = urlParams.get('order');

const steps = [{status: 'VERIFIED', name: 'RECEIVED', message: 'Order received by LibreTexts'},
    {status: 'CREATED', name: 'UPLOADED TO LULU', message: 'Order uploaded to Lulu for publishing'},
    {status: 'UNPAID', name: 'WAITING FOR LULU APPROVAL', message: 'Waiting on Lulu approval before proceeding'},
    // {status: 'PAYMENT_IN_PROGRESS', name: 'PAYMENT CONFIRMATION'},
    // {status: 'PRODUCTION_DELAYED', name: 'PRE-PRODUCTION VERIFICATION'},
    {status: 'PRODUCTION_READY', message: 'Order queued for printing'},
    {status: 'IN_PRODUCTION'},
    {status: 'SHIPPED'}];


export default function GetOrder(props) {
    const [order, setOrder] = React.useState();
    
    useEffect(() => {
        (async function () {
            try {
                if (orderID) {
                    let session = await fetch(`https://api.libretexts.org/bookstore/get-order?sessionId=${orderID}`);
                    session = await session.json();
                    
                    switch (session.status) {
                        case 'VERIFIED':
                        case 'CREATED':
                        case 'UNPAID':
                            console.log(`Will reload ${session.status} at ${new Date(Date.now() + 600000)}`)
                            setTimeout(function () {
                                window.location.reload();
                            }, 600000)
                            break;
                        case 'PAYMENT_IN_PROGRESS':
                        case 'PRODUCTION_DELAYED':
                            session.status = 'PRODUCTION_READY';
                            break;
                    }
                    
                    setOrder(session);
                }
            } catch (e) {
                console.log('Error when fetching Checkout session', e);
            }
        })();
    }, []);
    
    const dark = localStorage.getItem('darkMode') === 'true';
    const theme = createMuiTheme({
        palette: {
            type: dark ? 'dark' : 'light',
            primary: {main: '#008000'},
            secondary: {main: '#127bc4'},
            default: grey,
        },
    });
    
    function renderListItems() {
        let trackingURLS = [];
        return <>
            <table className="items" style={{width: '100%', borderSpacing: 0, borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    <th colSpan={3} style={{
                        fontFamily: '"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '0px 0px 0px 0px',
                        border: 'solid 0px #eaecec',
                        padding: '12px',
                        color: '#325f74',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        borderBottom: 'solid 2px #eaecec'
                    }}>Products
                       Ordered
                    </th>
                </tr>
                </thead>
                <tbody>
                {order?.lulu?.line_items.map((item, index) => {
                    const [lib, pageID] = item.external_id.split('-');
                    if (item?.tracking_id)
                        trackingURLS.push(item?.tracking_id)
                    return <tr key={index}>
                        <td>
                            <img
                                src={`https://${lib}.libretexts.org/@api/deki/pages/${pageID}/files/=mindtouch.page%2523thumbnail`}
                                style={{height: 150, width: 150, objectFit: 'contain'}}/>
                        </td>
                        <td>
                            <p className="item-qty" style={{margin: 0}}>Quantity: {item.quantity}</p>
                            <h3 className="product-name-custom"
                                style={{margin: 0, color: "#0080ac", fontWeight: "bold"}}>{item.title}</h3>
                            <p className="sku-custom" style={{marginTop: 0, marginBottom: '0px'}}>
                                <em>{item.external_id}</em></p>
                        </td>
                        <td style={{textAlign: "right"}}>
                            <p>Shipping to <u>{order?.lulu.shipping_address.city},
                                {order?.lulu.shipping_address.state_code}</u> via <i>{order?.lulu.shipping_level}</i>
                            </p>
                            <p>Estimated arrival
                               from <b>{order?.lulu?.estimated_shipping_dates?.arrival_min}</b> to {order?.lulu?.estimated_shipping_dates?.arrival_max}
                            </p>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
            <Divider/>
            {order?.status === "SHIPPED" ? <>
                <p>Tracking numbers: {trackingURLS}</p>
                <a target="_blank"
                   href={`https://www.fedex.com/apps/fedextrack/index.html?tracknumbers=${trackingURLS.join()}`}>
                    {`https://www.fedex.com/apps/fedextrack/index.html?tracknumbers=${trackingURLS.join()}`}
                </a>
                <Divider/>
            </> : null}
        </>
    }
    
    if (!orderID) {
        return <h1>No order ID found. Please add ?order=[[[orderID]]] to the url to pull up your order.
        </h1>
    }
    else if (!order)
        return <><h1>Fetching Order {orderID}</h1>
            <Typography variant="h1"><Skeleton animation="wave"/></Typography>
        </>
    else {
        const selected = steps.find(item => item.status === order.status);
        const selectedIndex = steps.findIndex(item => item.status === order.status);
        if (!selected)
            return <ThemeProvider theme={theme}>
                <Paper id='GetOrder'>
                    <h2>An error has been found with your order lookup.</h2>
                    <h3><b>{order.lulu.status.name}:</b> <i>{order.lulu.status.message}</i></h3>
                    <p>If this is not expected, please contact info@libretexts.org to resolve this issue. Please
                       include your order ID [{orderID}] as part of your email.</p>
                </Paper>
            </ThemeProvider>
        else
            return <ThemeProvider theme={theme}>
                <Paper id='GetOrder' style={{padding: 20}}>
                    <div style={{overflowX: "auto"}}>
                        {order.stripeID.startsWith('cs_test') ? <h1 style={{color: 'orange'}}>BETA ORDER</h1> : null}
                        <h1>Order {order.stripeID}</h1>
                        <Stepper activeStep={selectedIndex} alternativeLabel>
                            {steps.map((item) => {
                                let label = item.name || item.status;
                                label = label.replace(/_/g, ' ');
                                return <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            })}
                        </Stepper>
                        <h2>{selected.message || order.lulu.status.message}</h2>
                    </div>
                    <Divider/>
                    {renderListItems()}
                    <pre>
				{/*{JSON.stringify(order, null, 2)}*/}
			</pre>
                    <p>If you encounter any issues with your order, don't hesitate contact us at <a
                        className='normalLink'
                        href={`mailto:bookstore@libretexts.org?subject=Bookstore Order [${order.stripeID}]`}>bookstore@libretexts.org</a>.
                    </p>
                    <p>Please remember to include your order identifier [{order.stripeID}].</p>
                    <p>Do note that orders are printed on-demand, and as such you order has already been finalized.</p>
                    <h3>Enjoy your purchase!</h3>
                    <img
                        src="https://test.libretexts.org/hagnew/development/public/Henry%20Agnew/Bookstore/images/libretexts_section_complete_bookstore_header.png"
                        alt="LibreTexts" className="linkIcon" title="LibreTexts Bookstore" width="350" height="124"/>
                    <p><Tooltip title={`Version ${new Date("REPLACEWITHDATE")}`}><span> Coded with ❤</span></Tooltip>
                    </p>
                </Paper>
            </ThemeProvider>
    }
}


ReactDOM.render(<GetOrder/>, target);
