import React from "react"

import ReactSelect from "react-select";
import ReactSwitch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './DatabasePage.css'
import './App.css'
import * as states from './States.js';
class DatabasePage extends React.Component {
    render() {
        return (
            <div className="Database-Page">
                <div className="Left-Side">
                    <div className="Database-Panel Left-Side List-Panel">
                        <h3 className="Panel-Title">Status</h3>
                        </div>
                        </div>
                <div className="Database-Panel Right-Side Audio-Panel">
                    <h3 className="Panel-Title">Stream</h3>
                </div>
            </div>
        );
    }
}

export default DatabasePage