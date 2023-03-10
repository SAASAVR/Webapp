import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Header.css';

import * as states from './AppTabStates.js';

function HeaderButton(props) {
    const buttonClass = `Header-Button ${props.isActive ? 'Active-Button' : ''}`;
    return (
        <div className={buttonClass} onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon} />
            <h3 className="Header-Button-Name">{props.name}</h3>
        </div>
    )
}

class Header extends React.Component {
    // tab
    renderButton(tab) {
        return(
            <HeaderButton
                isActive={this.props.activeTab === tab ? true : false}
                name={states.getAppTabsString(tab)}
                icon={states.getAppTabsIcon(tab)}
                onClick={() => this.props.clickHandler(tab)}
            />
        );
    }

    render() {
        return (
            <div className="Header">
                <div className="Header-Button-Row">
                    {this.renderButton(states.AppTabs.Hardware)}
                    {this.renderButton(states.AppTabs.Database)}
                </div>
                <h1 className="Title">SAAS</h1>
            </div>
        );
    }
}

export default Header