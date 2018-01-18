
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import Panel from 'components/containers/panel'
import VSlider from 'components/inputs/vslider'

import {setValue,
        mqttGetLightValuesRequest} from './actions'

import {fmtPercent} from 'utils/fmt'

import {mqttDispatch} from 'utils/mqtt'

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


  onSliderChange(handle, value) {
    this.props.dispatch(setValue(handle, value));
  }

  render() {
    return (
      <div className="page page-lights noselect">
          <Panel title="Lights Control">
            <div className="grid">
              <LightControl title="Entry"
                            level={this.props.entryLevel}
                            onchange={(v) => this.onSliderChange("entry", v)} />
              <LightControl title="FOH"
                            level={this.props.fohLevel}
                            onchange={(v) => this.onSliderChange("foh", v)} />
              <LightControl title="Desk / Wall" 
                            level={this.props.deskWallLevel}
                            onchange={(v) => this.onSliderChange("deskWall", v)} />
              <LightControl title="Desk / Bar"
                            level={this.props.deskBarLevel}
                            onchange={(v) => this.onSliderChange("deskBar", v)} />
            </div>
          </Panel>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    entryLevel: state.lights.values.entry,
    fohLevel: state.lights.values.foh,
    deskWallLevel: state.lights.values.deskWall,
    deskBarLevel: state.lights.values.deskBar
  }),
)(LightsPage);

