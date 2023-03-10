


function getFreqDist(data) {
    const map = new Map();
    for (const obj of data) {
        let freq = obj['freq'];
        let initSum = map.get(freq) || 0;
        map.set(freq, initSum+obj['val']);
    }
    return Array.from(map, ([f, v]) => ({'freq': f, 'val': v}));
}

export {getFreqDist};