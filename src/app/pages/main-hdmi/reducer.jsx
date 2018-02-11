
/*
 * Main Hall HDMI matrix reducer
 */

import {MQTT_GET_CHANNEL_INPUTS_SUCCESS,
        
        MQTT_SET_CHANNEL_A_INPUT_START,
        MQTT_SET_CHANNEL_A_INPUT_CANCEL,
        MQTT_SET_CHANNEL_A_INPUT_SUCCESS,
        MQTT_SET_CHANNEL_A_INPUT_ERROR,

        MQTT_SET_CHANNEL_B_INPUT_START,
        MQTT_SET_CHANNEL_B_INPUT_CANCEL,
        MQTT_SET_CHANNEL_B_INPUT_SUCCESS,
        MQTT_SET_CHANNEL_B_INPUT_ERROR} from './actions';


const initialState = {
  selectedA: -1,
  selectedB: -1,
 
  inProgressA: -1,
  inProgressB: -1,
};


export default function reducer(state=initialState, action) {
  switch (action.type) {
    case MQTT_GET_CHANNEL_INPUTS_SUCCESS:
      return Object.assign({}, state, {
        selectedA: action.payload.a,
        selectedB: action.payload.b
      });

    case MQTT_SET_CHANNEL_A_INPUT_START:
      return Object.assign({}, state, {
        inProgressA: action.payload.id
      });

    case MQTT_SET_CHANNEL_A_INPUT_CANCEL:
      return Object.assign({}, state, {
        inProgressA: -1
      });

    case MQTT_SET_CHANNEL_A_INPUT_ERROR:
      // TODO: Improve error handling
      return Object.assign({}, state, {
        inProgressA: -1,
      });

    case MQTT_SET_CHANNEL_A_INPUT_SUCCESS:
      return Object.assign({}, state, {
        inProgressA: -1,
        selectedA: action.payload.id
      });


    case MQTT_SET_CHANNEL_B_INPUT_START:
      return Object.assign({}, state, {
        inProgressB: action.payload.id
      });

    case MQTT_SET_CHANNEL_B_INPUT_CANCEL:
      return Object.assign({}, state, {
        inProgressB: -1
      });

    case MQTT_SET_CHANNEL_B_INPUT_ERROR:
      // TODO: Improve error handling
      return Object.assign({}, state, {
        inProgressB: -1,
      });

    case MQTT_SET_CHANNEL_B_INPUT_SUCCESS:
      return Object.assign({}, state, {
        inProgressB: -1,
        selectedB: action.payload.id
      });
  }


  return state;
}

