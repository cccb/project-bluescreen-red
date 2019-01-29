
/*
 * Tasmota Device Dashboard
 */

import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'
import {connectDevice} from 'components/tasmota/devices'

import Panel from 'components/containers/panel'
import TasmotaToggle from 'components/tasmota/toggle'

class TasmotaDashboardPage extends Component {
  componentDidMount() {
  }

  render() {
    console.log("redner () ");
    return (
      <div className="page page-tasmota-dashboard noselect row">
        <div className="col-md-12">
          <Panel title="Cellar" className="panel-grey">

            <TasmotaToggle deviceId="LED-Keller" />

          </Panel>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({

  })
)(TasmotaDashboardPage);

