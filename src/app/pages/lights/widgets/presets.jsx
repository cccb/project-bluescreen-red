
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import {mqttDispatch} from 'utils/mqtt'

import {setValue,
        mqttGetLightValuesRequest,
        mqttSetLightValueRequest} from 'pages/lights/actions'

import Panel from 'components/containers/panel'

class LightPresets extends Component {

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
    mqttDispatch(mqttSetLightValueRequest(ID_ENTRY, 75.3));
    mqttDispatch(mqttSetLightValueRequest(ID_FOH,   94.1));
    mqttDispatch(mqttSetLightValueRequest(ID_DESK_WALL, 75.3));
    mqttDispatch(mqttSetLightValueRequest(ID_DESK_BAR, 94.1));
  }

  setPresetDark() {
    mqttDispatch(mqttSetLightValueRequest(ID_ENTRY, 25.0));
    mqttDispatch(mqttSetLightValueRequest(ID_FOH,   75.0));
    mqttDispatch(mqttSetLightValueRequest(ID_DESK_WALL, 25.0));
    mqttDispatch(mqttSetLightValueRequest(ID_DESK_BAR, 75.0));
  }

  setPresetBright() {
    this.setMasterValue(100);
  }

  setPresetOff() {
    this.setMasterValue(0);
  }

  render() {
    let panelTitle = this.props.title;
    if (!panelTitle) {
      panelTitle = "Presets";
    }

    return (
      <Panel title="Presets" className="panel-grey">
        <div className="controls-row">
          <div className="controls-ctrl">
            <button onClick={(e) => this.setPresetDefault()}
                    className="btn btn-success btn-block btn-lg">Das Übliche(TM)</button>
          </div>
          <div className="controls-ctrl">
            <button onClick={(e) => this.setPresetDark()}
                    className="btn btn-primary btn-block btn-lg">Dunkel</button>
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
    );
  }
}


export default connect(
  (state) => ({})
)(LightPresets);

