
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import {mqttDispatch} from 'utils/mqtt'

import {mqttGetSourcesRequest,
        mqttSetSourceRequest} from '../actions'

import {MAIN_SOURCE,

        MAIN_SOURCE_DESK,
        MAIN_SOURCE_HDMI,
        MAIN_SOURCE_SONIC,
        MAIN_SOURCE_FOH} from 'config/mappings/audio'


class SourceButton extends Component {
  render() {
    let title = this.props.children;

    let btnClass = "btn btn-lg"

    if (this.props.active) {
      btnClass += " btn-success"
    }

    return(
      <button onClick={() => this.props.onClick(this.props.sourceId)}
              className={btnClass}>{title}</button>
    );
  }

}


class SourceSelect extends Component {
  componentDidMount() {
    mqttDispatch(mqttGetSourcesRequest());
  }

  onSetSourceClicked(value) {
    mqttDispatch(mqttSetSourceRequest(MAIN_SOURCE, value));
  }

  render() {
    return (
      <div className="panel panel-grey panel-input-sources row">
         <div className="audio-selector col-sm-6 col-md-3">
            <SourceButton active={this.props.selectedId == MAIN_SOURCE_DESK}
                          sourceId={MAIN_SOURCE_DESK}
                          onClick={this.onSetSourceClicked}>Tisch
            </SourceButton>
         </div>
 
         <div className="audio-selector col-sm-6 col-md-3">
            <SourceButton active={this.props.selectedId == MAIN_SOURCE_HDMI}
                          sourceId={MAIN_SOURCE_HDMI}
                          onClick={this.onSetSourceClicked}>HDMI / Beamer
            </SourceButton>
         </div>

         <div className="audio-selector col-sm-6 col-md-3">
            <SourceButton active={this.props.selectedId == MAIN_SOURCE_SONIC}
                          sourceId={MAIN_SOURCE_SONIC}
                          onClick={this.onSetSourceClicked}>Sonic
            </SourceButton>
         </div>

         <div className="audio-selector col-sm-6 col-md-3">
            <SourceButton active={this.props.selectedId == MAIN_SOURCE_FOH}
                          sourceId={MAIN_SOURCE_FOH}
                          onClick={this.onSetSourceClicked}>Mischpult
            </SourceButton>
         </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    selectedId: state.mainAudio.sourceId
  })
)(SourceSelect);

