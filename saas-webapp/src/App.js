import React from 'react';
import { io } from "socket.io-client";

import './App.css';

import * as utils from './AppComponents/Utils.js';
import Header from './AppComponents/Header.js';
import * as states from './AppComponents/AppTabStates.js';
import * as HWStates from './AppComponents/HardwarePage/HardwareStates.js';
import HardwarePage from './AppComponents/HardwarePage/HardwarePage';
import DatabasePage from './AppComponents/DatabasePage/DatabasePage';

class App extends React.Component{

  constructor(props) {
    super(props);

    const servSocket = io("localhost:5000/", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000/",
      },
    });

    this.state = {
      socket: servSocket,
      currentTab: states.AppTabs.Hardware,
      hardwareSet: {
        interval: 0,
        sensorAct: false,
        threshold: 20,
      },
      hardwareStatus: HWStates.HardwareStatus.NotConnected,
      curData: [],
      samplingRate: 0
    }

    this.initSocketHandling(servSocket)

    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      servSocket.disconnect();
      
      // Chrome requires returnValue to be set.
      event.returnValue = '';
    
      this.props.apiCall();
    });
  
    servSocket.emit("UI-connect")
  }

  // Initiates socket handlers for the front-end
  initSocketHandling(socket) {
    socket.on("SAAS-connect", () => {
      console.log("SAAS connected")
      this.setState({
        hardwareStatus: HWStates.HardwareStatus.Connecting,
      });
    })

    socket.on("SAAS-ready", () => {
      this.setState({
        hardwareStatus: HWStates.HardwareStatus.Connected,
      })
    })
  }

  // Test function for simulating data generation
  simDataGen(iter) {
    if (iter > 1000) {
      return;
    }
    const start = (iter-1)*5;
    const end = (iter*5);
    let newData = this.state.curData.concat(utils.testData.slice(start, end));

    this.setState({
      data: newData
      },
      () => {
        setTimeout(() => {
          this.simDataGen(++iter)
        }, 100)
    });
  }

  beginRecording() {
    this.setState({
      hardwareStatus: HWStates.HardwareStatus.Recording,
      samplingRate: utils.testSampleRate,
    });
    this.simDataGen(1)
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
                    data={this.state.curData}
                    sampleRate={this.state.sampleRate}
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