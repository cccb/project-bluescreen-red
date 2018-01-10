
import React         from 'react'
import { Component } from 'react'


export default class Footer extends Component {
  render() {
    return (
      <div className="nav-footer">
        <div className="nav-copyright">
          (c) 1989 Gesellschaft f&uuml;r geschlossene
          Software Entwicklung e.V.
        </div>
        <div className="nav-license">
          Unregistered Copy
        </div>
      </div>
    );
  }
}

