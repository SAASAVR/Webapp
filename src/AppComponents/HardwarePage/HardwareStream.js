import React from "react"
import * as utils from '../Utils.js';
import LineGraph from '../Graphs/LineGraph.js';
import FreqDist from '../Graphs/FreqDist.js';

import './HardwareStream.css'

class HardwareStream extends React.Component {

    render() {
        return (
            <div className='Hardware-Stream'>
                <LineGraph data={this.props.ampData}></LineGraph>
                <div className='Freq-Graphs'>
                    <FreqDist data={utils.getFreqDist(this.props.freqData)}></FreqDist>
                    <FreqDist data={utils.getFreqDist(this.props.freqData)}></FreqDist>
                </div>
            </div>
        )
    }
}

export default HardwareStream;