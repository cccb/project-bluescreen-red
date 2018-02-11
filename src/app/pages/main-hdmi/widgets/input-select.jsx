
import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'

import {mqttDispatch} from 'utils/mqtt'

import {IN_DESK,
        IN_TALK,
        IN_FOH,
        IN_NUC} from 'config/mappings/hdmi'

import {mqttGetChannelInputsRequest,
        
        mqttSetChannelAInputRequest,
        mqttSetChannelBInputRequest} from '../actions'


import Scroller from 'components/spinners/scroller'

class ChannelButtonView extends Component {

  onClick() {
    // Handle channel select
    let input = this.props.input;
    let output = this.props.output;

    if(output == "A") {
      mqttDispatch(mqttSetChannelAInputRequest(input));
    }
    else {
      mqttDispatch(mqttSetChannelBInputRequest(input));
    }
  }

  render() {
    let inProgress = false;
    let isSelected = false;

    // Determine state
    if (this.props.output == "A") {
      inProgress = (this.props.input == this.props.inProgressA);
      isSelected = (this.props.input == this.props.selectedA);
    }
    else {
      inProgress = (this.props.input == this.props.inProgressB);
      isSelected = (this.props.input == this.props.selectedB);
    }

    let hasProgress = 
      (this.props.inProgressA >= 0 && this.props.output == "A") ||
      (this.props.inProgressB >- 0 && this.props.output == "B");
  

    let clsClass = "btn btn-lg btn-block"; 
    if (isSelected && !hasProgress) {
      clsClass += " btn-success"; 
    }

    if (inProgress) {
      clsClass += " btn-info";
    }

    return (
      <button className={clsClass}
              onClick={() => this.onClick()}>
        {inProgress && <Scroller />}
        {this.props.children}
        {inProgress && <Scroller rtl={true} />}
      </button>
    );
  }
}

export const ChannelButton = connect(
  (state) => ({
    selectedA: state.mainHdmi.selectedA,
    selectedB: state.mainHdmi.selectedB,

    inProgressA: state.mainHdmi.inProgressA,
    inProgressB: state.mainHdmi.inProgressB
  })
)(ChannelButtonView);



export default class HdmiInputSelect extends Component {
  componentDidMount() {
    // Update selected state
    mqttDispatch(mqttGetChannelInputsRequest());
  }

  render() {
    const output = this.props.output;

    return(
      <div className="hdmi-channel-input">
        <ChannelButton input={IN_DESK}
                       output={output}>Tisch</ChannelButton>
        <ChannelButton input={IN_TALK}
                       output={output}>Vortrag</ChannelButton>
        <ChannelButton input={IN_FOH}
                       output={output}>FOH</ChannelButton>
        <ChannelButton input={IN_NUC}
                       output={output}>NUC</ChannelButton>
      </div>
    );
  }

}

