
import React         from 'react'
import { Component } from 'react'
import { connect }   from 'react-redux'


export default class TitleBar extends Component {
  render() {
    return (
      <div className="nav-titlebar">
        <div className="nav-title">
          CCCB // Bluescreen Red
        </div>
        <div className="nav-version">
          0.39.1
        </div>
      </div>
    );
  }
}

