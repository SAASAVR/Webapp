import React from "react"
import './MLDescriptionPage.css'
import LineGraphML from "../../Graphs/LineGraphML";

//// import * as states from '../../AppTabStates.js';

class MLDescriptionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.mlData,
        }
    }

    render() {
        // console.log(this.state.data)
        let audioName = `${this.props.audio == null ? 'none' : this.props.audio.name}`;
        return(
            <div className="ML-Div">
                <h3>MLDescription {audioName}</h3>
                <LineGraphML data={this.state.data}></LineGraphML>
            </div>
        );
    }
}

export default MLDescriptionPage