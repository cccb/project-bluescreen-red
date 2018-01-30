
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

class MainAudioPage extends Component {


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
                                 onchange={(value) => this.onMasterVolumeChanged(value)} />

                  <div className="box-ctrl">
                    <Toggle onToggle={(s) => this.onMasterVolumeMuteToggle(s)}
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
                                 onchange={(value) => this.onMasterVolumeChanged(value)} />

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

