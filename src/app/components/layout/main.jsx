
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
        <div className="app-main row">
          <div className="app-left col-md-4">
            <Sidebar />
          </div>
          <div className="app-content col-md-8">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

