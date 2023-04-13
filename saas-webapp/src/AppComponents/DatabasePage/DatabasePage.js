import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './DatabasePage.css'
import '../../App.css'
import * as utils from '../Utils.js';
import * as states from './DatabaseStates.js';

//// import { useState } from 'react';
import MLDescriptionPage from './MLDescriptionPage/MLDescriptionPage';
import AudioDescripitonPage from './AudioDescriptionPage/AudioDescripitonPage';

const List = (props) => {
  let divClass = `Audio-Title ${props.active ? 'Active-Audio' : ''}`
  return (
    <div>
      <div className={divClass}>{props.name}</div>
    </div>
  );
};

function AudioList(props) {
  //// const [audios, setAudio] = useState(props.audios);
  const audios = props.audios;
  return (
    <div>
      {audios.map((Audio, index) => {
        return (
          <div
            onClick={() => {
              props.onClick(index);
            }}
            key={index}>
            <List active={Audio.isActive} key={index} name={Audio.name} />
          </div>
        );
      })}
    </div>
  );
}

function HeaderButton(props) {
  const buttonClass = `Header-Audio-Button ${props.isActive ? 'Active-Audio-Button' : ''}`;
  return (
    <div className={buttonClass} onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
      <h3 className="Header-Audio-Button-Name">{props.name}</h3>
    </div>
  )
}

class DatabasePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: states.AudioTabs.AudioDescription,
      audios: [],
      currentAudioIndex: 0,
      currentAudioData: states.EmptyData,
      socket: this.props.socket,
    }
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.initSocketHandling(this.props.socket);
    this.props.socket.emit("Query-audios");
  }

  initSocketHandling(socket) {
    socket.on("Receive-audios", (data) => {
      const map = new Map()
      data.forEach((d) => map.set(d, false));
      const audioArray = Array.from(map, ([n, b]) => ({'name': n, 'isActive': b}))
      this.setState({
        audios: audioArray
      });
    });

    socket.on("Receive-audio-data", (data) => {
      let retrievedData = data;
      const arrayDataDSFactor = 256;
      const downSampledSize = Math.floor(data['AudioData']['size']/arrayDataDSFactor);
      const timeVals = new Array(data['ArrayData'].length)
          .fill(0)
          .map((_, i) => 
              {return i*(1/data['AudioData']['sr'])});
      const downsampled = utils.packAmpVals(timeVals, data['ArrayData'], arrayDataDSFactor, 0);
      const mlOutputs = utils.extractMLAmpVals(
        downsampled,
        data['Output'],
        downSampledSize);
      retrievedData['DownSampledData'] = downsampled;
      retrievedData['DownSampledSize'] = downSampledSize;
      retrievedData['MLData']['Outputs'] = mlOutputs;
      this.setState({
        currentAudioData: retrievedData
      });
    });

    socket.on("ML-finish", (data) => {
      this.state.socket.emit("Query-audio-id", data["ID"]);
    });
  }

  handleHeaderClick(tab) {
    this.setState({
      currentTab: tab
    });
  }

  requestMLProcessing() {
    let audioID = this.state.audios[this.state.currentAudioIndex]['name'];
    // (some socketio stuff to process it)
    this.state.socket.emit("Request-ml", audioID);
  }

  renderButton(tab) {
    // Render to tabs
    return (
      <HeaderButton
        isActive={this.state.currentTab === tab ? true : false}
        name={states.getAudioTabsString(tab)}
        icon={states.getAudioTabsIcon(tab)}
        onClick={() => this.handleHeaderClick(tab)}
      />
    );
  }

  audioClickHandler(audioIndex) {
    // On click for audio index
    let newAudios = this.state.audios;
    newAudios[this.state.currentAudioIndex].isActive = false;
    newAudios[audioIndex].isActive = true;
    this.setState({
      audios: newAudios,
      currentAudioIndex: audioIndex,
      currentAudioData: states.EmptyData,
      currentTab: states.AudioTabs.AudioDescription
    });
    this.state.socket.emit("Query-audio-id", this.state.audios[audioIndex]['name']);
  }

  render() {
    let curPage;
    // list of tabs
    switch(this.state.currentTab) {
      case states.AudioTabs.AudioDescription:
        curPage = <AudioDescripitonPage
                    audio={this.state.audios[this.state.currentAudioIndex]}
                    downSampledVals = {this.state.currentAudioData['DownSampledData']}
                    spectrogram = {this.state.currentAudioData['Spectrogram']}>
                  </AudioDescripitonPage>
      break;
      case states.AudioTabs.MLDescription:
        curPage = <MLDescriptionPage
                    audio={this.state.audios[this.state.currentAudioIndex]}
                    mlData={this.state.currentAudioData['MLData']['Outputs']}
                    calls={this.state.currentAudioData['MLData']['Calls']}
                    mlClickHandler={() => this.requestMLProcessing()}>
                  </MLDescriptionPage>
      break;
      default:
        curPage = <h1>PageNotFound</h1>
    }
    return (
        <div className="Database-Page">
            <div className="Left-Side">
                <div className="Database-Panel List-Panel">
                    <h3 className="Panel-Title">Audio List</h3>
                    <AudioList 
                      audios={this.state.audios}
                      onClick={(index) => this.audioClickHandler(index)}/>
                </div>
            </div>
            <div className="Database-Panel Right-Side Audio-Panel">
                <div className="Header-Audio" >
                  <div className="Header-Audio-Button-Row">
                      {this.renderButton(states.AudioTabs.AudioDescription)}
                      {this.renderButton(states.AudioTabs.MLDescription)}
                  </div>
                </div>
                {curPage}
            </div>
        </div>
    );
  }
}

export default DatabasePage