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
  return (
    <div>
      <div className="Audio-Title">{props.name}</div>
    </div>
  );
};

function AudioList() {
  const [audios, setAudio] = useState([
    {
      name: 'Audio 1',
    },
    {
      name: 'Audio 2',
    },
    {
      name: 'Audio 3',
    },
    {
      name: 'Audio 4',
    },
    {
      name: 'Audio 5',
    },
    {
      name: 'Audio 6',
    },
    {
      name: 'Audio 7',
    },
  ]);

  const handlechange = (index) => {
    const newAudio = [...audios];

    newAudio[index].name = 'New Name';
    setAudio(newAudio);
  };

  return (
    <div>
      {audios.map((Audio, index) => {
        return (
          <div
            onClick={() => {
              handlechange(index);
            }}
            key={index}>
            <List key={index} name={Audio.name} />
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


    render() {
      let curPage;
      switch(this.state.currentTab) {
        case states.AudioTabs.AudioDescription:
          curPage = <AudioDescripitonPage></AudioDescripitonPage>
        break;
        case states.AudioTabs.MLDescription:
          curPage = <MLDescriptionPage></MLDescriptionPage>
        break;
        default:
          curPage = <h1>PageNotFound</h1>
      }
        return (
            <div className="Database-Page">
                <div className="Left-Side">
                    <div className="Database-Panel List-Panel">
                        <h3 className="Panel-Title">Audio List</h3>
                        <AudioList/>
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