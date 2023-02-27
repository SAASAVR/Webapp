import React from "react"
import ReactSwitch from "react-switch";

import './HardwarePage.css'

import * as states from './States.js';

class HardwarePage extends React.Component {
    renderSettingOption(setting) {
        let name = states.getHardwareOptionsString(setting);
        let setter;

        switch (setting) {
            case states.HardwareOptions.Interval:
                setter = <div></div>
            break;
            case states.HardwareOptions.SensorActivated:
                setter = <ReactSwitch 
                            className="Setter"
                            onColor="#00c44e"
                            checkedIcon={false}
                            uncheckedIcon={false}
                            onChange={() => this.props.onSettingsUpdate(
                                setting, !this.props.hardwareState.sensorAct)}
                            checked={this.props.hardwareState.sensorAct}>
                        </ReactSwitch>
            break;
            case states.HardwareOptions.Threshold:
                setter = <div></div>
            break;
            default:
                setter = <div></div>
        };

        return (
            <div className="Settings-Option">
                <p className="Settings-Name">{name}</p>
                {setter}
            </div>
        )
    }

    render() {
        return (
            <div className="Hardware-Page">
                <div className="Left-Side">
                    <div className="Hardware-Panel Status-Panel">
                        <h3 className="Panel-Title">Status</h3>
                    </div>
                    <div className="Hardware-Panel Settings-Panel">
                        <h3 className="Panel-Title">Settings</h3>
                        {this.renderSettingOption(states.HardwareOptions.Interval)}
                        {this.renderSettingOption(states.HardwareOptions.SensorActivated)}
                        {this.renderSettingOption(states.HardwareOptions.Threshold)}
                    </div>
                </div>
                <div className="Hardware-Panel Right-Side Stream-Panel">
                    <h3 className="Panel-Title">Stream</h3>
                </div>
            </div>
        );
    }
}

export default HardwarePage