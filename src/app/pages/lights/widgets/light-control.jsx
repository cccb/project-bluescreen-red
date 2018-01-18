
import React from 'react'
import {Component} from 'react'

// Helpers
import {fmtPercent} from 'utils/fmt'

// Components
import VSlider from 'components/inputs/vslider'

export default class LightControl extends Component {

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



