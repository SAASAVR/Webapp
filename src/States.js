import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

// These are kinda like enums
const AppTabs = {
    Hardware: Symbol("hardware"),
    Database: Symbol("database"),
};

const HardwareOptions = {
    Interval: Symbol("interval"),
    SensorActivated: Symbol("sensorAct"),
    Threshold: Symbol("threshold"),
}

function getAppTabsString(tab) {
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

function getHardwareOptionsString(opt) {
    let name;
    switch (opt) {
        case HardwareOptions.Interval:
            name = "Interval"
        break;
        case HardwareOptions.SensorActivated:
            name = "Sensor Activated"
        break;
        case HardwareOptions.Threshold:
            name = "Threshold"
        break;
        default:
            name = "NotFound"
    };
    return name;
}

export {AppTabs, HardwareOptions, getAppTabsString,  getAppTabsIcon, getHardwareOptionsString}