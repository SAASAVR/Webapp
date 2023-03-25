import React from "react"
import * as utils from '../Utils.js';
import LineGraph from '../Graphs/LineGraph.js';
import FreqDist from '../Graphs/FreqDist.js';
import Spectrogram from '../Graphs/Spectrogram.js';

import './HardwareStream.css'

const freqRange = new Array(300).fill(0).map((_, i) => `${(300-i)*40}`)

class HardwareStream extends React.Component {

    render() {
        let timeVals = new Array(this.props.data.length)
            .fill(0)
            .map((_, i) => 
                {return i*(1/this.props.sampleRate)});
        let ampData = utils.packAmpVals(timeVals, this.props.data);
        let freqData = utils.discreteFourierTransform(this.props.data, this.props.sampleRate);
        let spectroData = utils.getSpectrogramData(freqRange, freqData);
        return (
            <div className='Hardware-Stream'>
                <LineGraph data={this.props.ampData}></LineGraph>
                {/* <div className='Freq-Graphs'>
                    <Spectrogram 
                            xvals={spectroData.xvals}
                            yvals={spectroData.yvals}
                            data={spectroData.data}></Spectrogram>
                    <FreqDist data={utils.getFreqDist(this.props.freqData)}></FreqDist>
                </div> */}
            </div>
        )
    }
}

export default HardwareStream;