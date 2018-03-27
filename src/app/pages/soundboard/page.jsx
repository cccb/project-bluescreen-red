
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'



import Panel from 'components/containers/panel'


import {mqttDispatch} from 'utils/mqtt'

import {mqttSamplesListRequest,
        mqttSampleStartRequest,
        mqttSampleStopRequest,

        selectGroup} from './actions'


class SampleGroups extends Component {
  render() {
    if (!this.props.groups) {
      return(
        <div>Loading...</div>
      );
    }

    let groups = this.props.groups.map((group) => {
      let btnClass = "btn btn-lg btn-sampler-group-select";
      if (group == this.props.selected) {
        btnClass += " btn-warning";
      } else {
        btnClass += " btn-primary";
      }

      return(
        <button key={group}
                className={btnClass}
                onClick={() => this.props.onSelect(group)}>
          {group}
        </button>
      );
    });

    return(
      <div className="sample-group-select">
        {groups}
      </div>
    );
  }
}


class Samples extends Component {
  render() {
    if (!this.props.samples) {
      return (
        <div>Loading...</div>
      );
    }

    let samples = this.props.samples.map((sample) => {
      return(

      );
    });

    return (
      <div className="sampler-samples">
        {samples}
      </div>
    );
  }
}


class SoundboardPage extends Component {

  componentDidMount() {
    mqttDispatch(mqttSamplesListRequest("*"));
  }

  selectGroup(group) {
    this.props.dispatch(selectGroup(group));
  }

  render() {
    return (
      <div className="page page-soundboard noselect row">
        <div className="col-md-12">
          <Panel title="Sets">
            <SampleGroups groups={this.props.groups}
                          selected={this.props.selectedGroup}
                          onSelect={(group) => this.selectGroup(group)} />
          </Panel>
        </div>

        <div className="col-md-12">
          <Panel className="panel-grey" title="Samples">
            Fnord.
          </Panel>
        </div>
      </div>
    );
  }

}


export default connect(
  (state) => ({
    groups: state.soundboard.groups,
    selectedGroup: state.soundboard.selectedGroup,
    samples: state.soundboard.samples[state.soundboard.selectedGroup]
  })
)(SoundboardPage);


