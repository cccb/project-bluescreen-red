
import {connect} from 'react-redux'

export function connectDevice(deviceId, component) {
  const mapStateToProps = (state) => {
    const props = state.tasmota.devices[deviceId]||{};
    return props;
  };

  return connect(mapStateToProps, component);
}


