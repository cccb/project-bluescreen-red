
import React from 'react'
import {Component} from 'react'

import {connect} from 'react-redux'



import Panel from 'components/containers/panel'

import Scroller from 'components/spinners/scroller'

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
      let btnClass = "btn btn-lg btn-info btn-sampler-sample";
      let isPlaying = this.props.samplesPlaying.has(sample.id);

      return(
        <button className={btnClass} key={sample.id}
                onClick={() => this.props.onClick(sample)}>
          {isPlaying && <Scroller />}
          {sample.title}
          {isPlaying && <Scroller className="scroller-right" rtl={true} />}

        </button>
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

  toggleSample(sample) {
    // Only start sample. Sounds better.
    mqttDispatch(mqttSampleStartRequest(sample.id));
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
            <Samples samples={this.props.samples}
                     samplesPlaying={this.props.samplesPlaying}
                     onClick={(sample) => this.toggleSample(sample)} />
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
    samples: state.soundboard.samples[state.soundboard.selectedGroup],
    samplesPlaying: state.soundboard.samplesPlaying,
  })
)(SoundboardPage);


