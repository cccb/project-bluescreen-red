
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
        <div className="sidebar-tabs row">
          <div className="col-xs-6 col-md-12">
            <NavLink to="/main" className="btn btn-lg btn-info">
              <div className="btn-inner">Main Hall</div>
            </NavLink>
          </div>
          
          <div className="col-xs-6 col-md-12">
            <NavLink to="/lights" className="btn btn-lg btn-info">
              <div className="btn-inner">Lights</div>
            </NavLink>
          </div>

          <div className="col-xs-6 col-md-12">
            <NavLink to="/audio" className="btn btn-lg btn-info">
              <div className="btn-inner">Audio</div>
            </NavLink>
          </div>

          <div className="col-xs-6 col-md-12">
            <NavLink to="/klang3" className="btn btn-lg btn-info">
              <div className="btn-inner">Klang3</div>
            </NavLink>
          </div>

          <div className="col-xs-6 col-md-12">
            <NavLink to="/treppe" className="btn btn-lg btn-info">
              <div className="btn-inner">Stairs</div>
            </NavLink>
          </div>

        </div>

      </div>
    );
  }
}

export default Sidebar;

