import React from "react"

import './AudioDescripitonPage.css'
import LineGraph from "../../Graphs/LineGraph";
// import * as states from '../../AppTabStates.js';

class AudioDescripitonPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let audioName = `${this.props.audio == null ? 'none' : this.props.audio.name}`;
        return(
            <div className="Audio-Div">
                <h3>Audio Description {audioName}</h3>
                <LineGraph data={this.props.downSampledVals}></LineGraph>
                <img src={this.props.spectrogram}/>
            </div>
        );
    }
}

export default AudioDescripitonPage