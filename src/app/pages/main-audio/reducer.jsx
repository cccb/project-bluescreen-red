
import {SET_MASTER_VOLUME,

        MQTT_SET_LEVEL_SUCCESS,
        MQTT_SET_SOURCE_SUCCESS,

        MQTT_GET_SOURCES_SUCCESS,
        MQTT_GET_LEVELS_SUCCESS,
        MQTT_GET_TOGGLES_SUCCES} from './actions'


import {MAIN_SOURCE,
      
        MAIN_MASTER_LEVEL,

        MAIN_SOURCE_DESK,
        MAIN_SOURCE_HDMI,
        MAIN_SOURCE_SONIC,
        MAIN_SOURCE_FOH} from 'config/mappings/audio'


const initialState = {
  masterVolumeLevel: 0,
  masterVolumeMute: false,

  barLevel: 0,
  barMute: false,

  delayLevel: 0,
  delayMute: false,

  bassLevel: 0,

  sourceId: 0, // None
};


function _handleSetLevel(state, levelId, value) {
  if(levelId == MAIN_MASTER_LEVEL) { // MasterVolume
    // Remap
    let masterVolumeLevel = (value / 255.0) * 100;
    return Object.assign({}, state, {
      masterVolumeLevel: masterVolumeLevel
    });
  }

  return state;
}


function _handleGetSources(state, result) {
  let next = Object.assign({}, state);

  for (let source of result) {
    if (source.id == MAIN_SOURCE) {
      next.sourceId = source.value; 
    }
  }

  return next;
}

function _handleSetSource(state, source, value) {
  if (source != MAIN_SOURCE) {
    return state;
  }

  let next = Object.assign({}, state);
  next.sourceId = value;

  return next;
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SET_MASTER_VOLUME:
      return Object.assign({}, state, {
        masterVolumeLevel: action.payload.value
      });
    case MQTT_SET_LEVEL_SUCCESS:
      return _handleSetLevel(state,
                             action.payload.id,
                             action.payload.value);
    case MQTT_SET_SOURCE_SUCCESS:
      return _handleSetSource(state,
                              action.payload.id,
                              action.payload.value);
    case MQTT_GET_SOURCES_SUCCESS:
      return _handleGetSources(state,
                               action.payload);
  }

  return state;
}

