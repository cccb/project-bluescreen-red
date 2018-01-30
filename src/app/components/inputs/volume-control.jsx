
import React from 'react'
import {Component} from 'react'

import VSlider from './vslider'

import {fmtPercent} from 'utils/fmt'


export default class VolumeControl extends Component {
  render() {
    return (
      <div className="volume-ctrl box-centered-content">
        <div className="volume-title">
          {this.props.title}
        </div>
        <div className="volume-input">
          <VSlider value={this.props.level} max={100} min={0}
                   onchange={this.props.onchange} />
        </div>
        <div className="volume-value">
          {fmtPercent(this.props.level)}
        </div>
      </div>
    );
  }
}

