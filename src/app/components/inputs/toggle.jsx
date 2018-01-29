
import React from 'react'
import {Component} from 'react'

export default class Toggle extends Component {
  render() {
    let btnClass = "btn btn-lg";
    if (this.props.className) {
      btnClass += " " + this.props.className;
    }

    let activeClass = "btn-warning";
    if (this.props.activeClass) {
      activeClass = this.props.activeClass;
    }

    if (this.props.active) {
      btnClass += " " + activeClass;
    }

    return (
      <button className={btnClass}
              onClick={this.props.onClick}>{this.props.children}
      </button>
    );
  }

}


