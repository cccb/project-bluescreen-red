
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import Panel from 'components/containers/panel'
import VSlider from 'components/inputs/vslider'


import {setValue,
        mqttGetLightValuesRequest,
        mqttSetLightValueRequest} from './actions'

import {fmtPercent} from 'utils/fmt'

import {mqttDispatch} from 'utils/mqtt'

import {debounce} from 'lodash'

import {ID_ENTRY,
        ID_FOH,
        ID_DESK_WALL,
        ID_DESK_BAR} from 'config/mappings/lights'

// Local components
import LightControl from './widgets/light-control'
import LightPresets from './widgets/presets'


// Ratelimit updates
const debouncedMqttDispatch = debounce(mqttDispatch, 10);



/*
 * Fine granular lights controll page
 */
class LightsPage extends Component {
  componentDidMount() {
    mqttDispatch(mqttGetLightValuesRequest());
  }

  onSliderChange(id, value) {
    // Dispatch local update
    this.props.dispatch(setValue(id, value));

    // Dispatch ratelimited over MQTT
    debouncedMqttDispatch(mqttSetLightValueRequest(id, value));
  }


  render() {
    return (
      <div className="page page-lights noselect row">
        <div className="col-md-12">
          <Panel title="Lights Control">
            <div className="grid">
              <LightControl title="Entry"
                            level={this.props.entryLevel}
                            onchange={(v) => this.onSliderChange(ID_ENTRY, v)} />
              <LightControl title="FOH"
                            level={this.props.fohLevel}
                            onchange={(v) => this.onSliderChange(ID_FOH, v)} />
              <LightControl title="Wall"
                            level={this.props.deskWallLevel}
                            onchange={(v) => this.onSliderChange(ID_DESK_WALL, v)} />
              <LightControl title="Bar"
                            level={this.props.deskBarLevel}
                            onchange={(v) => this.onSliderChange(ID_DESK_BAR, v)} />
            </div>
          </Panel>
        </div>

        <div className="col-md-12">
          <LightPresets  />
        </div>

      </div>
    );
  }
}

export default connect(
  (state) => ({
    lightLevels: state.lights.values,
    entryLevel: state.lights.values[ID_ENTRY],
    fohLevel: state.lights.values[ID_FOH],
    deskWallLevel: state.lights.values[ID_DESK_WALL],
    deskBarLevel: state.lights.values[ID_DESK_BAR]
  }),
)(LightsPage);

