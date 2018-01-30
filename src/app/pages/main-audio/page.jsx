
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import {mqttDispatch} from 'utils/mqtt'


// Components
import Panel from 'components/containers/panel'
import VSlider from 'components/inputs/vslider'
import Toggle from 'components/inputs/toggle'
import VolumeControl from 'components/inputs/volume-control'

import AudioSourceSelect from './widgets/source-select'


import {MAIN_MASTER_LEVEL,
        MAIN_BAR_LEVEL,
        MAIN_DELAY_LEVEL,
        MAIN_BASS_LEVEL,

        MAIN_MUTE_MASTER_TOGGLE,
        MAIN_MUTE_BAR_TOGGLE} from 'config/mappings/audio'

import {mqttSetLevelRequest,
        mqttGetLevelsRequest,
        mqttGetTogglesRequest,
        mqttSetToggleRequest,
        setMasterVolume} from './actions'


// Ratelimit updates
import {debounce} from 'lodash'
const debouncedMqttDispatch = debounce(mqttDispatch, 5);

class MainAudioPage extends Component {

  componentDidMount() {
    // Request current state from main soundweb
    mqttDispatch(mqttGetLevelsRequest());
    mqttDispatch(mqttGetTogglesRequest());
  }

  onMasterVolumeChanged(value) {
    debouncedMqttDispatch(mqttSetLevelRequest(MAIN_MASTER_LEVEL, value));
  }

  onBarVolumeChanged(value) {
    debouncedMqttDispatch(mqttSetLevelRequest(MAIN_BAR_LEVEL, value));
  }

  onBassChanged(value) {
    debouncedMqttDispatch(mqttSetLevelRequest(MAIN_BASS_LEVEL, value));
  }

  onMasterVolumeMuteToggle(nextState) {
    mqttDispatch(mqttSetToggleRequest(MAIN_MUTE_MASTER_TOGGLE, nextState));
  }

  onBarVolumeMuteToggle(nextState) {
    mqttDispatch(mqttSetToggleRequest(MAIN_MUTE_BAR_TOGGLE, nextState));
  }

  render() {
    return (
      <div className="page page-mainaudio">
        <div className="content">
          <div className="col-md-8">
            <Panel title="Volume">

              <div className="row">
                <div className="col-md-6 box-centered">
                  <VolumeControl title="Master"
                                 level={this.props.masterVolumeLevel}
                                 onchange={(value) => this.onMasterVolumeChanged(value)} />

                  <div className="box-ctrl">
                    <Toggle onToggle={(s) => this.onMasterVolumeMuteToggle(s)}
                            active={this.props.masterVolumeMute}>
                        Mute
                    </Toggle>
                  </div>
                </div>

                <div className="col-md-6 box-centered">
                  <VolumeControl title="Bar"
                                 level={this.props.barVolumeLevel}
                                 onchange={(value) => this.onBarVolumeChanged(value)} />

                  <div className="box-ctrl">
                    <Toggle onToggle={(s) => this.onBarVolumeMuteToggle(s)}
                            active={this.props.barMute}>
                         Mute
                    </Toggle>
                  </div>
                </div>
              </div>
            </Panel>
          </div>

          <div className="col-md-4">
            <Panel title="Sound">
              <div className="row">
                <div className="col-md-12 box-centered">
                  <VolumeControl title="Bass"
                                 level={this.props.bassLevel}
                                 onchange={(value) => this.onBassChanged(value)} />

                </div>
              </div>
            </Panel>
          </div>

          <div className="col-md-12 audio-source-h">
            <Panel title="Source">
              <AudioSourceSelect />
            </Panel>
          </div>

        </div>
      </div>
    );
  }

}


export default connect(
  (state) => ({
    masterVolumeLevel: state.mainAudio.masterVolumeLevel,
    barVolumeLevel: state.mainAudio.barLevel,

    bassLevel: state.mainAudio.bassLevel,

    barMute: state.mainAudio.barMute,
    masterVolumeMute: state.mainAudio.masterVolumeMute
  })
)(MainAudioPage);

