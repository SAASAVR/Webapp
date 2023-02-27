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
      hardwareSet: {
        interval: 0,
        sensorAct: false,
        threshold: 20,
      },
    }
  }

  // Function for handling changing hardware settings
  handleHardwareChange(setting, option) {
    switch (setting) {
      case states.HardwareOptions.Interval:
        this.setState({
          hardwareSet: {
            interval: option,
          }
        });
      break;
      case states.HardwareOptions.SensorActivated:
        this.setState({
          hardwareSet: {
            sensorAct: option,
          }
        });
      break;
      case states.HardwareOptions.Threshold:
        this.setState({
          hardwareSet: {
            threshold: option,
          }
        });
      break;
      default:
    };
  }

  // Function for clicking tabs on header
  handleHeaderClick(tab) {
    this.setState({
      currentTab: tab
    });
  }

  render() {
    let curPage;
    switch(this.state.currentTab) {
      case states.AppTabs.Hardware:
        curPage = <HardwarePage 
                    hardwareState={this.state.hardwareSet}
                    onSettingsUpdate={(settings, option) => this.handleHardwareChange(settings, option)}
                  />
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
