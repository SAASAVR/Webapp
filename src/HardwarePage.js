import React from "react"
import ReactSelect from "react-select";
import ReactSwitch from "react-switch";

import './HardwarePage.css'

import * as states from './States.js';

class HardwarePage extends React.Component {

    renderSettingOption(setting) {
        // Options for the interval and threshold settings
        const IntervalOptions = [
            {value: 0, label: 'No interval'},
            {value: 30, label: '30 seconds'},
            {value: 60, label: '1 minute'},
            {value: 120, label: '2 minutes'},
            {value: 300, label: '5 minutes'},
            {value: 600, label: '10 minutes'},
        ];

        const ThreshOptions = [
            {value: 0, label: 'I'},
            {value: 10, label: 'do'},
            {value: 20, label: 'not'},
            {value: 30, label: 'know'},
            {value: 40, label: 'what'},
            {value: 50, label: 'options'},
            {value: 60, label: 'should'},
            {value: 70, label: 'be'},
            {value: 80, label: 'here'},

        ];

        let name = states.getHardwareOptionsString(setting);
        let setter;
        switch (setting) {
            case states.HardwareOptions.Interval:
                setter = <ReactSelect
                            className="Setter Select"
                            styles={{
                                option: provided => ({
                                    ...provided,
                                    color: 'black'
                                }),
                                width: '100em'
                            }}
                            defaultValue={
                                IntervalOptions.filter(
                                    (opt) => opt.value === this.props.hardwareState.interval
                                    )
                                }
                            options={IntervalOptions}
                            onChange={(newVal) => this.props.onSettingsUpdate(
                                setting, newVal.value
                            )}>
                        </ReactSelect>
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
                setter = <ReactSelect
                            className="Setter Select"
                            styles={{
                                option: provided => ({
                                    ...provided,
                                    color: 'black'
                                })
                            }}
                            defaultValue={
                                ThreshOptions.filter(
                                    (opt) => opt.value === this.props.hardwareState.threshold
                                    )
                                }
                            options={ThreshOptions}
                            onChange={(newVal) => this.props.onSettingsUpdate(
                                setting, newVal.value
                            )}>
                        </ReactSelect>
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