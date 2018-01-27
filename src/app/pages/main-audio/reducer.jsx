
import {SET_MASTER_VOLUME,
        MQTT_SET_LEVEL_SUCCESS} from './actions'

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
  if(levelId == 1) { // MasterVolume
    // Remap
    let masterVolumeLevel = (value / 255.0) * 100;
    return Object.assign({}, state, {
      masterVolumeLevel: masterVolumeLevel
    });
  }

  return state;
}


export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SET_MASTER_VOLUME:
      return Object.assign({}, state, {
        masterVolumeLevel: action.payload.value
      });
    case MQTT_SET_LEVEL_SUCCESS:
      return _handleSetLevel(state,
                             action.payload.level_id,
                             action.payload.value);
  }

  return state;
}

