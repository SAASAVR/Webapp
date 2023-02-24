import logo from './logo.svg';
import React from 'react';

import './App.css';

import Header from './Header.js';
import * as states from './States.js';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      currentTab: states.AppTabs.Hardware,
    }
  }

  handleHeaderClick(tab) {
    this.setState({
      currentTab: tab
    });
  }

  render() {
    let currentTabName = states.getAppTabsString(this.state.currentTab);
    console.log(currentTabName);

    return (
      <div className="App">
        <Header 
          clickHandler={tab => this.handleHeaderClick(tab)}
        />
        <h1>{currentTabName}</h1>
      </div>
    );
  }
}

export default App;
