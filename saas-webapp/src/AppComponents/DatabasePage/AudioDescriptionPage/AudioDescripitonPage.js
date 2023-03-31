import React from "react"

import './AudioDescripitonPage.css'
import LineGraph from "../../Graphs/LineGraph";
// import * as states from '../../AppTabStates.js';

class AudioDescripitonPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            downSampledData: this.props.downsampledVals
        }
    }

    render() {
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