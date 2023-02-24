import React from 'react'

import './Header.css';

import * as states from './States.js';

function HeaderButton(props) {
    const buttonClass = `Header-Button ${props.isActive ? 'Active-Button' : ''}`
    return (
        <div className={buttonClass} onClick={props.onClick}>
            <h3 className="Header-Button-Name">{props.name}</h3>
        </div>
    )
}

class Header extends React.Component {
    renderButton(tab) {
        return(
            <HeaderButton
                isActive={this.props.activeTab === tab ? true : false}
                name={states.getAppTabsString(tab)}
                onClick={() => this.props.clickHandler(tab)}
            />
        );
    }

    render() {
        return (
            <div className="Header">
                <div className='TitleDiv'>
                    <h1 className="Title">SAAS</h1>
                </div>
                <div className="Header-Button-Row">
                    {this.renderButton(states.AppTabs.Hardware)}
                    {this.renderButton(states.AppTabs.Database)}
                </div>
            </div>
        );
    }
}

export default Header