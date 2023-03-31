import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './DatabasePage.css'
import '../../App.css'
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
      socket: this.props.socket
    }
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.initSocketHandling(this.props.socket);
    this.props.socket.emit("Query-audios");
  }

  initSocketHandling(socket) {
    socket.on("Receive-audios", (data) => {
      const map = new Map()
      for (let i = 0; i < data.length; i++) {
        let curAudio = data[i];
        map.set(curAudio, false);
      }
      const audioArray = Array.from(map, ([n, b]) => ({'name': n, 'isActive': b}))
      if (audioArray.length > 0) {
        audioArray[0]['isActive'] = true;
      }
      this.setState({
        audios: audioArray
      })
    })
  }

  handleHeaderClick(tab) {
    this.setState({
      currentTab: tab
    });
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
      currentAudioIndex: audioIndex
    });
  }

  render() {
    let curPage;
    // list of tabs
    switch(this.state.currentTab) {
      case states.AudioTabs.AudioDescription:
        curPage = <AudioDescripitonPage
                    audio={this.state.audios[this.state.currentAudioIndex]}>
                  </AudioDescripitonPage>
      break;
      case states.AudioTabs.MLDescription:
        curPage = <MLDescriptionPage
                    audio={this.state.audios[this.state.currentAudioIndex]}>
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