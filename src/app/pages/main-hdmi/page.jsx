import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'

import {mqttDispatch} from 'utils/mqtt'

// Components
import Panel from 'components/containers/panel'


class MainHdmiPage extends Component {

  render() {
    return null;
  }

}

export default connect(
  (state) => ({

  })
)(MainHdmiPage);

