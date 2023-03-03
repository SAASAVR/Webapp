import React from "react"
import ReactSelect from "react-select";
import ReactSwitch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './AudioDescripitonPage.css'

import * as states from '../../AppTabStates.js';

class AudioDescripitonPage extends React.Component {

    render() {
        let audioName = `${this.props.audio == null ? 'none' : this.props.audio.name}`;
        return(
            <div>
                Audio Description {audioName}
            </div>
        );
    }
}

export default AudioDescripitonPage