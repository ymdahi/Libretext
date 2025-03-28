"use strict";
var CONVERSION_CALCULATOR;
if (localStorage.getItem("beeline") === null || localStorage.getItem("beeline") === "null") {
    localStorage.setItem("beeline", "off");
}
window.addEventListener("load", () => {
    if (Sidebar && !LibreTexts.active.sidebar) {
        LibreTexts.active.sidebar = true;
        Sidebar();
    }
});

async function Sidebar() {
    if (window !== window.top)
        return;
    let param = getParam();
    let tabs = getData(param.pro);
    buildSidebar();
    createBookmarks();
    readability();
    CONVERSION_CALCULATOR = new class {
        constructor() {
            this.property = new Array();
            this.unit = new Array();
            this.factor = new Array();
            this.property[0] = "Acceleration";
            this.unit[0] = new Array("Meter/sq.sec (m/sec^2)", "Foot/sq.sec (ft/sec^2)", "G (g)", "Galileo (gal)", "Inch/sq.sec (in/sec^2)");
            this.factor[0] = new Array(1, .3048, 9.806650, .01, 2.54E-02);
            this.property[1] = "Area";
            this.unit[1] = new Array("Square meter (m^2)", "Acre (acre)", "Are", "Barn (barn)", "Hectare", "Rood", "Square centimeter", "Square kilometer", "Circular mil", "Square foot (ft^2)", "Square inch (in^2)", "Square mile (mi^2)", "Square yard (yd^2)");
            this.factor[1] = new Array(1, 4046.856, 100, 1E-28, 10000, 1011.71413184285, .0001, 1000000, 5.067075E-10, 9.290304E-02, 6.4516E-04, 2589988, .8361274);
            this.property[2] = "Torque";
            this.unit[2] = new Array("Newton-meter (N m)", "Dyne-centimeter(dy cm)", "Kgrf-meter (kgf m)", "lbf-inch (lbf in)", "lbf-foot (lbf ft)");
            this.factor[2] = new Array(1, .0000001, 9.806650, .1129848, 1.355818);
            this.property[3] = "Electricity";
            this.unit[3] = new Array("Coulomb (Cb)", "Abcoulomb", "Ampere hour (A hr)", "Faraday (F)", "Statcoulomb", "Millifaraday (mF)", "Microfaraday (mu-F)", "Picofaraday (pF)");
            this.factor[3] = new Array(1, 10, 3600, 96521.8999999997, .000000000333564, 96.5219, 9.65219E-02, 9.65219E-05);
            this.property[4] = "Energy";
            this.unit[4] = new Array("Joule (J)", "BTU (mean)", "BTU (thermochemical)", "Calorie (SI) (cal)", "Calorie (mean)(cal)", "Calorie (thermo)", "Electron volt (eV)", "Erg (erg)", "Foot-pound force", "Foot-poundal", "Horsepower-hour", "Kilocalorie (SI)(kcal)", "Kilocalorie (mean)(kcal)", "Kilowatt-hour (kW hr)", "Ton of TNT", "Volt-coulomb (V Cb)", "Watt-hour (W hr)", "Watt-second (W sec)");
            this.factor[4] = new Array(1, 1055.87, 1054.35, 4.1868, 4.19002, 4.184, 1.6021E-19, .0000001, 1.355818, 4.214011E-02, 2684077.3, 4186.8, 4190.02, 3600000, 4.2E9, 1, 3600, 1);
            this.property[5] = "Force";
            this.unit[5] = new Array("Newton (N)", "Dyne (dy)", "Kilogram force (kgf)", "Kilopond force (kpf)", "Kip (k)", "Ounce force (ozf)", "Pound force (lbf)", "Poundal");
            this.factor[5] = new Array(1, .00001, 9.806650, 9.806650, 4448.222, .2780139, .4535924, .138255);
            this.property[6] = "Force / Length";
            this.unit[6] = new Array("Newton/meter (N/m)", "Pound force/inch (lbf/in)", "Pound force/foot (lbf/ft)");
            this.factor[6] = new Array(1, 175.1268, 14.5939);
            this.property[7] = "Length";
            this.unit[7] = new Array("Meter (m)", "Angstrom (A')", "Astronomical this.unit (AU)", "Caliber (cal)", "Centimeter (cm)", "Kilometer (km)", "Ell", "Em", "Fathom", "Furlong", "Fermi (fm)", "Foot (ft)", "Inch (in)", "League (int'l)", "League (UK)", "Light year (LY)", "Micrometer (mu-m)", "Mil", "Millimeter (mm)", "Nanometer (nm)", "Mile (int'l nautical)", "Mile (UK nautical)", "Mile (US nautical)", "Mile (US statute)", "Parsec", "Pica (printer)", "Picometer (pm)", "Point (pt)", "Rod", "Yard (yd)");
            this.factor[7] = new Array(1, 1E-10, 1.49598E11, .000254, .01, 1000, 1.143, 4.2323E-03, 1.8288, 201.168, 1E-15, .3048, .0254, 5556, 5556, 9.46055E+15, .000001, .0000254, .001, 1E-9, 1852, 1853.184, 1852, 1609.344, 3.08374E+16, 4.217518E-03, 1E-12, .0003514598, 5.0292, .9144);
            this.property[8] = "Light";
            this.unit[8] = new Array("Lumen/sq.meter (Lu/m^2)", "Lumen/sq.centimeter", "Lumen/sq.foot", "Foot-candle (ft-cdl)", "Foot-lambert", "Candela/sq.meter", "Candela/sq.centimeter", "Lux (lux)", "Phot");
            this.factor[8] = new Array(1, 10000, 10.76391, 10.76391, 10.76391, 3.14159250538575, 31415.9250538576, 1, 10000);
            this.property[9] = "Mass";
            this.unit[9] = new Array("Kilogram (kgr)", "Gram (gr)", "Milligram (mgr)", "Microgram (mu-gr)", "Carat (metric)(ct)", "Hundredweight (long)", "Hundredweight (short)", "Pound mass (lbm)", "Pound mass (troy)", "Ounce mass (ozm)", "Ounce mass (troy)", "Slug", "Ton (assay)", "Ton (long)", "Ton (short)", "Ton (metric)", "Tonne");
            this.factor[9] = new Array(1, .001, 1e-6, .000000001, .0002, 50.80235, 45.35924, .4535924, .3732417, .02834952, .03110348, 14.5939, .02916667, 1016.047, 907.1847, 1000, 1000);
            this.property[10] = "Mass Flow";
            this.unit[10] = new Array("Kilogram/second (kgr/sec)", "Pound mass/sec (lbm/sec)", "Pound mass/min (lbm/min)");
            this.factor[10] = new Array(1, .4535924, .007559873);
            this.property[11] = "Density & Mass capacity";
            this.unit[11] = new Array("Kilogram/cub.meter", "Grain/galon", "Grams/cm^3 (gr/cc)", "Pound mass/cubic foot", "Pound mass/cubic-inch", "Ounces/gallon (UK,liq)", "Ounces/gallon (US,liq)", "Ounces (mass)/inch", "Pound mass/gal (UK,liq)", "Pound mass/gal (US,liq)", "Slug/cubic foot", "Tons (long,mass)/cub.yard");
            this.factor[11] = new Array(1, .01711806, 1000, 16.01846, 27679.91, 6.236027, 7.489152, 1729.994, 99.77644, 119.8264, 515.379, 1328.939);
            this.property[12] = "Power";
            this.unit[12] = new Array("Watt (W)", "Kilowatt (kW)", "Megawatt (MW)", "Milliwatt (mW)", "BTU (SI)/hour", "BTU (thermo)/second", "BTU (thermo)/minute", "BTU (thermo)/hour", "Calorie (thermo)/second", "Calorie (thermo)/minute", "Erg/second", "Foot-pound force/hour", "Foot-pound force/minute", "Foot-pound force/second", "Horsepower(550 ft lbf/s)", "Horsepower (electric)", "Horsepower (boiler)", "Horsepower (metric)", "Horsepower (UK)", "Kilocalorie (thermo)/min", "Kilocalorie (thermo)/sec");
            this.factor[12] = new Array(1, 1000, 1000000, .001, .2930667, 1054.35, 17.5725, .2928751, 4.184, 6.973333E-02, .0000001, .0003766161, .02259697, 1.355818, 745.7, 746, 9809.5, 735.499, 745.7, 69.7333, 4184);
            this.property[13] = "Pressure & Stress";
            this.unit[13] = new Array("Newton/sq.meter", "Atmosphere (normal)", "Atmosphere (techinical)", "Bar", "Centimeter mercury(cmHg)", "Centimeter water (4'C)", "Decibar", "Kgr force/sq.centimeter", "Kgr force/sq.meter", "Kip/square inch", "Millibar", "Millimeter mercury(mmHg)", "Pascal (Pa)", "Kilopascal (kPa)", "Megapascal (Mpa)", "Poundal/sq.foot", "Pound-force/sq.foot", "Pound-force/sq.inch (psi)", "Torr (mmHg,0'C)");
            this.factor[13] = new Array(1, 101325, 98066.5, 100000, 1333.22, 98.0638, 10000, 98066.5, 9.80665, 6894757, 100, 133.3224, 1, 1000, 1000000, 47.88026, 47.88026, 6894.757, 133.322);
            this.property[14] = "Temperature";
            this.unit[14] = new Array("Degrees Celsius ('C)", "Degrees Fahrenheit ('F)", "Degrees Kelvin ('K)", "Degrees Rankine ('R)");
            this.factor[14] = new Array(1, 0.555555555555, 1, 0.555555555555);
            this.tempIncrement = new Array(0, -32, -273.15, -491.67);
            this.property[15] = "Time";
            this.unit[15] = new Array("Second (sec)", "Day (mean solar)", "Day (sidereal)", "Hour (mean solar)", "Hour (sidereal)", "Minute (mean solar)", "Minute (sidereal)", "Month (mean calendar)", "Second (sidereal)", "Year (calendar)", "Year (tropical)", "Year (sidereal)");
            this.factor[15] = new Array(1, 8.640E4, 86164.09, 3600, 3590.17, 60, 60, 2628000, .9972696, 31536000, 31556930, 31558150);
            this.property[16] = "Velocity & Speed";
            this.unit[16] = new Array("Meter/second (m/sec)", "Foot/minute (ft/min)", "Foot/second (ft/sec)", "Kilometer/hour (kph)", "Knot (int'l)", "Mile (US)/hour (mph)", "Mile (nautical)/hour", "Mile (US)/minute", "Mile (US)/second", "Speed of light (c)", "Mach (STP)(a)");
            this.factor[16] = new Array(1, 5.08E-03, .3048, .2777778, .5144444, .44707, .514444, 26.8224, 1609.344, 299792458, 340.0068750);
            this.property[17] = "Viscosity";
            this.unit[17] = new Array("Newton-second/meter", "Centipoise", "Centistoke", "Sq.foot/second", "Poise", "Poundal-second/sq.foot", "Pound mass/foot-second", "Pound force-second/sq.foot", "Rhe", "Slug/foot-second", "Stoke");
            this.factor[17] = new Array(1, .001, .000001, 9.290304E-02, .1, 1.488164, 1.488164, 47.88026, 10, 47.88026, .0001);
            this.property[18] = "Volume & Capacity";
            this.unit[18] = new Array("Cubic Meter (m^3)", "Cubic centimeter", "Cubic millimeter", "Acre-foot", "Barrel (oil)", "Board foot", "Bushel (US)", "Cup", "Fluid ounce (US)", "Cubic foot", "Gallon (UK)", "Gallon (US,dry)", "Gallon (US,liq)", "Gill (UK)", "Gill (US)", "Cubic inch (in^3)", "Liter (new)", "Liter (old)", "Ounce (UK,fluid)", "Ounce (US,fluid)", "Peck (US)", "Pint (US,dry)", "Pint (US,liq)", "Quart (US,dry)", "Quart (US,liq)", "Stere", "Tablespoon", "Teaspoon", "Ton (register)", "Cubic yard");
            this.factor[18] = new Array(1, .000001, .000000001, 1233.482, .1589873, .002359737, .03523907, .0002365882, .00002957353, .02831685, .004546087, .004404884, .003785412, .0001420652, .0001182941, .00001638706, .001, .001000028, .00002841305, .00002957353, 8.8097680E-03, .0005506105, 4.7317650E-04, .001101221, 9.46353E-04, 1, .00001478676, .000004928922, 2.831685, .7645549);
            this.property[19] = "Volume Flow";
            this.unit[19] = new Array("Cubic meter/second", "Cubic foot/second", "Cubic foot/minute", "Cubic inches/minute", "Gallons (US,liq)/minute)");
            this.factor[19] = new Array(1, .02831685, .0004719474, 2.731177E-7, 6.309020E-05);
            // This fragment initializes the this.property dropdown menu using the data defined above in the 'Data Definitions' section
            this.FillMenuWithArray(document.property_form.the_menu, this.property);
            this.UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
            this.UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu);
        }
        
        UpdateUnitMenu(propMenu, unitMenu) {
            // Updates the units displayed in the unitMenu according to the selection of this.property in the propMenu.
            var i;
            i = propMenu.selectedIndex;
            this.FillMenuWithArray(unitMenu, this.unit[i]);
        }
        
        FillMenuWithArray(myMenu, myArray) {
            // Fills the options of myMenu with the elements of myArray.
            // !CAUTION!: It replaces the elements, so old ones will be deleted.
            var i;
            myMenu.length = myArray.length;
            for (i = 0; i < myArray.length; i++) {
                myMenu.options[i].text = myArray[i];
            }
        }
        
        CalculateUnit(sourceForm, targetForm) {
            // A simple wrapper function to validate input before making the conversion
            var sourceValue = sourceForm.unit_input.value;
            // First check if the user has given numbers or anything that can be made to one...
            sourceValue = parseFloat(sourceValue);
            if (!isNaN(sourceValue) || sourceValue == 0) {
                // If we can make a valid floating-point number, put it in the text box and convert!
                sourceForm.unit_input.value = sourceValue;
                this.ConvertFromTo(sourceForm, targetForm);
            }
        }
        
        ConvertFromTo(sourceForm, targetForm) {
            // Converts the contents of the sourceForm input box to the units specified in the targetForm this.unit menu and puts the result in the targetForm input box.In other words, this is the heart of the whole script...
            var propIndex;
            var sourceIndex;
            var sourceFactor;
            var targetIndex;
            var targetFactor;
            var result;
            // Start by checking which this.property we are working in...
            propIndex = document.property_form.the_menu.selectedIndex;
            // Let's determine what this.unit are we converting FROM (i.e. source) and the this.factor needed to convert that this.unit to the base this.unit.
            sourceIndex = sourceForm.unit_menu.selectedIndex;
            sourceFactor = this.factor[propIndex][sourceIndex];
            // Cool! Let's do the same thing for the target this.unit - the units we are converting TO:
            targetIndex = targetForm.unit_menu.selectedIndex;
            targetFactor = this.factor[propIndex][targetIndex];
            // Simple, huh? let's do the math: a) convert the source TO the base this.unit: (The input has been checked by the CalculateUnit function).
            result = sourceForm.unit_input.value;
            // Handle Temperature increments!
            if (this.property[propIndex] == "Temperature") {
                result = parseFloat(result) + this.tempIncrement[sourceIndex];
            }
            result = result * sourceFactor;
            // not done yet... now, b) use the targetFactor to convert FROM the base this.unit
            // to the target this.unit...
            result = result / targetFactor;
            // Again, handle Temperature increments!
            if (this.property[propIndex] == "Temperature") {
                result = parseFloat(result) - this.tempIncrement[targetIndex];
            }
            // Ta-da! All that's left is to update the target input box:
            targetForm.unit_input.value = result;
        }
    };
    
    function readability() {
        $('section.mt-content-container p').css("font-size", sessionStorage.getItem("font_size") + "rem");
        $('section.mt-content-container').css("margin-left", sessionStorage.getItem("page_width") + "px");
        $('section.mt-content-container').css("margin-right", sessionStorage.getItem("page_width") + "px");
        $('section.mt-content-container p').css("text-align", sessionStorage.getItem("text_align"));
        $("#size").val(parseFloat(sessionStorage.getItem("font_size")));
        $("#slider-page-width").val(parseFloat(sessionStorage.getItem("page_width")));
        //$("#toggler-text").val(parseFloat(sessionStorage.getItem("font_size")!));
    }
    
    LibreTexts.TOC(null, "#custom_target");
    LibreTexts.TOC("https://chem.libretexts.org/Courses/Remixer_University/LibreTexts_Construction_Guide", "#construction-guide-put");
    LibreTexts.TOC("https://chem.libretexts.org/Bookshelves/Ancillary_Materials/Reference", "#ref-table-put");
    LibreTexts.TOC("https://chem.libretexts.org/Bookshelves", "#chemistry-guide-put");
    LibreTexts.TOC("https://bio.libretexts.org/Bookshelves", "#biology-guide-put");
    LibreTexts.TOC("https://biz.libretexts.org/Bookshelves", "#business-guide-put");
    LibreTexts.TOC("https://eng.libretexts.org/Bookshelves", "#eng-guide-put");
    LibreTexts.TOC("https://espanol.libretexts.org", "#espanol-guide-put");
    LibreTexts.TOC("https://geo.libretexts.org/Bookshelves", "#geosciences-guide-put");
    LibreTexts.TOC("https://human.libretexts.org/Bookshelves", "#humanities-guide-put");
    LibreTexts.TOC("https://math.libretexts.org/Bookshelves", "#math-guide-put");
    LibreTexts.TOC("https://med.libretexts.org/Bookshelves", "#medicine-guide-put");
    LibreTexts.TOC("https://phys.libretexts.org/Bookshelves", "#physics-guide-put");
    LibreTexts.TOC("https://socialsci.libretexts.org/Bookshelves", "#social-guide-put");
    LibreTexts.TOC("https://stats.libretexts.org/Bookshelves", "#statistics-guide-put");
    LibreTexts.TOC("https://workforce.libretexts.org/Bookshelves", "#workforce-guide-put");
    
    function getSidebar() {
        if (param.pro) {
            switch (param.library) {
                case "chem":
                    return [tabs.header, tabs.home, tabs.resources[param.library], tabs.control, tabs.usage, tabs.developers, tabs.libraries, tabs.community];
                default:
                    return [tabs.header, tabs.home, tabs.resources["default"], tabs.control, tabs.usage, tabs.developers, tabs.libraries, tabs.community];
            }
        }
        else {
            switch (param.library) {
                case "chem":
                    return [tabs.header, tabs.home, tabs.resources[param.library], tabs.control, tabs.usage, tabs.libraries, tabs.community];
                default:
                    return [tabs.header, tabs.home, tabs.resources["default"], tabs.control, tabs.usage, tabs.libraries, tabs.community];
            }
        }
    }
    
    function getParam() {
        var _a;
        const type = $("#pageTagsHolder").text().includes('"article:topic"');
        const [library] = LibreTexts.parseURL();
        const pro = document.getElementById("proHolder").innerText === 'true';
        const title = (_a = document.getElementById("titleHolder")) === null || _a === void 0 ? void 0 : _a.innerText;
        let sidepanel = sessionStorage.getItem("sidepanel");
        let tab;
        let calculators = true;
        if (window.innerWidth <= 450) {
            tab = false;
        }
        else if (sidepanel === null) {
            tab = true;
        }
        else {
            tab = JSON.parse(sidepanel) === true;
        }
        return {
            "type": type,
            "library": library,
            "pro": pro,
            "tabs": tab,
            "calc": calculators,
            "title": title
        };
    }
    
    function buildSidebar() {
        let tabsSidebar = getSidebar();
        let sidebarDiv = document.createElement("div");
        $("body").append(sidebarDiv);
        sidebarDiv.id = "sidebarDiv";
        tabsSidebar = tabsSidebar.join("");
        $(sidebarDiv).append(tabsSidebar);
        $("#sb1, #sb2, #sb3, #sb4, #sb5, #sb6, #sb7").hide();
        if (param.tabs) {
            $("#tabsTrue").addClass("simHover");
        }
        else {
            $("body").append(tabs.open);
            $("#sbHeader").hide();
            $("#tabsFalse").addClass("simHover");
        }
        controlSidebar();
        switchSidebar(param.tabs);
        
        function switchSidebar(tabs) {
            if (tabs) {
                $("#openContents").on("click", function () {
                    $("#sb2, #sb3, #sb4, #sb5, #sb6, #sb7").hide();
                    $("#sb1").toggle("slide");
                });
                $("#openResources").on("click", function () {
                    $("#sb1, #sb3, #sb4, #sb5, #sb6, #sb7").hide();
                    $("#sb2").toggle("slide");
                    if (!window.resourcesTabInitialized) {
                        window.resourcesTabInitialized = true;
                        delete document.getElementById('pubchemWidget').iFrameResizer;
                        delete document.getElementById('physicalConstantsWidget').iFrameResizer;
                        delete document.getElementById('desmosWidget').iFrameResizer;
                        $('#pubchemWidget').attr('src', "https://pubchem.ncbi.nlm.nih.gov/periodic-table/#view=table&embed=true&hide_all_headings=true");
                        iFrameResize({
                            warningTimeout: 0,
                            scrolling: 'omit',
                            checkOrigin: ["https://pubchem.ncbi.nlm.nih.gov"]
                        }, '#pubchemWidget');
                        $('#physicalConstantsWidget').attr('src', "https://chem.libretexts.org/Bookshelves/Ancillary_Materials/Reference/Units_and_Conversions/Physical_Constants?adaptView");
                        iFrameResize({
                            warningTimeout: 0,
                            scrolling: 'omit',
                            checkOrigin: ["https://chem.libretexts.org"]
                        }, '#physicalConstantsWidget');
                        $('#desmosWidget').attr('src', "https://www.desmos.com/scientific");
                        iFrameResize({
                            warningTimeout: 0,
                            scrolling: 'omit',
                            checkOrigin: ["https://desmos.com"]
                        }, '#desmosWidget');
                    }
                });
                $("#openControl").on("click", function () {
                    $("#sb1, #sb2, #sb4, #sb5, #sb6, #sb7").hide();
                    $("#sb3").toggle("slide");
                });
                $("#openUsage").on("click", function () {
                    $("#sb1, #sb2, #sb3, #sb5, #sb6, #sb7").hide();
                    $("#sb4").toggle("slide");
                });
                $("#openLibraries").on("click", function () {
                    $("#sb1, #sb2, #sb3, #sb4, #sb6, #sb7").hide();
                    $("#sb5").toggle("slide");
                });
                $("#openCommunity").on("click", function () {
                    $("#sb1, #sb2, #sb3, #sb4, #sb5, #sb7").hide();
                    $("#sb6").toggle("slide");
                });
                $("#openDevelopers").on("click", function () {
                    $("#sb1, #sb2, #sb3, #sb4, #sb5, #sb6").hide();
                    $("#sb7").toggle("slide");
                });
                $("body").on("click", function (event) {
                    if (!$(event.target).closest('#sidebarDiv').length && !$(event.target).is('#sidebarDiv')) {
                        // @ts-ignore Slide is usable on hide()
                        $("#sb1, #sb2, #sb3, #sb4, #sb5, #sb6, #sb7").hide("slide");
                    }
                });
            }
            else {
                $("#openContents").on("click", function () {
                    $("#sb2, #sb3, #sb4, #sb5, #sb6, #sb7").hide();
                    $("#sb1").toggle();
                });
                $("#openResources").on("click", function () {
                    $("#sb1, #sb3, #sb4, #sb5, #sb6, #sb7").hide();
                    $("#sb2").toggle();
                    if (!window.resourcesTabInitialized) {
                        window.resourcesTabInitialized = true;
                        delete document.getElementById('pubchemWidget').iFrameResizer;
                        delete document.getElementById('physicalConstantsWidget').iFrameResizer;
                        $('#pubchemWidget').attr('src', "https://pubchem.ncbi.nlm.nih.gov/periodic-table/#view=table&embed=true&hide_all_headings=true");
                        iFrameResize({
                            warningTimeout: 0,
                            scrolling: 'omit',
                            checkOrigin: ["https://pubchem.ncbi.nlm.nih.gov"]
                        }, '#pubchemWidget');
                        $('#physicalConstantsWidget').attr('src', "https://chem.libretexts.org/Bookshelves/Ancillary_Materials/Reference/Units_and_Conversions/Physical_Constants?adaptView");
                        iFrameResize({
                            warningTimeout: 0,
                            scrolling: 'omit',
                            checkOrigin: ["https://chem.libretexts.org"]
                        }, '#physicalConstantsWidget');
                    }
                });
                $("#openControl").on("click", function () {
                    $("#sb1, #sb2, #sb4, #sb5, #sb6, #sb7").hide();
                    $("#sb3").toggle();
                });
                $("#openUsage").on("click", function () {
                    $("#sb1, #sb2, #sb3, #sb5, #sb6, #sb7").hide();
                    $("#sb4").toggle();
                });
                $("#openLibraries").on("click", function () {
                    $("#sb1, #sb2, #sb3, #sb4, #sb6, #sb7").hide();
                    $("#sb5").toggle();
                });
                $("#openCommunity").on("click", function () {
                    $("#sb1, #sb2, #sb3, #sb4, #sb5, #sb7").hide();
                    $("#sb6").toggle();
                });
                $("#openDevelopers").on("click", function () {
                    $("#sb1, #sb2, #sb3, #sb4, #sb5, #sb6").hide();
                    $("#sb7").toggle();
                });
                $("body").on("click", function (event) {
                    if (!$(event.target).closest('#sidebarDiv').length && !$(event.target).is('#sidebarDiv')) {
                        // @ts-ignore slide is usable here.
                        $("#sbHeader, #sb1, #sb2, #sb3, #sb4, #sb5, #sb6, #sb7").hide("slide");
                    }
                });
            }
        }
        
        function controlSidebar() {
            window.addEventListener('click', function (event) {
                if (event.target == document.getElementById("custom_open")) {
		    $("#sb2, #sb3, #sb4, #sb5, #sb6, #sb7").hide();
		    $("#sb1, #sbHeader").show("slide");
                }
            });
            $('#per_table').on("click", function () {
                if ($("#iFrameResizer0").is(":hidden")) {
                    $("#iFrameResizer0").slideDown("slow");
                }
                else {
                    $("#iFrameResizer0").slideUp("slow");
                }
            });
            $('#gloss_table').on("click", function () {
                if ($("#gloss_table_put").is(":hidden")) {
                    $("#gloss_table_put").load("https://chem.libretexts.org/Bookshelves/Ancillary_Materials/Reference/Organic_Chemistry_Glossary");
                    $("#gloss_table_put").slideDown("slow");
                }
                else {
                    $("#gloss_table_put").slideUp("slow");
                }
            });
            $('#ref_table').on("click", function () {
                if ($("#ref-table-put").is(":hidden")) {
                    $("#ref-table-put").slideDown("slow");
                }
                else {
                    $("#ref-table-put").slideUp("slow");
                }
            });
            $('#phy_table').on("click", function () {
                if ($("#phy_table_put").is(":hidden")) {
                    $("#phy_table_put").slideDown("slow");
                }
                else {
                    $("#phy_table_put").slideUp("slow");
                }
            });
            $('#DesmosWidget').on("click", function () {
                if ($("#desmosW").is(":hidden")) {
                    $("#desmosW").slideDown("slow");
                }
                else {
                    $("#desmosW").slideUp("slow");
                }
            });
            $('#conv_table').on("click", function () {
                if ($("#conv_table_put").is(":hidden")) {
                    $("#conv_table_put").load("https://chem.libretexts.org/Bookshelves/Ancillary_Materials/Reference/Units_and_Conversions #pageText");
                    $("#conv_table_put").slideDown("slow");
                }
                else {
                    $("#conv_table_put").slideUp("slow");
                }
            });
            $('#conversion_table').on("click", function () {
                if ($("#conversion_table_put").is(":hidden")) {
                    $("#conversion_table_put").slideDown("slow");
                }
                else {
                    $("#conversion_table_put").slideUp("slow");
                }
            });
            $('#construction-guide').on("click", function () {
                if ($("#construction-guide-put").is(":hidden")) {
                    $("#construction-guide-put").slideDown("slow");
                }
                else {
                    $("#construction-guide-put").slideUp("slow");
                }
            });
            $('#library-guide').on("click", function () {
                if ($("#library-guide-put").is(":hidden")) {
                    $("#library-guide-put").slideDown("slow");
                }
                else {
                    $("#library-guide-put").slideUp("slow");
                }
            });
            $('#chemistry-guide').on("click", function () {
                if ($("#chemistry-guide-put").is(":hidden")) {
                    $("#chemistry-guide-put").slideDown("slow");
                }
                else {
                    $("#chemistry-guide-put").slideUp("slow");
                }
            });
            $('#biology-guide').on("click", function () {
                if ($("#biology-guide-put").is(":hidden")) {
                    $("#biology-guide-put").slideDown("slow");
                }
                else {
                    $("#biology-guide-put").slideUp("slow");
                }
            });
            $('#business-guide').on("click", function () {
                if ($("#business-guide-put").is(":hidden")) {
                    $("#business-guide-put").slideDown("slow");
                }
                else {
                    $("#business-guide-put").slideUp("slow");
                }
            });
            $('#eng-guide').on("click", function () {
                if ($("#eng-guide-put").is(":hidden")) {
                    $("#eng-guide-put").slideDown("slow");
                }
                else {
                    $("#eng-guide-put").slideUp("slow");
                }
            });
            $('#espanol-guide').on("click", function () {
                if ($("#espanol-guide-put").is(":hidden")) {
                    $("#espanol-guide-put").slideDown("slow");
                }
                else {
                    $("#espanol-guide-put").slideUp("slow");
                }
            });
            $('#geosciences-guide').on("click", function () {
                if ($("#geosciences-guide-put").is(":hidden")) {
                    $("#geosciences-guide-put").slideDown("slow");
                }
                else {
                    $("#geosciences-guide-put").slideUp("slow");
                }
            });
            $('#humanities-guide').on("click", function () {
                if ($("#humanities-guide-put").is(":hidden")) {
                    $("#humanities-guide-put").slideDown("slow");
                }
                else {
                    $("#humanities-guide-put").slideUp("slow");
                }
            });
            $('#math-guide').on("click", function () {
                if ($("#math-guide-put").is(":hidden")) {
                    $("#math-guide-put").slideDown("slow");
                }
                else {
                    $("#math-guide-put").slideUp("slow");
                }
            });
            $('#medicine-guide').on("click", function () {
                if ($("#medicine-guide-put").is(":hidden")) {
                    $("#medicine-guide-put").slideDown("slow");
                }
                else {
                    $("#medicine-guide-put").slideUp("slow");
                }
            });
            $('#physics-guide').on("click", function () {
                if ($("#physics-guide-put").is(":hidden")) {
                    $("#physics-guide-put").slideDown("slow");
                }
                else {
                    $("#physics-guide-put").slideUp("slow");
                }
            });
            $('#social-guide').on("click", function () {
                if ($("#social-guide-put").is(":hidden")) {
                    $("#social-guide-put").slideDown("slow");
                }
                else {
                    $("#social-guide-put").slideUp("slow");
                }
            });
            $('#statistics-guide').on("click", function () {
                if ($("#statistics-guide-put").is(":hidden")) {
                    $("#statistics-guide-put").slideDown("slow");
                }
                else {
                    $("#statistics-guide-put").slideUp("slow");
                }
            });
            $('#workforce-guide').on("click", function () {
                if ($("#workforce-guide-put").is(":hidden")) {
                    $("#workforce-guide-put").slideDown("slow");
                }
                else {
                    $("#workforce-guide-put").slideUp("slow");
                }
            });
            if (window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('darkMode') === undefined)
                localStorage.setItem('darkMode', 'true');
            if (localStorage.getItem('darkMode') === 'true')
                $('.elm-skin-container').addClass('darkMode');
            $("#size").on("change", function () {
                const initial_data = $(this).val();
                //CHANGE CSS TO SIZE FUNC VALUE
                $('section.mt-content-container p').css("font-size", initial_data + "rem");
                $("#size").val(initial_data);
                //LOG SIZE VALUE AFTER INPUT DATA
                sessionStorage.setItem('font_size', initial_data);
            });
            $("#slider-page-width").on("change", function () {
                var initial_data = $(this).val();
                $('section.mt-content-container').css("margin-left", initial_data + "px");
                $('section.mt-content-container').css("margin-right", initial_data + "px");
                $("#slider-page-width").val(initial_data);
                sessionStorage.setItem('page_width', initial_data);
            });
            $('a.toggler').on("click", function () {
                $(this).toggleClass('off');
                if ($('#toggler-text').text() === 'Full') {
                    $('#toggler-text').text('Left');
                    $('section.mt-content-container p').css("text-align", "Left");
                    sessionStorage.setItem('text_align', "Left");
                }
                else if ($('#toggler-text').text() === 'Left') {
                    $('#toggler-text').text('Full');
                    $('section.mt-content-container p').css("text-align", "justify");
                    sessionStorage.setItem('text_align', "Justify");
                }
                else {
                }
            });
        }
        
        // Set initial value for glossary options
        document.getElementById("glossarizerOptions" + "-" + localStorage.getItem("glossarizerType")).checked = true;
    }

	// Set initial value for annotation (Note Bene and Hypothesis)
	localStorage.setItem("annotationType", "none");
        document.getElementById("annotationOptions" + "-" + localStorage.getItem("annotationType")).checked = true;
    
    function getData(pro) {
        return {
            "open": `<button id="custom_open"  >â˜°</button>`,
            "header": pro ? `<div id="sbHeader" class="sbHeader" style="">
	    <div id="openContents" class="top-tabs"> Contents </div>
		<div id="openResources" class="top-tabs"> Resources </div>
		<div id="openControl" class="top-tabs"> Readability </div>
		<div id="openUsage" class="top-tabs"> Tools </div>
		<div id="openLibraries" class="top-tabs"> Libraries </div>
		<div id="openCommunity" class="top-tabs"> Community </div>
		<div id="openDevelopers" class="top-tabs"> Developers </div>


	    </div>` : `<div id="sbHeader" class="sbHeader" style="">
		<div id="openContents" class="top-tabs">Contents</div>
		<div id="openResources" class="top-tabs">Resources</div>
		<div id="openControl" class="top-tabs">Readability</div>
		<div id="openUsage" class="top-tabs">Tools</div>
		<div id="openLibraries" class="top-tabs">Libraries</div>
		<div id="openCommunity" class="top-tabs"> Community </div>

</div>`,
            "home": `<div id="sb1" class="custom_sidebar">

                <div  class="" id="custom_target"></div>
</div>`,


//Resources Section
            "resources": {
                "chem": ` <div id="sb2"  class="custom_sidebar">
    <div class="custom_field">
        
            <div class="custom_field">
                <iframe class="pubchem-widget" id="pubchemWidget" style=" width:100%; height: 400px; overflow: auto;" alt="The Periodic Table of the Elements showing all elements with their chemical symbols, atomic weight, and atomic number." style="border: 0px; width: 100%; height: 506px; overflow: auto;">
                </iframe>
            </div>
        <a id="ref_table" target="_blank" >Reference Tables</a>
            <div id="ref-table-put" class="custom_field" style="display: none">

            </div>
         <a id="phy_table" target="_blank" >Physical Constants</a>
                <div  style="display: none;" id="phy_table_put" class="custom_field">
                   <iframe style="width: 100%;" id="physicalConstantsWidget" loading="lazy"></iframe>
                </div>
		<a id="DesmosWidget" target="_blank">Scientific Calculator</a>
				<div id="desmosW" style="display:none;">
					<iframe id="desmosWidget" style=" width:95%; height: 400px; overflow: auto;"></iframe>
				</div>
        <a id="conversion_table">Conversion Calculator</a>
            <div style="display: none" id="conversion_table_put" class="converter-wrapper">

              <form name="property_form">
                <span>
                  <select class="select-property" name="the_menu" size=1 onChange="CONVERSION_CALCULATOR.UpdateUnitMenu(this, document.form_A.unit_menu); CONVERSION_CALCULATOR.UpdateUnitMenu(this, document.form_B.unit_menu)">
                  </select>
                </span>
              </form>
            
              <div class="converter-side-a">
                <form name="form_A" onSubmit="return false">
                  <input type="text" class="numbersonly" name="unit_input" maxlength="20" value="0" onKeyUp="CONVERSION_CALCULATOR.CalculateUnit(document.form_A, document.form_B)">
                  <span>
                    <select name="unit_menu" onChange="CONVERSION_CALCULATOR.CalculateUnit(document.form_B, document.form_A)">
                    </select>
                  </span>
                </form>
              </div> <!-- /converter-side-a -->
              
             <div class="converter-equals">
               <p>=</p>
             </div> <!-- /converter-side-a -->
            
              <div class="converter-side-b">
                <form name="form_B" onSubmit="return false">
                  <input type="text" class="numbersonly" name="unit_input" maxlength="20" value="0" onkeyup="CONVERSION_CALCULATOR.CalculateUnit(document.form_B, document.form_A)">
                  <span>
                    <select name="unit_menu" onChange="CONVERSION_CALCULATOR.CalculateUnit(document.form_A, document.form_B)">
                    </select>
                  </span>
                </form>
              </div> <!-- /converter-side-b -->
            </div><!-- /converter-wrapper -->

        </div>

</div> `,
                
                
                "default": ` <div id="sb2"  class="custom_sidebar">
<div class="custom_field">
	<a id="ref_table" target="_blank" >Reference Tables</a>
		<div id="ref-table-put" class="custom_field" style="display: none; background-color: white ">

		</div>
	 <a id="phy_table" target="_blank" >Physical Constants</a>
			<div  style="display: none;" id="phy_table_put" class="custom_field">
			   <iframe style="width: 480px;" id="physicalConstantsWidget" loading="lazy"></iframe>
			</div>

	<a id="conversion_table">Conversion Calculator</a>
            <div style="display: none;" id="conversion_table_put" class="converter-wrapper">

              <form name="property_form">
                <span>
                  <select class="select-pput /Users/Nguyen/Documents/Web_dev/Sidebar/sidebar.jsroperty" name="the_menu" size=1 onChange="CONVERSION_CALCULATOR.UpdateUnitMenu(this, document.form_A.unit_menu); CONVERSION_CALCULATOR.UpdateUnitMenu(this, document.form_B.unit_menu)">
                  </select>
                </span>
              </form>
            
              <div class="converter-side-a">
                <form name="form_A" onSubmit="return false">
                  <input type="text" class="numbersonly" name="unit_input" maxlength="20" value="0" onKeyUp="CONVERSION_CALCULATOR.CalculateUnit(document.form_A, document.form_B)">
                  <span>
                    <select name="unit_menu" onChange="CONVERSION_CALCULATOR.CalculateUnit(document.form_B, document.form_A)">
                    </select>
                  </span>
                </form>
              </div> <!-- /converter-side-a -->
              
             <div class="converter-equals">
               <p>=</p>
             </div> <!-- /converter-side-a -->
            
              <div class="converter-side-b">
                <form name="form_B" onSubmit="return false">
                  <input type="text" class="numbersonly" name="unit_input" maxlength="20" value="0" onkeyup="CONVERSION_CALCULATOR.CalculateUnit(document.form_B, document.form_A)">
                  <span>
                    <select name="unit_menu" onChange="CONVERSION_CALCULATOR.CalculateUnit(document.form_A, document.form_B)">
                    </select>
                  </span>
                </form>
              </div> <!-- /converter-side-b -->
            </div><!-- /converter-wrapper -->


	</div>

</div> `
            },


//Readability Section
            "control": ` <div id="sb3"  class="custom_sidebar">

	<div class="custom_field">
	<a onclick="rtdefault()" class="btn btn-large" >Default Settings</a>
	</div>
    <p class="h_ar">Font Size:</p>
    <div class="custom_field">
       
        <input class="slider_ar" type="range" min=".4" max="1.8" value="" step=".1" id="size">


    
	</div>

    <p class="h_ar">Page Width:</p>
<div class="custom_field">
  <input class="slider_ar" type="range" min="0" max="450" value="0" step ="10" id="slider-page-width">
</div>
   <p class="h_ar">Text Align:</p>
    <div class="custom_field">
        <a id="toggler-text" href="#0" class="toggler off">Left</a>
    </div>
   <p class="h_ar">Sidebar Layout:</p>
   <div style="margin-left: 10px;" id="sbLayout" class="custom_field">
	   <button id="tabsTrue" onclick="savePanel(true)">Side View </button>
	   <button id="tabsFalse" onclick="savePanel(false)">Compressed View</button>
	   <!--<button id="tabsSplit" onclick="splitPanel()">Toggle Split View </button>-->
	</div>
	<div class="custom_field">
   <h3>
   <img src="https://awesomefiles.libretexts.org/Students/Henry Agnew/BeeLine/beeline-logo.png">
	BeeLine Reader </h3>
	<p> BeeLine Reader uses subtle color gradients to help you read more quickly and efficiently. Choose a color scheme below, or click here to <a style="color: #30b3f6; display: unset; margin:0;" href="http://www.beelinereader.com/education/?utm_source=libretexts"> learn more. </a> </p>
	

	</div>
    <div class="BLtoggle" id="doBeeLine">
      			<a id="SB_Inverted" class="btn btn-large active" data-color="night_blues" >Inverted</a>
                <a id="SB_Bright" class="btn btn-large active" data-color="bright" >Bright</a>
                <a id="SB_Blues" class="btn btn-large active" data-color="blues" >Blues</a>
				<a id="SB_Grays" class="btn btn-large active" data-color="gray" >Grays</a>
				<a id ="dark-light" class="btn btn-large" onclick="$('.elm-skin-container').toggleClass('darkMode'); localStorage.setItem('darkMode', localStorage.getItem('darkMode') !== 'true')">Dark Mode</a>
				<a id="SB_Off" class="btn btn-large active" data-color="off" >Off</a>
     </div>


</div>`,


//Tool Section
            "usage": `<div id="sb4"  class="custom_sidebar">
    <div class="custom_field">
        <a href="https://adapt.libretexts.org/" target="_blank" class='mt-icon-pencil2'>&nbsp;ADAPT Homework System</a>
    </div>

    <div class="custom_field">
	<a href="https://studio.libretexts.org/" class="mt-icon-article"> LibreStudio Server</a>
    </div>

    <div class="custom_field">
	<a href="https://jupyter.libretexts.org/hub/login" class="mt-icon-archive"> Jupyter Hub</a>
    </div>

    <div class="custom_field">
	<a href="/Under_Construction/Development_Details/OER_Remixer" class="mt-icon-tree"> OER Remixer</a>
    </div>

    <div class="custom_field">
        <a onclick = "event.preventDefault(); buildcite()" target="_blank"  class='mt-icon-quote'>&nbsp;Get Page Citation</a>
    </div>

    <div class="custom_field">
        <a onclick = "event.preventDefault(); attribution()" target="_blank" class='mt-icon-quote'>&nbsp;Get Page Attribution</a>
    </div>

    <div class="custom_field">
	<a onclick = "event.preventDefault(); saveBookmark()" href='#' class='mt-icon-bookmarks'>&nbsp;Bookmark Page</a>
	<div id="bm-list">

	</div>
    </div>

    <div class="custom_field">
        <a id="librelens-button" onclick = "event.preventDefault(); LibreTexts.active.libreLens()" target="_blank" class='mt-icon-eye-blocked'>&nbsp;Toggle AutoAttribution</a>
	<div id="librelens-list">

	</div>
    </div>

    <div class="custom_field">
	<a onclick = "$('.option').toggle(); $('.mt-icon-page-notification').toggleClass('off')" href='#' class='mt-icon-page-notification off'>&nbsp;Watch Option</a>
	<form class="option" action="">
<!--
<div class="legend">
		<a class="mt-f1-success mt-f1-link" href="https://success.mindtouch.com/@go/cid/subscriptions">
		    <span class="ui-icon mt-icon-f1-link"></span>
		</a>
	    </div>
		Receive email notifications for:
--!>
	    <ul>
		<li class="self">
		    <input id="deki-page-alerts-self" class="mt-checkbox" type="radio"
		    data-ga-label="Subscribe to self" name="alert" checked="checked" value="1">
		    <label for="deki-page-alerts-tree" class="mt-label-checkbox"
			data-ga-label="Subscribe to self">This page only</label>
		</li>
		<li class="tree">
		    <input id="deki-page-alerts-tree" class="mt-checkbox" type="radio"
		    data-ga-label="Subscribe to tree" name="alert" checked="" value="2">
		    <label for="deki-page-alerts-tree" class="mt-label-checkbox"
			data-ga-label="Subscribe to tree">This page and all subpages</label>
		</li>
		<li class="off">
		    <input id="deki-page-alerts-off" class="mt-checkbox" type="radio"
		    data-ga-label="Unsubscribe" name="alert" checked="checked" value="0">
		    <label for="deki-page-alerts-off" class="mt-label-checkbox"
			data-ga-label="Unsubscribe">Turn OFF notifications for this page</label>
		</li>
	    </ul>
	</form>
    </div>

	<div id="glossarizerOptions" class="custom_field" ><p class="mt-icon-bubble2">&nbsp;Glossary</p>
        <form oninput="libretextGlossary.makeGlossary(glossarizerOptions.value)">
            <p><input id="glossarizerOptions-textbook" name="glossarizerOptions" type="radio" value="textbook"/><label class="glossaryLabel" for="textbook">Textbook</label></p>
            <!-- <p><input id="glossarizerOptions-achem" name="glossarizerOptions" type="radio" value="achem"/><label class="glossaryLabel" for="achem">Analytical Library</label></p>
                <p><input id="glossarizerOptions-ichem" name="glossarizerOptions" type="radio" value="ichem"/><label class="glossaryLabel" for="ichem">Inorganic Library</label></p>
                <p><input id="glossarizerOptions-ochem" name="glossarizerOptions" type="radio" value="ochem"/><label class="glossaryLabel" for="ochem">Organic Library</label></p> -->
            <p><input id="glossarizerOptions-none" name="glossarizerOptions" type="radio" value="none"/><label class="glossaryLabel" for="none">None</label></p>
        </form>
    </div>
    

    <div id="annotationOptions" class="custom_field">
	<p><i class="fa fa-asterisk"></i>&nbsp;Annotation</p>

	<form oninput="makeAnnotation(annotationOptions.value)">
	    <p><input id="annotationOptions-hypothesis" name="annotationOptions" type="radio" value="hypothesis"/><label class="annotationLabel" for="none">Hypothesis</label></p>
	    <p><input id="annotationOptions-notebene" name="annotationOptions" type="radio" value="notebene"/><label class="annotationLabel" for="none">Note Bene</label></p>
	    <p><input id="annotationOptions-none" name="annotationOptions" type="radio" value="none"/><label class="annotationLabel" for="none">None</label></p>
	</form> 
    </div>
    
    <div class="custom_field">
        <a onclick = " $('hypothesis-sidebar').toggle()">&nbsp;Hypothesis</a>
    </div>

    <div class="custom_field">
        <a onclick = "event.preventDefault()">&nbsp;Note Bene</a>
    </div>
</div>`,

//Libraries Section
            "libraries": `<div id="sb5"  class="custom_sidebar">

	<div class="custom_field">
		<a id="chemistry-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/chem.png">&nbsp;Chemistry</a>
		<div id="chemistry-guide-put" class="custom_field"  style="display: none">                </div>

		<a id="biology-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/bio.png">&nbsp;Biology</a>
		<div id="biology-guide-put" class="custom_field"  style="display: none">                </div>

		<a id="business-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/biz.png">&nbsp;Business</a>
		<div id="business-guide-put" class="custom_field"  style="display: none">                </div>

		<a id="eng-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/eng.png">&nbsp;Engineering</a>
		<div id="eng-guide-put" class="custom_field"  style="display: none">                </div>

		<a href="https://espanol.libretexts.org/" id="espanol-guide"  target="_blank" rel="noreferrer noopener"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/espanol.png">&nbsp;EspaÃ±ol</a>
		<div id="espanol-guide-put" class="custom_field"  style="display: none">                </div>

		<a id="geosciences-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/geo.png">&nbsp;Geosciences</a>
		<div id="geosciences-guide-put" class="custom_field"  style="display: none">                </div>

		<a id="humanities-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/human.png">&nbsp;Humanities</a>
		<div id="humanities-guide-put" class="custom_field"  style="display: none">                </div>

		<a id="math-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/math.png">&nbsp;Mathematics</a>
		<div id="math-guide-put" class="custom_field"  style="display: none">                </div>

		<a id="medicine-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/med.png">&nbsp;Medicine</a>
		<div id="medicine-guide-put" class="custom_field"  style="display: none">                </div>

		<a id="physics-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/phys.png">&nbsp;Physics</a>
		<div id="physics-guide-put" class="custom_field"  style="display: none">                </div>

		<a id="social-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/socialsci.png">&nbsp;Social Sciences</a>
		<div id="social-guide-put" class="custom_field"  style="display: none">                </div>

		<a id="statistics-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/stats.png">&nbsp;Statistics</a>
		<div id="statistics-guide-put" class="custom_field"  style="display: none">                </div>

		<a id="workforce-guide"  target="_blank" rel="internal"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/workforce.png">&nbsp;Workforce</a>
		<div id="workforce-guide-put" class="custom_field"  style="display: none">                </div>

	</div>
    </div>`,

//Community Section
            "community": `<div id="sb6"  class="custom_sidebar">
	    <div class="custom_field">
		<div style="display: flex; flex-direction: column;">
		    <ol style="list-style: none;">
			<li><a data-color="#00b224" href="https://forums.libretexts.org/g/CommunityBiology/topics"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/bio.png">Biology Forums</a></li>
			<li><a data-color="#207537" href="https://forums.libretexts.org/g/CommunityBusiness/topics"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/biz.png">Business Forums</a></li>
			<li><a data-color="#00bfff" href="https://forums.libretexts.org/g/CommunityChemistry/topics"
				rel="external nofollow"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/chem.png">Chemistry Forums</a></li>
			<li><a data-color="#ff6a00" href="https://forums.libretexts.org/g/CommunityEngineering/topics"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/eng.png">Engineering Forums</a></li>
			<li><a data-color="#d77b00" href="https://forums.libretexts.org/g/CommunityEspanol/topics"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/espanol.png">EspaÃ±ol Forums</a></li>
			<li><a data-color="#e5a800" href="https://forums.libretexts.org/g/CommunityGeosciences/topics"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/geo.png">Geosciences Forums</a></li>
			<li><a data-color="#00bc94" href="https://forums.libretexts.org/g/CommunityHumanities/topics"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/human.png">Humanities Forums</a></li>
			<li><a data-color="#3737bf" href="https://forums.libretexts.org/g/CommunityMathematics/topics"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/math.png">Mathematics Forums</a></li>
			<li><a data-color="#e52817" href="https://forums.libretexts.org/g/CommunityMedicine/topics"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/med.png">Medicine Forums</a></li>
			<li><a data-color="#841fcc" href="https://workforce.libretexts.org/"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/phys.png">Physics Forums</a></li>
			<li><a data-color="#f20c92" href="https://forums.libretexts.org/g/CommunitySocialSciences/topics"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/socialsci.png">Social Sciences Forums</a></li>
			<li><a data-color="#05baff" href="https://forums.libretexts.org/g/CommunityStatistics/topics"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/stats.png">Statistics Forums</a></li>
			<li><a data-color="#bf4000" href="ttps://forums.libretexts.org/g/CommunityWorkforce/topics"
				rel="external nofollow" target="_blank" class="link-https"><img class="icon" alt="" src="https://libretexts.org/img/LibreTexts/glyphs_blue/workforce.png">Workforce Forums</a></li>
		    </ol>
		</div>
	    </div>
	
	    <div class="custom_field">
		    <a href="https://www.youtube.com/channel/UCP7H_PcHpiINWs8qpg0JaNg" rel="external nofollow" target="_blank" class="mt-icon-youtube">&nbsp;YouTube Channel</a>
	    </div>
	
	    <div class="custom_field">
		    <a href="https://blog.libretexts.org/" rel="external nofollow" target="_blank" class="link-https"> &nbsp;<i class="fa fa-info"></i>   Blog</a>
	    </div>
	    
	    <div class="custom_field">
		<a href="https://blog.libretexts.org/2019/06/13/libretexts-offers-new-weekly-office-hours/" rel="external nofollow" target="_blank"  class="mt-icon-topic" >&nbsp;Office Hours</a>
	    </div>
	    <div class="custom_field">
		    <a href="https://chat.libretexts.org/" rel="external nofollow" target="_blank" class="mt-icon-chat2">&nbsp;Community Help Chat</a>
	    </div>

	    <div class="custom_field">
		    <a href="https://twitter.com/LibreTexts?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" rel="external nofollow" target="_blank" class="mt-icon-twitter">&nbsp;Twitter</a>
	    </div>

	    <div class="custom_field">
		    <a href="https://www.facebook.com/LibreTexts/" rel="external nofollow" target="_blank" class="mt-icon-facebook">&nbsp;Facebook</a>
	    </div>

	    </div>`,

//Developers Section
            "developers": `<div id="sb7"  class="custom_sidebar">
	<div class="custom_field">
		<a id="construction-guide"  target="_blank" rel="internal" class="mt-icon-site-tools ">&nbsp;Construction Guide</a>
		<div id="construction-guide-put" class="custom_field">                </div>
        <a onclick = "event.preventDefault(); cover(window.location.href)" href='#' class='mt-icon-book'>&nbsp;Get Text Cover</a>
        <a href="/Under_Construction/Sandboxes/Henry/Get_Contents?${document.getElementById('IDHolder').innerText}" class="mt-icon-edit-page" target="_blank">&nbsp;Get Page Contents</a>
        <a onclick = "event.preventDefault(); $('dd').show();" href='#' class='mt-icon-eye3'>&nbsp;Reveal Answers</a>
        <a onclick = "event.preventDefault(); LibreTexts.authenticatedFetch(null,'unorder',null,{method:'PUT'}); window.location.reload()" class="mt-icon-shuffle" href='#' >&nbsp;Reset Page Order</a>
		<a onclick = 'event.preventDefault(); LibreTexts.getSubpages().then(data => {
		    alert("Copied pageIDs to the clipboard");
		    data = JSON.stringify(data).match(/(?<="id":")\\d+(?=")/g);
		    let [subdomain] = LibreTexts.parseURL();
		    data = data.map(e=>subdomain + "-" + e);
            navigator.clipboard.writeText(data.join(", "))
		    console.log(data.join(", "));
		})' class="mt-icon-flow-cascade" href='#' >&nbsp;Get PageIDs</a>
		<a title="https://groups.io/g/Libretexts-ConstructionForum" href="https://groups.io/g/Libretexts-ConstructionForum" rel="external nofollow" target="_blank"  class="mt-icon-archive">&nbsp;Construction Forum</a>
		<a href="https://jupyter.libretexts.org/hub/login">&nbsp<i class="fas fa-square-root-alt"></i>  Jupyter Hub</a>
		<a href="https://chem.libretexts.org/Under_Construction/Development_Details/Misc_Pages/Realtime_MathJax">&nbsp<i class="fas fa-square-root-alt"></i> RealTime Mathjax</a>
		<a href="https://studio.libretexts.org/" class="mt-icon-article"> LibreStudio Server</a>
		<a href="https://webwork.libretexts.org/webwork2" class="mt-icon-article"> Webwork Server</a>
		<a href="https://imathas.libretexts.org/imathas/" class="mt-icon-article"> IMathAS Server</a>
		<a href="https://libremaps.libretexts.org/" class="mt-icon-archive"> LibreMaps</a>
	</div>
	</div>`
        };
    }
}

