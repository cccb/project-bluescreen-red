import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import Panel from 'components/containers/panel'

class StairsPage extends Component {
  render() {
    return (
      <div className="page page-stairs-dashboard noselect row">
        <div className="col-md-12">
          <Panel title="Stairs" className="panel-grey">
            Toggle button.

          </Panel>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({

  })
)(StairsPage);

