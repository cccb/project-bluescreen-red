
import React from 'react'
import {Component} from 'react'

import Panel from 'components/containers/panel'

/*
 * Fine granular lights controll page
 */

export default class LightsPage extends Component {

  render() {
    return (
      <div className="page page-lights">
        
        <div className="grid">
          <Panel title="Eingang">
            Panel 1
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

