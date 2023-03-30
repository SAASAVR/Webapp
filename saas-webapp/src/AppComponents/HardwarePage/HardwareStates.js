import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const HardwareOptions = {
    Interval: Symbol("interval"),
    SensorActivated: Symbol("sensorAct"),
    Threshold: Symbol("threshold"),
};
const HardwareStatus = {
    NotConnected: Symbol(0),
    Connecting: Symbol(1),
    Connected: Symbol(2),
    Recording: Symbol(3),
    Saving: Symbol(4),
};
function getHardwareOptionsString(opt) {
    let name;
    switch (opt) {
        case HardwareOptions.Interval:
            name = "Interval";
            break;
        case HardwareOptions.SensorActivated:
            name = "Sensor Activated";
            break;
        case HardwareOptions.Threshold:
            name = "Threshold";
            break;
        default:
            name = "NotFound";
    };
    return name;
}
function getHardwareStatusString(opt) {
    let name;
    switch (opt) {
        case HardwareStatus.NotConnected:
            name = "Not Connected";
            break;
        case HardwareStatus.Connecting:
            name = "Connecting...";
            break;
        case HardwareStatus.Connected:
            name = "Connected!";
            break;
        case HardwareStatus.Recording:
            name = "Connected!";
            break;
        case HardwareStatus.Saving:
            name = "Connected!";
            break;
        default:
            name = "NotFound";
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
            name = "Not Recording";
            break;
        case HardwareStatus.Connecting:
            name = "Not Recording";
            break;
        case HardwareStatus.Connected:
            name = "Ready to Record!";
            break;
        case HardwareStatus.Recording:
            name = "Recording...";
            break;
        case HardwareStatus.Saving:
            name = "Saving Recording...";
            break;
        default:
            name = "NotFound";
    }
    return name;
}
function getRecordingStatusIcon(opt) {
    return opt === HardwareStatus.Saving ? solid("circle-notch") : solid("circle");
}
export{    
    HardwareOptions, 
    HardwareStatus,
    getHardwareOptionsString,
    getHardwareStatusString,
    getHardwareStatusIcon,
    getRecordingStatusString,
    getRecordingStatusIcon,
}
