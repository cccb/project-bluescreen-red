
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import Panel from 'components/containers/panel'
import VSlider from 'components/inputs/vslider'
import Toggle from 'components/inputs/toggle'
import VolumeControl from 'components/inputs/volume-control'

import {fmtPercent} from 'utils/fmt'

import {mqttDispatch} from 'utils/mqtt'

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


// Ratelimit updates
const debouncedMqttDispatch = debounce(mqttDispatch, 5);



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
                  <AudioSourceSelect />
                </div>

              </div>
            </Panel>

          </div>

          <div className="col-md-4">
            <Panel title="Beamer">
              <div className="beamer-source-select row">
                  <div className="beamer-button col-md-12"><button className="btn btn-lg btn-light btn-block">Beamer An</button></div>
                  <br />
                  <br />
                  <div className="beamer-button col-xs-6 col-md-12"><button className="btn btn-lg btn-light btn-block">HDMI Tisch</button></div>
                  <div className="beamer-button col-xs-6 col-md-12"><button className="btn btn-lg btn-success btn-block">HDMI Vortrag</button></div>
                  <div className="beamer-button col-xs-6 col-md-12"><button className="btn btn-lg btn-light btn-block">FOH</button></div>
                  <div className="beamer-button col-xs-6 col-md-12"><button className="btn btn-lg btn-light btn-block">NUC</button></div>
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


export default connect(
  (state) => ({
    masterVolumeLevel: state.mainAudio.masterVolumeLevel,
    masterVolumeMute:  state.mainAudio.masterVolumeMute
  })
)(MainHallPage);

