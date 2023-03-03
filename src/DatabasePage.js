import React from "react"

import ReactSelect from "react-select";
import ReactSwitch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './DatabasePage.css'
import './App.css'
import * as states from './States.js';

import { useState } from 'react';
import MLDescriptionPage from './MLDescriptionPage';
import AudioDescripitonPage from './AudioDescripitonPage';

const List = (props) => {
  let divClass = `Audio-Title ${props.active ? 'Active-Audio' : ''}`
  return (
    <div>
      <div className={divClass}>{props.name}</div>
    </div>
  );
};

function AudioList(props) {
  const [audios, setAudio] = useState(props.audios);

  // const handlechange = (index) => {
  //   const newAudio = [...audios];

  //   newAudio[index].name = 'New Name';
  //   setAudio(newAudio);
  // };

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
      audios: getAudios(),
      
      currentAudioIndex: 0
    }
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
  }

  handleHeaderClick(tab) {
    this.setState({
      currentTab: tab
    });
  }

  renderButton(tab) {
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

// We would grab audios here from the data
function getAudios() {
  const audios = [
    {
      name: 'Audio 1',
      isActive: false,
    },
    {
      name: 'Audio 2',
      isActive: false,
    },
    {
      name: 'Audio 3',
      isActive: false,
    },
    {
      name: 'Audio 4',
      isActive: false,
    },
    {
      name: 'Audio 5',
      isActive: false,
    },
    {
      name: 'Audio 6',
      isActive: false,
    },
    {
      name: 'Audio 7',
      isActive: false,
    },
  ];
  return audios;
}

export default DatabasePage