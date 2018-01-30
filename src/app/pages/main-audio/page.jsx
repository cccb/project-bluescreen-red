
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
          <div className="col-md-6">
            <Panel title="Volume">
                [Master] [Bar]
            </Panel>
          </div>

          <div className="col-md-6">
            <Panel title="Sound">
                [Delay??] [Bass]
            </Panel>
          </div>

          <div className="col-md-12 audio-source">
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

  })
)(MainAudioPage);