function activateBeeLine() {
    const beelineELements = document.querySelectorAll(".mt-content-container p:not(.boxtitle)");
    let doBeeline = function (theme, action) {
        for (let i = 0; i < beelineELements.length; i++) {
            let beeline = beelineELements[i].beeline;
            if (beeline) {
                beeline.setOptions({theme: theme});
            }
            else {
                beeline = new BeeLineReader(beelineELements[i], {
                    theme: theme,
                    skipBackgroundColor: true,
                    handleResize: true,
                    skipTags: ['svg', 'h1', 'h3', 'h3', 'h4', 'h3', 'style', 'script', 'blockquote']
                });
                beelineELements[i].beeline = beeline;
            }
            localStorage.setItem("beeline", theme);
            if (theme === "off") {
                beeline.uncolor();
                if (typeof ga === 'function') {
                    ga('send', 'event', 'Beeline', 'disabled');
                }
            }
            else {
                beeline.color();
                if (typeof ga === 'function') {
                    ga('send', 'event', 'Beeline', action, theme);
                }
            }
            const contentContainer = $('.elm-skin-container');
            if (theme === 'night_blues' || localStorage.getItem('darkMode') === 'true') {
                contentContainer.addClass('darkMode');
            }
            else {
                contentContainer.removeClass('darkMode');
            }
        }
    };
    setBeelineToggles();
    
    function setBeelineToggles() {
        const toggles = $('.BLtoggle');
        if (toggles[0]) {
            const btns = toggles.find('button, a');
            doBeeline(localStorage.getItem("beeline"), localStorage.getItem("beeline"));
            btns.on("click", function (e) {
                if (!e.target.href)
                    e.preventDefault();
                const theme = $(this).attr("data-color");
                if (!theme)
                    return;
                localStorage.setItem('beeline', theme);
                if (theme === 'night_blues') {
                    localStorage.setItem('darkMode', 'true');
                }
                else {
                    localStorage.setItem('darkMode', 'false');
                }
                btns.removeClass('active');
                btns.filter('a[data-color="' + theme + '"]').addClass('active');
                btns.filter('button[data-color="' + theme + '"]').addClass('active');
                doBeeline(theme, theme);
            });
        }
    }
}

