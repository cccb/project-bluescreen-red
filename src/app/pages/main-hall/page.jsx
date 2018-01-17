
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'

import Panel from 'components/containers/panel'
import VSlider from 'components/inputs/vslider'

import {fmtPercent} from 'utils/fmt'

class MasterVolumeControl extends Component {
  render() {
    return (
      <div className="volume-ctrl box-centered-content">
        <div className="volume-title">
          Master Volume
        </div>
        <div className="volume-input">
          <VSlider value={this.props.level} max={100} min={0}
                   onchange={this.props.onchange} />
        </div>
        <div className="volume-value">
          {fmtPercent(this.props.level)}
        </div>
      </div>
    );
  }
}


class MainHallPage extends Component {
  render() {
    return (
      <div className="page page-mainhall">

        <div className="content">
          <div className="col-md-6">

            <Panel title="Audio">
              <div className="row">
                <div className="col-md-4 box-centered">
                  <MasterVolumeControl level={40} />

                  <div className="box-ctrl">
                    <button className="btn btn-lg">Mute</button>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="panel panel-grey panel-input-sources">
                     <button className="btn btn-lg">Tisch</button>
                     <button className="btn btn-lg">HDMI / Beamer</button>
                     <button className="btn btn-lg">Sonic</button>
                     <button className="btn btn-lg">Mischpult</button>
                  </div>
                </div>

              </div>
            </Panel>

          </div>

          <div className="col-md-6">

            <Panel title="Beamer">


            </Panel>

          </div>
        </div>

      </div>
    );
  }
}


export default MainHallPage;

