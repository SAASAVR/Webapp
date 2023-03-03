import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

// These are kinda like enums
const AppTabs = {
    Hardware: Symbol("hardware"),
    Database: Symbol("database"),
};


function getAppTabsString(tab) {
    // tab titles
    let name;
    switch (tab) {
        case AppTabs.Hardware:
            name = "Hardware"
        break;
        case AppTabs.Database:
            name = "Database"
        break;
        default:
            name = "NotFound"
    };
    return name;
}

function getAppTabsIcon(tab) {
    // tab icons
    let name;
    switch (tab) {
        case AppTabs.Hardware:
            name = solid("screwdriver-wrench")
        break;
        case AppTabs.Database:
            name = solid("database")
        break;
        default:
            name = solid("xmark")
    };
    return name;
}

export {
    AppTabs, 
    getAppTabsString, 
    getAppTabsIcon,



}