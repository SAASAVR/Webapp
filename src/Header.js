import React from 'react'
import './Header.css';

function HeaderButton(props) {
    return (
        <div className="Header-Button">
            <h3>{props.name}</h3>
        </div>
    )
}

class Header extends React.Component {
    renderButton(name) {
        return(
            <HeaderButton
                name={name}
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
                    {this.renderButton('Hardware')}
                    {this.renderButton('Database')}
                </div>
            </div>
        );
    }
}

export default Header