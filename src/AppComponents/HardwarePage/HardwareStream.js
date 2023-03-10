import React from "react"
import * as utils from '../Utils.js';
import LineGraph from '../Graphs/LineGraph.js';
import FreqDist from '../Graphs/FreqDist.js';

class HardwareStream extends React.Component {

    render() {
        return (
            <div>
                <LineGraph data={this.props.ampData}></LineGraph>
                <FreqDist data={utils.getFreqDist(this.props.freqData)}></FreqDist>
            </div>
        )
    }
}

export default HardwareStream;