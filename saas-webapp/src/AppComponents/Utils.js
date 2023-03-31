function packAmpVals(timeVals, data) {
    var ampVals = [];
    for (let i = 0; i < data.length; i++) {
        ampVals.push({
            'time': timeVals[i],
            'amp': data[i]
        })
    }
    return ampVals
}

function packFreqVals(newFreqData) {
    const map = new Map();

    for (let i = 0; i < newFreqData.length; i += 1) {
        const sliceMag = newFreqData[i];
        const sliceFreq = Math.round((i*22050)/newFreqData.length);
        map.set(sliceFreq, sliceMag);
    }

    const newFreqArr = Array.from(map, ([f,v]) => ({'freq': f, 'val' : v}));

    return newFreqArr;
}

function getFreqDist(data) {
    const map = new Map();
    const maxFreq = 22050;
    for (const obj of data) {
        // Would have to get the frequency distributions here
        let freq = obj['freq'];
        let initSum = map.get(freq) || 0;
        map.set(freq, initSum+obj['val']);
    }
    return Array.from(map, ([f, v]) => ({'freq': f, 'val': v}));
}

function getSpectrogramData(data, timestep) {
    const maxFreq = 22050;
    const numTimes = 10;
    if (data.length === 0) {
        return {
            'yvals': new Array(64).fill(0).map((_, i) => {return i*(maxFreq/64)}),
            'xvals': new Array(numTimes).fill(0).map((_, i) => {return i}),
            'data': new Array(64).fill(0).map(() =>
                        new Array(numTimes).fill(0)
                    )
        };
    }

    const freqRange = new Array(64).fill(0).map((_, i) => {return i*(maxFreq/64)})

    const timeArray = new Array(data.length).fill(0).map((_, i) => {return i*timestep});
    const times = timeArray.slice(-1*numTimes);

    const map = new Array(freqRange.length).fill(0).map(() => 
        new Array(numTimes).fill(0)
    );
    const relevantData = data.slice(-1*numTimes);
    for (let timeInd = 0; timeInd < relevantData.length; timeInd++) {
        relevantData[timeInd].forEach((freqVal) => {
            const freqInd = Math.round(freqVal['freq']/(22050/64));
            map[freqInd][timeInd] = freqVal['val'];
        })
    }


    return {
        'yvals': freqRange,
        'xvals': times,
        'data': map
    }
}

function discreteFourierTransform(data) {
    if (data.length === 0) {
        return data
    }
    var ft = require('fourier-transform/asm');

    var spectrum = ft(data);

    return spectrum;
}

export {
    packAmpVals,
    packFreqVals,
    getFreqDist,
    getSpectrogramData,
    discreteFourierTransform};