import React from "react"

import './HardwarePage.css'

class HardwarePage extends React.Component {
    render() {
        return (
            <div className="Hardware-Page">
                <div className="Hardware-Panel Settings-Panel">
                    <h3 className="Panel-Title">Settings</h3>
                    <div className="Settings-Option">
                        <p>Interval</p>
                    </div>
                    <div className="Settings-Option">
                        <p>Sensor-activated</p>
                    </div>
                    <div className="Settings-Option">
                        <p>Threshold</p>
                    </div>
                </div>
                <div className="Hardware-Panel Stream-Panel">
                    <h3 className="Panel-Title">Stream</h3>
                </div>
            </div>
        );
    }
}

export default HardwarePage