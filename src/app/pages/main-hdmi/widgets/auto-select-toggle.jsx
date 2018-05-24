
import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'

import {mqttDispatch} from 'utils/mqtt'

import {mqttGetAutoSelectRequest,
        mqttSetAutoSelectRequest} from '../actions'


class AutoSelectToggle extends Component {
  componentDidMount() {
    mqttDispatch(mqttGetAutoSelectRequest());
  }

  toggleAutoSelect() {
    if(this.props.enabled) {
      mqttDispatch(mqttSetAutoSelectRequest(false));
    } else {
      mqttDispatch(mqttSetAutoSelectRequest(true));
    }
  }

  render() {
    console.log(this.props);
     let state = "DISABLED";
     let cls = "btn";

     if (this.props.enabled) {
       state = "ENABLED";
       cls += " btn-success";
     } else {
       cls += " btn-info";
     }

     return (
       <div className="hdmi-auto-select-toggle">
         <button className={cls}
                 onClick={() => this.toggleAutoSelect()}>
                 AutoSelect <br /> {state}</button>
       </div>
     );
  }
}

export default connect(
  (state) => ({
    enabled: state.mainHdmi.autoSelect
  })
)(AutoSelectToggle);

