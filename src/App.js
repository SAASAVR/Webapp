import React from 'react';

import './App.css';


import Header from './AppComponents/Header.js';
import * as states from './AppComponents/AppTabStates.js';
import * as HWStates from './AppComponents/HardwarePage/HardwareStates.js';
import HardwarePage from './AppComponents/HardwarePage/HardwarePage';
import DatabasePage from './AppComponents/DatabasePage/DatabasePage';

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
      hardwareStatus: HWStates.HardwareStatus.Connected,
      currentData: [],
    }
  }

  // Test delay function
  wait(ms) {
    let start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
    console.log(this.state.currentData);
  }

  // Test function for simulating data generation
  simDataGen(iter) {
    if (iter > 10) {
      return;
    }
    console.log("simming");
    const start = (iter-1)*5;
    const end = (iter*5);
    let vals = []
    for (let i = start; i < end; i++) {
      let x = i*(Math.PI/8);
      let y = Math.sin(x);
      vals.push({"name": x, "val": y});
    }
    
    let curVals = this.state.currentData;
    let newVals = curVals.concat(vals); 

    this.setState({
      currentData: newVals},
      () => {
      this.wait(1000);
      this.simDataGen(++iter);
    });
  }

  beginRecording() {
    this.setState({
      hardwareStatus: HWStates.HardwareStatus.Recording
    }, this.simDataGen(1));
    console.log("I will be recording now");
  }

  stopRecording() {
    this.setState({
      hardwareStatus: HWStates.HardwareStatus.Saving
    });
    console.log("I am not recording now");
  }

  // Function to handle recording -> connect to hardware
  toggleRecording() {
    let newStateFunc;
    if (this.state.hardwareStatus === HWStates.HardwareStatus.Connected) {
      newStateFunc = () => this.beginRecording();
    } else {
      newStateFunc = () => this.stopRecording();
    }
    newStateFunc.call();
  }

  // Function for handling changing hardware settings
  handleHardwareChange(setting, option) {
    switch (setting) {
      case HWStates.HardwareOptions.Interval:
        this.setState({
          hardwareSet: {
            interval: option,
          }
        });
      break;
      case HWStates.HardwareOptions.SensorActivated:
        this.setState({
          hardwareSet: {
            sensorAct: option,
          }
        });
      break;
      case HWStates.HardwareOptions.Threshold:
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
                    hardwareSettings={this.state.hardwareSet}
                    hardwareStatus={this.state.hardwareStatus}
                    onSettingsUpdate={(settings, option) => this.handleHardwareChange(settings, option)}
                    recordHandler={() => this.toggleRecording()}
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
