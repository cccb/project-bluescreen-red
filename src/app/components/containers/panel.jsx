
import React from 'react'
import {Component} from 'react'


export default class Panel extends Component {
  
  render() {
  
    return (
      <div className="panel">
        <div className="panel-title-container">
          <span className="panel-title">
            {this.props.title}
          </span>
        </div>
        <div className="panel-content">
          {this.props.children}
        </div>
      </div>
    );
  }

}

