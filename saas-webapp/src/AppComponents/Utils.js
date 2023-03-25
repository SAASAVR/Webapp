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

function getFreqDist(data) {
    const map = new Map();
    for (const obj of data) {
        // Would have to get the frequency distributions here
        let freq = obj['freq'];
        let initSum = map.get(freq) || 0;
        map.set(freq, initSum+obj['val']);
    }
    return Array.from(map, ([f, v]) => ({'freq': f, 'val': v}));
}

function getSpectrogramData(freqRange, data) {
    const numTimes = 10;
    if (data.length === 0) {
        return {
            'yvals': freqRange,
            'xvals': new Array(numTimes).fill(0).map((_, i) => {return i}),
            'data': new Array(freqRange.length).fill(0).map(() =>
                        new Array(numTimes).fill(0)
                    )
        };
    }
    const timeSet = new Set(data.map(obj =>  Math.round(obj['time'])));
    const latestTimes = [...timeSet].sort((a,b) => a-b).slice(-1*numTimes);
    const times = new Array(numTimes).fill(0);
    for (let i = 0; i < latestTimes.length; i++) {
        times[i] = latestTimes[i];
    }
    for (let i = 0; i+latestTimes < numTimes; i++) {
        times[i+latestTimes] = i+latestTimes[-1];
    }

    const map = new Array(freqRange.length).fill(0).map(() => 
        new Array(numTimes).fill(0)
    );

    const relevantData = data
        .filter(obj => {
            return obj['time'] <= latestTimes[latestTimes.length-1]+1 && obj['time'] >= latestTimes[0]
        })
        .sort((a, b) => a['time']-b['time']);
    let dataIndex = 0;
    for (let timeIndex = 0; timeIndex < latestTimes.length; timeIndex++) {
        let curTime = latestTimes[timeIndex];
        let curData = relevantData[dataIndex];
        while(dataIndex < relevantData.length && curData['time'] <= curTime) {
            let freqIndex = 299-Math.floor(curData['freq']/40);
            if (freqIndex < 300 && freqIndex > -1) {
                map[freqIndex][timeIndex] += curData['val'];
            }
            dataIndex++;
            curData = relevantData[dataIndex];
        }
    }

    return {
        'yvals': freqRange,
        'xvals': times,
        'data': map
    }
}

function discreteFourierTransform(data, sr) {
    return data;
}

export {
    packAmpVals,
    getFreqDist,
    getSpectrogramData,
    discreteFourierTransform};