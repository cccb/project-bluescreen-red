import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'
import {mqttDispatch} from 'utils/mqtt'

import Panel from 'components/containers/panel'

import Toggle from 'components/inputs/toggle'

import {powerOn, powerOff, powerState} from './actions'



class StairsPage extends Component {
  componentDidMount() {
    // Trigger state inquiry
    mqttDispatch(powerState());
  }

  togglePower(next) {
    if (next) {
      mqttDispatch(powerOn());
    } else {
      mqttDispatch(powerOff());
    }
  }

  render() {
    let powerToggleLabel = "Power On";
    if (this.props.power) {
      powerToggleLabel = "Power Off";
    }

    return (
      <div className="page page-stairs-dashboard noselect row">
        <div className="col-md-12">
          <Panel title="Stairs" className="panel-grey">
            <Toggle onToggle={(next) => this.togglePower(next)}
                    active={this.props.power}>{powerToggleLabel}</Toggle>
          </Panel>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    power: state.stairs.power,
  })
)(StairsPage);

