
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
    console.log("Slider:", handle,
                "Value:", value);
    this.props.dispatch(setValue(handle, value));
  }

  render() {
    return (
      <div className="page page-lights">
        <div className="grid">
          <Panel title="Eingang">
            <VSlider value={this.props.entryLevel} max={100} min={0}
                     onchange={(v) => this.onSliderChange("entry", v)}/>
          </Panel>
          <Panel title="FOH">
            Panel 2
          </Panel>
          <Panel title="Tisch / Wand">
            Panel 3
          </Panel>
          <Panel title="Tisch / Bar">
            Panel 4
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

