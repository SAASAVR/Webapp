import React from "react"
import ReactSelect from "react-select";
import ReactSwitch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './MLDescriptionPage.css'

import * as states from './States.js';

class MLDescriptionPage extends React.Component {
    render() {
        let audioName = `${this.props.audio == null ? 'none' : this.props.audio.name}`;
        return(
            <div>
                Hi1 {audioName}
            </div>
        );
    }
}

export default MLDescriptionPage