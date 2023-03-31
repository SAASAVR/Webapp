import React from "react"
import * as utils from '../Utils.js';
import LineGraph from '../Graphs/LineGraph.js';
import FreqDist from '../Graphs/FreqDist.js';
import Spectrogram from '../Graphs/Spectrogram.js';

import * as HWStates from './HardwareStates.js';

import './HardwareStream.css'

const freqRange = new Array(300).fill(0).map((_, i) => `${(300-i)*40}`)

class HardwareStream extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ampData: [],
            freqData: [],
            prevTimeIndex: 0,
            prevLen: 0,
        }
    }

    render() {
        const ampDataDSFactor = 16;
        const timeDisplayed = 0.5;
        const freqDataLen = 128;
        let timeStep = freqDataLen/this.props.sampleRate;
        let timeVals = new Array(this.props.data.length)
            .fill(0)
            .map((_, i) => 
                {return i*(1/this.props.sampleRate)});
        if (this.props.data.length > this.state.prevLen && this.props.state === HWStates.HardwareStatus.Recording ) {
            let newFreqData = [];
            let newIndex = utils.getNewTimeIndexCutoff(timeVals, this.state.prevTimeIndex, timeDisplayed)
            if (newIndex > this.state.prevTimeIndex) {
                this.setState({
                    prevTimeIndex: newIndex,
                    prevLen: this.props.data.length
                });
            }
            let ampData = utils.packAmpVals(timeVals, this.props.data, ampDataDSFactor, this.state.prevTimeIndex);
            this.setState({
                ampData: ampData
            });
            if (this.props.data.length > freqDataLen) {
                let freqData = utils.discreteFourierTransform(this.props.data.slice(-1*freqDataLen));
                newFreqData = utils.packFreqVals(freqData);
                this.setState({
                    freqData: this.state.freqData.concat([newFreqData])
                });
            }
        }
        let spectroData = utils.getSpectrogramData(this.state.freqData, timeStep);
        return (
            <div className='Hardware-Stream'>
                <LineGraph data={this.state.ampData}></LineGraph>
                <div className='Freq-Graphs'>
                    <Spectrogram 
                            xvals={spectroData.xvals}
                            yvals={spectroData.yvals}
                            data={spectroData.data}></Spectrogram>
                    {/* <FreqDist data={utils.getFreqDist(freqData)}></FreqDist>  */}
                </div>
            </div>
        )
    }
}

export default HardwareStream;