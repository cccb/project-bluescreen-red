
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import Panel from 'components/containers/panel'
import VSlider from 'components/inputs/vslider'

import {setValue} from './actions'


/*
 * Fine granular lights controll page
 */

class LightsPage extends Component {

  onSliderChange(handle, value) {
    this.props.dispatch(setValue(handle, value));
  }

  render() {
    return (
      <div className="page page-lights noselect">
        <div className="grid">
          <Panel title="Eingang">
            <VSlider value={this.props.entryLevel} max={100} min={0}
                     onchange={(v) => this.onSliderChange("entry", v)}/>
          </Panel>
          <Panel title="FOH">
            <VSlider value={this.props.fohLevel} max={100} min={0}
                     onchange={(v) => this.onSliderChange("foh", v)}/>
          </Panel>
          <Panel title="Tisch / Wand">
            <VSlider value={this.props.deskWallLevel} max={100} min={0}
                     onchange={(v) => this.onSliderChange("deskWall", v)}/>
          </Panel>
          <Panel title="Tisch / Bar">
            <VSlider value={this.props.deskBarLevel} max={100} min={0}
                     onchange={(v) => this.onSliderChange("deskBar", v)}/>
          </Panel>
        </div>

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

