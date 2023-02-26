import React from "react"

import './HardwarePage.css'

class HardwarePage extends React.Component {
    render() {
        return (
            <div className="Hardware-Page">
                <div className="Settings-Panel">
                    <h3>Settings</h3>
                </div>
                <div className="Stream-Panel">
                    <h3>Stream</h3>
                </div>
            </div>
        );
    }
}

export default HardwarePage