
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'



import Panel from 'components/containers/panel'


import {mqttDispatch} from 'utils/mqtt'

import {mqttSamplesListRequest,
        mqttSampleStartRequest,
        mqttSampleStopRequest} from './actions'


class SoundboardPage extends Component {
  
  componentDidMount() {
    mqttDispatch(mqttSamplesListRequest("*"));
  }

  render() {
    return (
      <div className="page page-soundboard noselect row">
        Soundboard
      </div>
    );
  }

}

export default connect(
  (state) => ({
    groups: state.soundboard.groups,
    samples: state.soundboard.samples,
  })
)(SoundboardPage);


