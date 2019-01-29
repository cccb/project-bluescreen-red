
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'
import {connectDevice} from './devices'

import Panel from 'components/containers/panel'

import {tasmotaStatusUpdateRequest,
        tasmotaStatusRequest} from './actions'

// TODO: Rewrite this as a middleware
import {mqttDispatch} from 'utils/mqtt'

const PowerIndicator = (props) => {
  if (props.state == "ON") {
    return (
      <span>[*]</span>
    );
  }

  return null;
}

const powerIndicatorClass = (state) => {
  if (state == "ON") {
    return "btn-success";
  }

  return "btn-primary";
}


class TasmotaToggle extends Component {

  componentDidMount() {
    // Dispatch state query
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
    let btnClass = `btn btn-lg ${powerIndicatorClass(state.power)}`;
    return (
        <button className={btnClass}
                onClick={() => this.togglePower()}>
           <PowerIndicator state={state.power} />
           {this.props.device.id}
           <PowerIndicator state={state.power} />
        </button>
    );
  }

}

export default connect(

)(connectDevice(TasmotaToggle));


