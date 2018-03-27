
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


export default function reducer(state=initialState, action) {

  switch(action.type) {
    case SELECT_GROUP:
      return Object.assign({}, state, {
        selectedGroup: action.payload.group
      });

    case MQTT_SAMPLES_LIST_SUCCESS:
      return receiveSamples(state, action);
  }

  return state;
}

