import React from "react"
import './MLDescriptionPage.css'
import LineGraphML from "../../Graphs/LineGraphML";

//// import * as states from '../../AppTabStates.js';

class MLDescriptionPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.state.data)
        let audioName = `${this.props.audio == null ? 'none' : this.props.audio.name}`;
        let userView = this.props.mlData.length === 0 ?
            <button className="ML-Process-Button" onClick={this.props.mlClickHandler}>process</button> :
            <LineGraphML data={this.props.mlData}></LineGraphML>;
        return(
            <div className="ML-Div">
                <h3>MLDescription {audioName}</h3>
                {userView}
            </div>
        );
    }
}

export default MLDescriptionPage