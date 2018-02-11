
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import {mqttDispatch} from 'utils/mqtt'

import {setValue,
        mqttGetLightValuesRequest,
        mqttSetLightValueRequest} from 'pages/lights/actions'

import {ID_ENTRY,
        ID_FOH,
        ID_DESK_WALL,
        ID_DESK_BAR} from 'config/mappings/lights'

import Panel from 'components/containers/panel'

class LightPresets extends Component {

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
    mqttDispatch(mqttSetLightValueRequest(ID_ENTRY, 100.0));
    mqttDispatch(mqttSetLightValueRequest(ID_FOH,   100.0));
    mqttDispatch(mqttSetLightValueRequest(ID_DESK_WALL, 100.0));
    mqttDispatch(mqttSetLightValueRequest(ID_DESK_BAR, 100.0));
  }

  setPresetOff() {
    mqttDispatch(mqttSetLightValueRequest(ID_ENTRY, 0));
    mqttDispatch(mqttSetLightValueRequest(ID_FOH,   0));
    mqttDispatch(mqttSetLightValueRequest(ID_DESK_WALL, 0));
    mqttDispatch(mqttSetLightValueRequest(ID_DESK_BAR, 0));
  }

  render() {
    let panelTitle = this.props.title;
    if (!panelTitle) {
      panelTitle = "Presets";
    }

    return (
      <Panel title={panelTitle} className="panel-grey">
        <div className="controls-row row">
          <div className="controls-ctrl col-sm-6 col-md-3">
            <button onClick={(e) => this.setPresetDefault()}
                    className="btn btn-success btn-block btn-lg">Das Übliche(TM)</button>
          </div>
          <div className="controls-ctrl col-sm-6 col-md-3">
            <button onClick={(e) => this.setPresetDark()}
                    className="btn btn-primary btn-block btn-lg">Dunkel</button>
          </div>
          <div className="controls-ctrl col-sm-6 col-md-3">
            <button onClick={(e) => this.setPresetBright()}
                    className="btn btn-light btn-block btn-lg">Putzlicht</button>
          </div>
          <div className="controls-ctrl col-sm-6 col-md-3">
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

