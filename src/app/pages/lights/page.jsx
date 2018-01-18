
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

// Ratelimit updates
const debouncedMqttDispatch = debounce(mqttDispatch, 30);

// Lights mapping:
const ID_ENTRY = 2;
const ID_FOH = 3;
const ID_DESK_WALL = 0;
const ID_DESK_BAR = 1;



/*
 * Fine granular lights controll page
 */
class LightControl extends Component {

  render() {
    return (
      <div className="light-ctrl">
        <div className="light-title">
          {this.props.title}
        </div>
        <div className="light-input">
          <VSlider value={this.props.level} max={100} min={0}
                   onchange={this.props.onchange}/>
        </div>
        <div className="light-value">
          {fmtPercent(this.props.level)}
        </div>
      </div>
    );
  }
}



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
      <div className="page page-lights noselect">
          <Panel title="Lights Control">
            <div className="grid">
              <LightControl title="Entry"
                            level={this.props.entryLevel}
                            onchange={(v) => this.onSliderChange(ID_ENTRY, v)} />
              <LightControl title="FOH"
                            level={this.props.fohLevel}
                            onchange={(v) => this.onSliderChange(ID_FOH, v)} />
              <LightControl title="Desk / Wall"
                            level={this.props.deskWallLevel}
                            onchange={(v) => this.onSliderChange(ID_DESK_WALL, v)} />
              <LightControl title="Desk / Bar"
                            level={this.props.deskBarLevel}
                            onchange={(v) => this.onSliderChange(ID_DESK_BAR, v)} />
            </div>
          </Panel>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    entryLevel: state.lights.values[ID_ENTRY],
    fohLevel: state.lights.values[ID_FOH],
    deskWallLevel: state.lights.values[ID_DESK_WALL],
    deskBarLevel: state.lights.values[ID_DESK_BAR]
  }),
)(LightsPage);

