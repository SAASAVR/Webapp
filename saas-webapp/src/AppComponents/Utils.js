function getNewTimeIndexCutoff(timeVals, prevCutoff, timeDisplayed) {
    if (timeVals[timeVals.length-1] < timeDisplayed) {
        return 0;
    }
    let i = prevCutoff;
    while(timeVals[i] < timeVals[timeVals.length-1]-timeDisplayed) {
        i+=1;
    }
    return i
}

function packAmpVals(timeVals, data, dsFactor, prevCutoff) {
    if (data.length == 0) {
        return [{'time': 0, 'amp': 0}]
    }

    let ampVals = [];
    for (let i = prevCutoff; i < data.length; i += dsFactor) {
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
    if (data.length === 0) {
        return [];
    }
    const map = new Map();
    for (const time of data) {
        // Would have to get the frequency distributions here
        for (const freqVal of time) {
            let freq = freqVal['freq'];
            let initSum = map.get(freq) || 0;
            map.set(freq, initSum+freqVal['val']);
        }
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

function extractMLAmpVals(packedData, output, clipSize) {
    if (output.length == 0) {
        return [];
    }
    let data = [];
    for (let i = 0; (i+1)*clipSize < packedData.length; i += 1) {
        let end = (i+1)*clipSize; 
        if (end >= packedData.length) {
            end = packedData.length-1
        }
        const curSlice = packedData.slice(i*clipSize, end);
        let curOutput = output[i];
        console.log(curSlice);
        curSlice.forEach((val) => {
            if (curOutput === 0) {
                data.push({
                    'time': val['time'],
                    'undetectedAmp': val['amp'],
                    'detectedAmp': 0
                });
            } else {
                data.push({
                    'time': val['time'],
                    'undetectedAmp': 0,
                    'detectedAmp': val['amp']
                });
            }
        })

    }
    return data;
}

export {
    getNewTimeIndexCutoff,
    packAmpVals,
    packFreqVals,
    getFreqDist,
    getSpectrogramData,
    discreteFourierTransform,
    extractMLAmpVals};