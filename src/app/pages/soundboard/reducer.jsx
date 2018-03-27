
import {MQTT_GROUPS_LIST_REQUEST,
        MQTT_GROUPS_LIST_SUCCESS,
        MQTT_GROUPS_LIST_ERROR,

        MQTT_SAMPLES_LIST_REQUEST,
        MQTT_SAMPLES_LIST_SUCCESS,
        MQTT_SAMPLES_LIST_ERROR,

        MQTT_SAMPLE_START_REQUEST,
        MQTT_SAMPLE_START_SUCCESS,
        MQTT_SAMPLE_START_ERROR,

        MQTT_SAMPLE_STOP_REQUEST,
        MQTT_SAMPLE_STOP_SUCCESS,
        MQTT_SAMPLE_STOP_ERROR,

        SELECT_GROUP} from './actions'


const initialState = {
  groups: [],
  samples: {},

  selectedGroup: null,

  isLoading: false,
};



function receiveSamples(state, action) {
  let groups = [];
  let samples = {};

  for(let sample of action.payload.samples) {
    if(!samples[sample.group]) {
      samples[sample.group] = [];
    }

    sample.isPlaying = false;

    samples[sample.group].push(sample);

    if(groups.indexOf(sample.group) == -1) {
      groups.push(sample.group);
    }
  }

  let nextState = Object.assign({}, state, {
    groups: groups,
    samples: samples,
    selectedGroup: groups[0],
  });

  return nextState;
}


function getSampleById(samples, sampleId) {
  for(let group in samples) {
    for(let sample of samples[group]) {
      if(sample.id == sampleId) {
        return sample;
      }
    }
  }

  return null;
}

function startSample(state, action) {
  let nextState = Object.assign({}, state);
  let sample = getSampleById(nextState.samples, action.payload.sample_id);
  if (!sample) {
    return nextState;
  }

  sample.isPlaying = true;

  return nextState;
}

function stopSample(state, action) {
  let nextState = Object.assign({}, state);
  let sample = getSampleById(nextState.samples, action.payload.sample_id);
  if (!sample) {
    return nextState;
  }

  sample.isPlaying = false;

  return nextState;
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case SELECT_GROUP:
      return Object.assign({}, state, {
        selectedGroup: action.payload.group
      });

    case MQTT_SAMPLES_LIST_SUCCESS:
      return receiveSamples(state, action);

    case MQTT_SAMPLE_START_SUCCESS:
      return startSample(state, action);

    case MQTT_SAMPLE_STOP_SUCCESS:
      return stopSample(state, action);
  }

  return state;
}

