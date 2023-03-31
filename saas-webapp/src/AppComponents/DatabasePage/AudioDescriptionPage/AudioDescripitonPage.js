import React from "react"

import './AudioDescripitonPage.css'
import LineGraph from "../../Graphs/LineGraph";
import * as utils from '../../Utils.js';
// import * as states from '../../AppTabStates.js';

class AudioDescripitonPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            downSampledData: {}
        }
    }



    render() {
        if (this.props.arraydata != undefined) {
            const arrayDataDSFactor = 16;
            const timeVals = new Array(this.props.arraydata.length)
                .fill(0)
                .map((_, i) => 
                    {return i*(1/this.props.audiodata['sr'])});
    
            this.state = {
                downSampledData: utils.packAmpVals(timeVals, this.props.arraydata, arrayDataDSFactor, 0)
            }
        }
        console.log('bruh');
        let audioName = `${this.props.audio == null ? 'none' : this.props.audio.name}`;
        return(
            <div className="Audio-Div">
                <h3>Audio Description {audioName}</h3>
                <LineGraph data={this.state.downSampledData}></LineGraph>
            </div>
        );
    }
}

export default AudioDescripitonPage