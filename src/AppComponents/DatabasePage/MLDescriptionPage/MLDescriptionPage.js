import React from "react"
import './MLDescriptionPage.css'

//// import * as states from '../../AppTabStates.js';

class MLDescriptionPage extends React.Component {
    render() {
        let audioName = `${this.props.audio == null ? 'none' : this.props.audio.name}`;
        return(
            <div>
                MLDescription {audioName}
            </div>
        );
    }
}

export default MLDescriptionPage