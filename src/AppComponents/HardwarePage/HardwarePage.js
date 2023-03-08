import React from "react"
import ReactSelect from "react-select";
import ReactSwitch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './HardwarePage.css'

import * as states from './HardwareStates.js';

class HardwarePage extends React.Component {
    // Status of Hardware
    renderStatus(status) {
        let statusIcon = states.getHardwareStatusIcon(status);
        let recordIcon = states.getRecordingStatusIcon(status);
        let statusIndicator;
        let recordIndicator;

        switch (status) {
            case states.HardwareStatus.Connecting:
                statusIndicator = <FontAwesomeIcon icon={statusIcon} fade color="#00c44e"/>
                recordIndicator = <FontAwesomeIcon icon={recordIcon} color="gray"/>
            break;
            case states.HardwareStatus.Connected:
                statusIndicator = <FontAwesomeIcon icon={statusIcon} color="#00c44e"/>
                recordIndicator = <FontAwesomeIcon icon={recordIcon} color="#e8cf15"/>
            break;
            case states.HardwareStatus.Recording:
                statusIndicator = <FontAwesomeIcon icon={statusIcon} color="#00c44e"/>
                recordIndicator = <FontAwesomeIcon icon={recordIcon} fade color="red"/>
            break;
            case states.HardwareStatus.Saving:
                statusIndicator = <FontAwesomeIcon icon={statusIcon} color="#00c44e"/>
                recordIndicator = <FontAwesomeIcon icon={recordIcon} spin/>
            break;
            default: // not connected
                statusIndicator = <FontAwesomeIcon icon={statusIcon} color="gray"/>
                recordIndicator = <FontAwesomeIcon icon={recordIcon} color="gray"/>
            break;

        }

        return (
            <div className="Status-Pane">
                <div className="Status-Row">
                    <p className="Status-Name">{states.getHardwareStatusString(status)}</p>
                    {statusIndicator}
                </div>
                <div className="Status-Row">
                    <p className="Status-Name">{states.getRecordingStatusString(status)}</p>
                    {recordIndicator}
                </div>
            </div>
        )
    }

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
                            defaultValue={
                                IntervalOptions.filter(
                                    (opt) => opt.value === this.props.hardwareSettings.interval
                                    )
                                }
                            options={IntervalOptions}
                            onChange={(newVal) => this.props.onSettingsUpdate(
                                setting, newVal.value
                            )}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                ...theme.colors,
                                  neutral0: '#1b1c1e',
                                  neutral5: 'white',
                                  neutral10: 'white',
                                  neutral50: 'white',
                                  neutral80: 'white',
                                  primary25: '#383b45',
                                  primary50: '#383b45',
                                  primary: '#383b45',
                                },
                              })}
                              styles={{
                                control: (provided, state) => ({
                                  ...provided,
                                  boxShadow: "none",
                                  border: "none"
                                }),
                                menu: (provided, state) => ({
                                  ...provided,
                                  border: "1px solid #1b1c1e",
                                  backgroundColor: "#383b45",
                                  boxShadow: "none"
                                }),
                                option: (provided, state) => ({
                                   ...provided,
                                   backgroundColor: state.isFocused && "#1b1c1e",
                                   color: state.isFocused && "white"
                                })
                              }}>
                        </ReactSelect>
            break;
            case states.HardwareOptions.SensorActivated:
                setter = <ReactSwitch 
                            className="Setter"
                            onColor="#00c44e"
                            checkedIcon={false}
                            uncheckedIcon={false}
                            onChange={() => this.props.onSettingsUpdate(
                                setting, !this.props.hardwareSettings.sensorAct)}
                            checked={this.props.hardwareSettings.sensorAct}>
                        </ReactSwitch>
            break;
            case states.HardwareOptions.Threshold:
                setter = <ReactSelect
                            className="Setter Select"
                            defaultValue={
                                ThreshOptions.filter(
                                    (opt) => opt.value === this.props.hardwareSettings.threshold
                                    )
                                }
                            options={ThreshOptions}
                            onChange={(newVal) => this.props.onSettingsUpdate(
                                setting, newVal.value
                            )}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                ...theme.colors,
                                  neutral0: '#1b1c1e',
                                  neutral5: 'white',
                                  neutral10: 'white',
                                  neutral50: 'white',
                                  neutral80: 'white',
                                  primary25: '#383b45',
                                  primary50: '#383b45',
                                  primary: '#383b45',
                                },
                              })}
                              styles={{
                                control: (provided, state) => ({
                                  ...provided,
                                  boxShadow: "none",
                                  border: "none"
                                }),
                                menu: (provided, state) => ({
                                  ...provided,
                                  border: "1px solid #1b1c1e",
                                  backgroundColor: "#383b45",
                                  boxShadow: "none"
                                }),
                                option: (provided, state) => ({
                                   ...provided,
                                   backgroundColor: state.isFocused && "#1b1c1e",
                                   color: state.isFocused && "white"
                                })
                              }}>
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
                        {this.renderStatus(this.props.hardwareStatus)}
                        {this.props.hardwareStatus === states.HardwareStatus.Connected ? 
                            <button 
                                className="Record-Button"
                                onClick={this.props.recordHandler}>
                                    Record
                            </button> : 
                            <button 
                                className="Record-Button"
                                disabled
                                onClick={this.props.recordHandler}>
                                    Record
                            </button>
                        }
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