
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import {mqttDispatch} from 'utils/mqtt'

import {mqttGetAudioModeRequest} from '../actions'

class AudioModeStatus extends Component {
  componentDidMount() {
    mqttDispatch(mqttGetAudioModeRequest());
  }

  render() {
    return (
      <span className="hdmi-audio-mode-status">
        Audio Mode: <b>{this.props.mode}</b>
      </span>
    );
  }
}


export default connect(
  (state) => ({
    "modeId": state.mainHdmi.audioMode,
    "mode": state.mainHdmi.audioModeInfo
  })
)(AudioModeStatus);

