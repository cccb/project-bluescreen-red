
/*
 * Main Navigation
 * ---------------
 */

import React from 'react'
import {Component} from 'react'

import {Link} from 'react-router-dom'

import {connect} from 'react-redux'


class Sidebar extends Component {
  render() {

    return (
      <div className="nav-sidebar">
        
        {/* Tabs */}
        <div className="sidebar-tabs">
          <Link to="/main" className="btn btn-lg btn-info">
            <div className="btn-inner">Main Hall</div>
          </Link>

          <Link to="/lights" className="btn btn-lg btn-info">
            <div className="btn-inner">Lights</div>
          </Link>

          <Link to="/audio" className="btn btn-lg btn-info">
            <div className="btn-inner">Audio</div>
          </Link>
        </div>

      </div>
    );
  }
}

export default Sidebar;

