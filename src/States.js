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

const HardwareStatus = {
    NotConnected: Symbol(0),
    Connecting: Symbol(1),
    Connected: Symbol(2),
    Recording: Symbol(3),
    Saving: Symbol(4),
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

function getHardwareStatusString(opt) {
    let name;
    switch (opt) {
        case HardwareStatus.NotConnected:
            name = "Not Connected"
        break;
        case HardwareStatus.Connecting:
            name = "Connecting..."
        break;
        case HardwareStatus.Connected:
            name = "Connected!"
        break;
        case HardwareStatus.Recording:
            name = "Connected!"
        break;
        case HardwareStatus.Saving:
            name = "Connected!"
        break;
        default:
            name = "NotFound"
    };
    return name;
}

function getHardwareStatusIcon(opt) {
    return solid("circle");
}

function getRecordingStatusString(opt) {
    let name;
    switch (opt) {
        case HardwareStatus.NotConnected:
            name = "Not Recording"
        break;
        case HardwareStatus.Connecting:
            name = "Not Recording"
        break;
        case HardwareStatus.Connected:
            name = "Ready to Record!"
        break;
        case HardwareStatus.Recording:
            name = "Recording..."
        break;
        case HardwareStatus.Saving:
            name = "Saving Recording..."
        break;
        default:
            name = "NotFound"
    }
    return name;
}

function getRecordingStatusIcon(opt) {
    return opt === HardwareStatus.Saving ? solid("circle-notch") : solid("circle");
}
const AudioTabs = {
    AudioDescription: Symbol("AudioDescripiton"),
    MLDescription: Symbol("MLDescription"),
};


function getAudioTabsString(tab) {
    let name;
    switch (tab) {
        case AudioTabs.AudioDescription:
            name = "Audio Description"
        break;
        case AudioTabs.MLDescription:
            name = "ML Description"
        break;
        default:
            name = "NotFound"
    };
    return name;
}
function getAudioTabsIcon(tab) {
    let name;
    switch (tab) {
        case AudioTabs.AudioDescription:
            name = solid("file-audio")
        break;
        case AudioTabs.MLDescription:
            name = solid("diagram-project")
        break;
        default:
            name = solid("xmark")
    };
    return name;
}


export {
    AppTabs, 
    HardwareOptions, 
    HardwareStatus,
    getAppTabsString, 
    getAppTabsIcon,
    getHardwareOptionsString,
    getHardwareStatusString,
    getHardwareStatusIcon,
    getRecordingStatusString,
    getRecordingStatusIcon,
    AudioTabs,
    getAudioTabsString,
    getAudioTabsIcon,
}