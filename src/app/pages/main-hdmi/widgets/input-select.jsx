
import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'

import {mqttDispatch} from 'utils/mqtt'

import {IN_NUC,
        IN_TABLE,
        IN_FOH,
        IN_APPLETV,

        OUT_BEAMER} from 'config/mappings/hdmi'

import {mqttGetSelectedInputRequest,
        mqttSetSelectedInputRequest,

        mqttGetAudioModeRequest,
        mqttSetAudioModeRequest,

        mqttGetAutoSelectRequest,
        mqttSetAutoSelectRequest,

        mqttGetConnectionStatesRequest} from '../actions'

import Scroller from 'components/spinners/scroller'


function ConnectionIndicator(props) {
  let status = "";
  if (props.connected) {
    status = "♥";
  }

  return (
    <span className="hdmi-connection-indicator">
      {status}
    </span>
  );
}

class ChannelButtonView extends Component {
  render() {
    // Determine state
    let isSelected = (this.props.input == this.props.selected);
    let isConnected = this.props.connections[this.props.input];

    let clsClass = "btn btn-lg btn-block btn-channel";
    if (isSelected) {
      clsClass += " btn-success";
    }

    if (!isConnected) {
      clsClass += " btn-disabled";
    }

    return (
      <button className={clsClass}
              onClick={this.props.onClick}>
            {this.props.children}
            <ConnectionIndicator connected={isConnected} />
      </button>
    );
  }
}

export const ChannelButton = connect(
  (state) => ({
    connections: state.mainHdmi.connections,
    selected: state.mainHdmi.selectedInput
  })
)(ChannelButtonView);




export default class HdmiInputSelect extends Component {
  componentDidMount() {
    // Initialize state
    mqttDispatch(mqttGetSelectedInputRequest());
    mqttDispatch(mqttGetAudioModeRequest());
    mqttDispatch(mqttGetConnectionStatesRequest());
  }

  selectInput(inputId) {
    mqttDispatch(mqttSetSelectedInputRequest(inputId));
  }

  setAutoSelect(enabled) {
    mqttDispatch(mqttSetAutoSelectRequest(enabled));
  }

  render() {
    const output = this.props.output;

    return(
      <div className="hdmi-channel-input col-md-12">
        <div className="col-xs-6 col-md-12">
          <ChannelButton
            input={IN_TABLE}
            onClick={() => this.selectInput(IN_TABLE)}>Table</ChannelButton>
        </div>
        <div className="col-xs-6 col-md-12">
          <ChannelButton
            input={IN_NUC}
            onClick={() => this.selectInput(IN_NUC)}>Keksdose</ChannelButton>
        </div>
        <div className="col-xs-6 col-md-12">
          <ChannelButton
            input={IN_APPLETV}
            onClick={() => this.selectInput(IN_APPLETV)}
          >AppleTV</ChannelButton>
        </div>
        <div className="col-xs-6 col-md-12">
          <ChannelButton
            input={IN_FOH}
            onClick={() => this.selectInput(IN_FOH)}>FOH</ChannelButton>
        </div>
      </div>
    );
  }

}

