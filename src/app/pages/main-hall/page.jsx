
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import Panel from 'components/containers/panel'
import VSlider from 'components/inputs/vslider'
import Toggle from 'components/inputs/toggle'
import VolumeControl from 'components/inputs/volume-control'

import {fmtPercent} from 'utils/fmt'

import {mqttDispatch} from 'utils/mqtt'

import {OUT_BEAMER} from 'config/mappings/hdmi'

import {MAIN_MASTER_LEVEL,
        MAIN_MUTE_MASTER_TOGGLE} from 'config/mappings/audio'

import {mqttSetLevelRequest,
        mqttGetLevelsRequest,
        mqttGetTogglesRequest,
        mqttSetToggleRequest,
        setMasterVolume} from '../main-audio/actions'

import {debounce} from 'lodash'

import LightPresets from 'pages/lights/widgets/presets'
import AudioSourceSelect from 'pages/main-audio/widgets/source-select'
import HdmiInputSelect from 'pages/main-hdmi/widgets/input-select'
import HdmiAutoSelectToggle from 'pages/main-hdmi/widgets/auto-select-toggle'
import HdmiAudioModeStatus from 'pages/main-hdmi/widgets/audio-mode-status'

import TasmotaToggle from 'components/tasmota/toggle'
import {connectDevice} from 'components/tasmota/devices'
import {tasmotaStatusUpdateRequest,
        tasmotaStatusRequest} from 'components/tasmota/actions'

// Ratelimit updates
const debouncedMqttDispatch = debounce(mqttDispatch, 5);


class MusicPowerToggleView extends Component {
  powerIndicatorClass(state) {
    if (state == "ON") {
      return "btn-warning";
    }
    return "btn-primary";
  }

  componentDidMount() {
    mqttDispatch(tasmotaStatusRequest(
      this.props.deviceId, "power"
    ));
  }

  togglePower() {
    const state = this.props.device.state||{};
    if (state.power == "ON") {
      mqttDispatch(tasmotaStatusUpdateRequest(
        this.props.deviceId, "power", "off"
      ));
    } else {
      mqttDispatch(tasmotaStatusUpdateRequest(
        this.props.deviceId, "power", "on"
      ));
    }
  }

  render() {
    const state = this.props.device.state||{};
    let title = "Power On";
    if (state.power === "ON") {
      title = "Power Off";
    }

    let btnClass = `btn btn-block btn-lg ${this.powerIndicatorClass(state.power)}`;
    return (
      <div className="panel power-button-container">
          <button onClick={() => this.togglePower()}
                  className={btnClass}>
            {title}
          </button>
      </div>
    );
  }
}

const MusicPowerToggle = connectDevice(MusicPowerToggleView);


class MainHallPage extends Component {

  componentDidMount() {
    // Request current state from main soundweb
    mqttDispatch(mqttGetLevelsRequest());
    mqttDispatch(mqttGetTogglesRequest());
  }

  onMasterVolumeChanged(value) {
    this.props.dispatch(setMasterVolume(value));
    debouncedMqttDispatch(mqttSetLevelRequest(MAIN_MASTER_LEVEL,
                                              value));
  }

  onMasterVolumeMuteToggle(nextState) {
    mqttDispatch(mqttSetToggleRequest(MAIN_MUTE_MASTER_TOGGLE, nextState));
  }

  render() {
    return (
      <div className="page page-mainhall">

        <div className="content">
          <div className="col-md-8">

            <Panel title="Audio">
              <div className="row">
                <div className="col-xs-4 box-centered">
                  <VolumeControl title="Master Volume"
                                   level={this.props.masterVolumeLevel}
                                   onchange={(value) => this.onMasterVolumeChanged(value)} />

                  <div className="box-ctrl">
                    <Toggle onToggle={(s) => this.onMasterVolumeMuteToggle(s)}
                            active={this.props.masterVolumeMute}>
                        Mute
                    </Toggle>
                  </div>
                </div>

                <div className="col-xs-8">
                  <MusicPowerToggle deviceId="power-music" />
                  <AudioSourceSelect />
                </div>

              </div>
            </Panel>

          </div>

          <div className="col-md-4">
            <Panel title="Video">
              <div className="beamer-source-select row">
                  <HdmiInputSelect output={OUT_BEAMER} />
              </div>
              <div className="beamer-status row">
                <div className="col-md-6">
                  <HdmiAutoSelectToggle />
                </div>
                <div className="col-md-6">
                  <HdmiAudioModeStatus />
                </div>
              </div>
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

/*
<div className="beamer-button col-md-12"><button className="btn btn-lg btn-light btn-block">Projector Power</button></div>
*/

export default connect(
  (state) => ({
    masterVolumeLevel: state.mainAudio.masterVolumeLevel,
    masterVolumeMute:  state.mainAudio.masterVolumeMute
  })
)(MainHallPage);

