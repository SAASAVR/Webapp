import logo from './logo.svg';
import React from 'react';

import './App.css';


import Header from './Header.js';
import * as states from './States.js';
import HardwarePage from './HardwarePage';
import DatabasePage from './DatabasePage';

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
    let curPage;
    switch(this.state.currentTab) {
      case states.AppTabs.Hardware:
        curPage = <HardwarePage/>
      break;
      case states.AppTabs.Database:
        curPage = <DatabasePage/>
      break;
      default:
        curPage = <h1>PageNotFound</h1>
    }

    return (
      <div className="App">
        <Header 
          activeTab={this.state.currentTab}
          clickHandler={tab => this.handleHeaderClick(tab)}
        />
        {curPage}
      </div>
    );
  }
}

export default App;
