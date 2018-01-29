
import React from 'react'
import {Component} from 'react'

export default class Toggle extends Component {

  onClick() {
    // Next state
    if(this.props.active) {
      this.props.onToggle(false);
    }
    else {
      this.props.onToggle(true);
    }
  }

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
              onClick={() => this.onClick()}>{this.props.children}
      </button>
    );
  }

}


