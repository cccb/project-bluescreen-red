
import React from 'react'
import {Component} from 'react'

import Panel from 'components/containers/panel'
import VSlider from 'components/inputs/vslider'

/*
 * Fine granular lights controll page
 */

export default class LightsPage extends Component {

  render() {
    return (
      <div className="page page-lights">
        <div className="grid">
          <Panel title="Eingang">
            <VSlider value={34} max={100} min={0} />
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

