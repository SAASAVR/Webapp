import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const AudioTabs = {
    AudioDescription: Symbol("AudioDescripiton"),
    MLDescription: Symbol("MLDescription"),
};

const EmptyData = {
    'Output': [],
    'ArrayData': [], 
    'AudioData': {
        'sr': 0,
        'size': 0,
        'clipLength': 0
    }, 
    'MLData': {
        'Outputs': []
    },
    'Spectrogram': "",
    'DownSampledSize': 0,
    'DownSampledData': []
};

function getAudioTabsString(tab) {
    let name;
    switch (tab) {
        case AudioTabs.AudioDescription:
            name = "Audio Description";
            break;
        case AudioTabs.MLDescription:
            name = "ML Description";
            break;
        default:
            name = "NotFound";
    };
    return name;
}
function getAudioTabsIcon(tab) {
    let name;
    switch (tab) {
        case AudioTabs.AudioDescription:
            name = solid("file-audio");
            break;
        case AudioTabs.MLDescription:
            name = solid("diagram-project");
            break;
        default:
            name = solid("xmark");
    };
    return name;
}
export{
    AudioTabs,
    EmptyData,
    getAudioTabsString,
    getAudioTabsIcon,
}
