
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
        MQTT_SAMPLE_STOP_ERROR} from './actions'


const initialState = {
  groups: [],
  samples: {},

  isLoading: false,
};


