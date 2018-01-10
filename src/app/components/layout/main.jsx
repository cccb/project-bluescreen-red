
import React         from 'react'
import { Component } from 'react'

import TitleBar from '../navigation/titlebar.jsx'
import Footer   from '../navigation/footer.jsx'


export default class MainLayout extends Component {
  render() {
    return (
      <div className="app">
        <TitleBar />
        <div className="app-main">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

