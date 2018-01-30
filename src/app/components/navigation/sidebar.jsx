
/*
 * Main Navigation
 * ---------------
 */

import React from 'react'
import {Component} from 'react'

import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux'


class Sidebar extends Component {
  render() {

    return (
      <div className="nav-sidebar">
        {/* Tabs */}
        <div className="sidebar-tabs">
          <NavLink to="/main" className="btn btn-lg btn-info">
            <div className="btn-inner">Main Hall</div>
          </NavLink>

          <NavLink to="/lights" className="btn btn-lg btn-info">
            <div className="btn-inner">Lights</div>
          </NavLink>

          <NavLink to="/audio" className="btn btn-lg btn-info">
            <div className="btn-inner">Audio</div>
          </NavLink>

          <NavLink to="/treppe" className="btn btn-lg btn-info">
            <div className="btn-inner">Treppe</div>
          </NavLink>
        </div>

      </div>
    );
  }
}

export default Sidebar;