function savePanel(_input) {
    sessionStorage.setItem("sidepanel", _input);
    location.reload();
}

function splitPanel() {
    $("section.mt-content-container").toggleClass("padLeft");
}

function rtdefault() {
    $('section.mt-content-container p').css("font-size", 1.1 + "rem");
    $('section.mt-content-container').css("margin-left", 0 + "px");
    $('section.mt-content-container').css("margin-right", 0 + "px");
    $('section.mt-content-container p').css("text-align", "justify");
    $("#size").val("1.1");
    $("#slider-page-width").val("0");
    $("#toggler-text").attr("class", "toggler");
    sessionStorage.setItem('page_width', '0');
    sessionStorage.setItem('text_align', "Justify");
    sessionStorage.setItem('font_size', '1.1');
}
;

function saveBookmark() {
    const TITLE = document.getElementById("titleHolder").innerText;
    const URL = window.location.href;
    const CHECK = sessionStorage.getItem("Bookmark");
    if (CHECK == null) {
        sessionStorage.setItem("Title", TITLE);
        sessionStorage.setItem("Bookmark", URL);
        createBookmarks();
    }
}

function createBookmarks() {
    var _a;
    const LI = document.createElement("li");
    const URL = sessionStorage.getItem("Bookmark");
    const TITLE = sessionStorage.getItem("Title");
    LI.id = "sbBookmark";
    LI.innerHTML = `<div > <p><a style="display: unset;" href="${URL}"> ${TITLE}</a><a id="removeBookmark" style="display: unset;" onclick="removeBookmarks()">| Remove</a> </p></div>`;
    if (URL) {
        (_a = document.querySelector("#bm-list")) === null || _a === void 0 ? void 0 : _a.appendChild(LI);
    }
}

function removeBookmarks() {
    var _a;
    (_a = document.querySelector("#bm-list")) === null || _a === void 0 ? void 0 : _a.removeChild(document.querySelector("#sbBookmark"));
    sessionStorage.removeItem("Title");
    sessionStorage.removeItem("Bookmark");
}

function watchOption() {

}

function makeAnnotation(inputSourceOption) {
    let sourceOption = inputSourceOption || localStorage.getItem("annotationType");
    
    switch((sourceOption || "").trim().toLowerCase()) {
	case "none":
	    $('hypothesis-sidebar').hide()
	    return;
	case "notebene":
	    localStorage.setItem("annotationType", "notebene");
	    $('hypothesis-sidebar').hide()
	    break;
	default:
	    localStorage.setItem("annotationType", "hypothesis");
	    $('hypothesis-sidebar').show()
    }
}
