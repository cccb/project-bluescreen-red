
import {connect} from 'react-redux'

// Default States

export function connectDevice(component) {

  const mapStateToProps = (state, ownProps) => {
    const deviceId = ownProps.deviceId;
    const props = {
      device: state.tasmota.devices[deviceId]||{}
    };
    return props;
  };

  return connect(mapStateToProps)(component);
}

