
import React         from 'react'
import { Component } from 'react'

import TitleBar from '../navigation/titlebar'
import Footer   from '../navigation/footer'
import Sidebar  from '../navigation/sidebar'


export default class MainLayout extends Component {
  render() {
    return (
      <div className="app">
        <TitleBar />
        <div className="app-main">
          <div className="app-left">
            <Sidebar />
          </div>
          <div className="app-content">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

