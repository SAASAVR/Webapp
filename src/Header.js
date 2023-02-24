import React from 'react'

import './Header.css';

import * as states from './States.js';

function HeaderButton(props) {
    return (
        <div className="Header-Button" onClick={props.onClick}>
            <h3>{props.name}</h3>
        </div>
    )
}

class Header extends React.Component {
    renderButton(tab) {
        let buttonName = states.getAppTabsString(tab);
        return(
            <HeaderButton
                name={buttonName}
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
                <div className="Button-Row">
                    {this.renderButton(states.AppTabs.Hardware)}
                    {this.renderButton(states.AppTabs.Database)}
                </div>
            </div>
        );
    }
}

export default Header