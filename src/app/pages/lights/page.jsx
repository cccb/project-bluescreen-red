
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

// Local components
import LightControl from './widgets/light-control'


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

  setMasterValue(value) {
    for (let i = 0; i < this.props.lightLevels.length; i++ ){
        // Dispatch local update
        this.props.dispatch(setValue(i, value));

        // Dispatch ratelimited over MQTT
        mqttDispatch(mqttSetLightValueRequest(i, value));
    }
  }


  // Light Presets
  setPresetDefault() {
    this.setMasterValue(86.2);
  }

  setPresetDark() {
    this.setMasterValue(20.0);
  }

  setPresetBright() {
    this.setMasterValue(100);
  }

  setPresetOff() {
    this.setMasterValue(0);
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

          <Panel title="Presets" className="panel-grey">
            <div className="controls-row">
              <div className="controls-ctrl">
                <button onClick={(e) => this.setPresetDefault()}
                        className="btn btn-primary btn-block btn-lg">Das Übliche(TM)</button>
              </div>
              <div className="controls-ctrl">
                <button onClick={(e) => this.setPresetDark()}
                        className="btn btn-info btn-block btn-lg">Dunkel</button>
              </div>
              <div className="controls-ctrl">
                <button onClick={(e) => this.setPresetBright()}
                        className="btn btn-light btn-block btn-lg">Putzlicht</button>
              </div>
              <div className="controls-ctrl">
                <button onClick={(e) => this.setPresetOff()}
                        className="btn btn-danger btn-block btn-lg">Aus</button>
              </div>
            </div>
          </Panel>
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

