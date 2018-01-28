
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




class SourceSelect extends Component {
  componentDidMount() {
    mqttDispatch(mqttGetSourcesRequest());
  }

  onSetSourceClicked(value) {
    mqttDispatch(mqttSetSourceRequest(MAIN_SOURCE, value));
  }

  render() {
    return (
      <div className="panel panel-grey panel-input-sources">
         <button onClick={() => this.onSetSourceClicked(MAIN_SOURCE_DESK)}
                 className="btn btn-lg">Tisch</button>
         <button onClick={() => this.onSetSourceClicked(MAIN_SOURCE_HDMI)}
                 className="btn btn-lg">HDMI / Beamer</button>
         <button onClick={() => this.onSetSourceClicked(MAIN_SOURCE_SONIC)} 
                 className="btn btn-lg">Sonic</button>
         <button onClick={() => this.onSetSourceClicked(MAIN_SOURCE_FOH)}
                 className="btn btn-lg">Mischpult</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    
  })
)(SourceSelect);

