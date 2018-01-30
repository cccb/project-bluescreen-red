

import {remap} from 'utils/math'

import {SET_MASTER_VOLUME,

        MQTT_SET_LEVEL_SUCCESS,
        MQTT_SET_SOURCE_SUCCESS,
        MQTT_SET_TOGGLE_SUCCESS,

        // Bulk updates
        MQTT_GET_SOURCES_SUCCESS,
        MQTT_GET_LEVELS_SUCCESS,
        MQTT_GET_TOGGLES_SUCCESS} from './actions'


import {MAIN_SOURCE,

        MAIN_MASTER_LEVEL,
        MAIN_DELAY_LEVEL,
        MAIN_BASS_LEVEL,
        MAIN_BAR_LEVEL,

        MAIN_MUTE_MASTER_TOGGLE,
        MAIN_MUTE_DELAY_TOGGLE,
        MAIN_MUTE_BAR_TOGGLE,

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


// Value conversion:
//  Levels are represented within 0..255
//  We want somehing like 0..100 for presentation.
const remap100 = remap.bind(remap, 0, 255, 0, 100);
const remap8 = remap.bind(remap, 0, 100, 0, 255);


/*
 * Update state after successful set level 
 */
function _handleSetLevel(state, levelId, value) {
  let next = Object.assign({}, state);

  switch(levelId) {
    case MAIN_MASTER_LEVEL:
      next.masterVolumeLevel = remap100(value); break;
    case MAIN_DELAY_LEVEL:
      next.delayLevel = remap100(value); break;
    case MAIN_BASS_LEVEL:
      next.bassLevel = remap100(value); break;
    case MAIN_BAR_LEVEL:
      next.barLevel = remap100(value); break;
  }

  return next;
}

/*
 * Update state after successful set toggle
 */
function _handleSetToggle(state, toggleId, toggleState) {
  let next = Object.assign({}, state);

  switch(toggleId) {
    case MAIN_MUTE_MASTER_TOGGLE:
      next.masterVolumeMute = toggleState; break;
    case MAIN_MUTE_BAR_TOGGLE:
      next.barMute = toggleState; break;
    case MAIN_MUTE_DELAY_TOGGLE:
      next.delayMute = toggleState; break;
  }

  return next;
}

/*
 * Hanlde successful source update
 */
function _handleSetSource(state, source, value) {
  if (source != MAIN_SOURCE) {
    return state;
  }

  let next = Object.assign({}, state);
  next.sourceId = value;

  return next;
}

/*
 * Update state with bulk levels update response
 */
function _handleGetLevels(state, levels) {
  let next = Object.assign({}, state);
  for (let level of levels) {
    switch(level.id) {
      case MAIN_MASTER_LEVEL:
        next.masterVolumeLevel = remap100(level.value); break;
      case MAIN_DELAY_LEVEL:
        next.delayLevel = remap100(level.value); break;
      case MAIN_BASS_LEVEL:
        next.bassLevel = remap100(level.value); break;
      case MAIN_BAR_LEVEL:
        next.barLevel = remap100(level.value); break;
    }
  }

  return next;
}

/*
 * Update state with retrieved bulk toggles response
 */ 
function _handleGetToggles(state, toggles) {
  let next = Object.assign({}, state);
  for (let toggle of toggles) {
    switch(toggle.id) {
      case MAIN_MUTE_MASTER_TOGGLE:
        next.masterVolumeMute = toggle.state;
      case MAIN_MUTE_BAR_TOGGLE:
        next.barMute = toggle.state;
      case MAIN_MUTE_DELAY_TOGGLE:
        next.delayMute = toggle.state;
    }
  }

  return next;
}


/*
 * Handle bulk sources response
 */
function _handleGetSources(state, result) {
  let next = Object.assign({}, state);

  for (let source of result) {
    if (source.id == MAIN_SOURCE) {
      next.sourceId = source.value; 
    }
  }

  return next;
}


export default function reducer(state=initialState, action) {
  switch(action.type) {
    case MQTT_SET_LEVEL_SUCCESS:
      return _handleSetLevel(state,
                             action.payload.id,
                             action.payload.value);
    case MQTT_SET_TOGGLE_SUCCESS:
      return _handleSetToggle(state,
                              action.payload.id,
                              action.payload.state);
    case MQTT_SET_SOURCE_SUCCESS:
      return _handleSetSource(state,
                              action.payload.id,
                              action.payload.value);
    case MQTT_GET_LEVELS_SUCCESS:
      return _handleGetLevels(state, action.payload);
    case MQTT_GET_TOGGLES_SUCCESS:
      return _handleGetToggles(state, action.payload);
    case MQTT_GET_SOURCES_SUCCESS:
      return _handleGetSources(state, action.payload);
  }

  return state;
}


