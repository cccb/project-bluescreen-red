
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import Panel from 'components/containers/panel'
import VSlider from 'components/inputs/vslider'

import {fmtPercent} from 'utils/fmt'

import {mqttDispatch} from 'utils/mqtt'

import {mqttSetLevelRequest,
        mqttGetLevelsRequest,
        mqttGetTogglesRequest,
        setMasterVolume} from '../main-audio/actions'

import {debounce} from 'lodash'

import LightPresets from 'pages/lights/widgets/presets'
import AudioSourceSelect from 'pages/main-audio/widgets/source-select'


// Ratelimit updates
const debouncedMqttDispatch = debounce(mqttDispatch, 5);

class MasterVolumeControl extends Component {
  render() {
    return (
      <div className="volume-ctrl box-centered-content">
        <div className="volume-title">
          Master Volume
        </div>
        <div className="volume-input">
          <VSlider value={this.props.level} max={100} min={0}
                   onchange={this.props.onchange} />
        </div>
        <div className="volume-value">
          {fmtPercent(this.props.level)}
        </div>
      </div>
    );
  }
}


class MainHallPage extends Component {
  
  componentDidMount() {
    // Request current state from main soundweb
    mqttDispatch(mqttGetLevelsRequest());
    mqttDispatch(mqttGetTogglesRequest());
  }

  onMasterVolumeChanged(value) {
    this.props.dispatch(setMasterVolume(value));
    debouncedMqttDispatch(mqttSetLevelRequest(1, value));
  }

  render() {
    return (
      <div className="page page-mainhall">

        <div className="content">
          <div className="col-md-6">

            <Panel title="Audio">
              <div className="row">
                <div className="col-md-4 box-centered">
                  <MasterVolumeControl level={this.props.masterVolumeLevel}
                                       onchange={(value) => this.onMasterVolumeChanged(value)} />

                  <div className="box-ctrl">
                    <button className="btn btn-lg">Mute</button>
                  </div>
                </div>

                <div className="col-md-8">
                  <AudioSourceSelect />
                </div>

              </div>
            </Panel>

          </div>

          <div className="col-md-6">

            <Panel title="Beamer">


            </Panel>

          </div>

          <div className="col-md-12">
            <LightPresets title="Light Presets" />
          </div>
        </div>
        

      </div>
    );
  }
}


export default connect(
  (state) => ({
    masterVolumeLevel: state.mainAudio.masterVolumeLevel
  })
)(MainHallPage);

