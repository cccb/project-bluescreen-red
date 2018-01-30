
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import {mqttDispatch} from 'utils/mqtt'


// Components
import Panel from 'components/containers/panel'
import VSlider from 'components/inputs/vslider'
import Toggle from 'components/inputs/toggle'



class MainAudioPage extends Component {


  render() {
    return (
      <div className="page page-mainaudio">
        <div className="content">
        </div>
      </div>
    );
  }

}


export default connect(
  (state) => ({

  })
)(MainAudioPage);

