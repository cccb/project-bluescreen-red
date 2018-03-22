
export const MQTT_GROUPS_LIST_REQUEST =
            "@@mqtt/v1/mainhall/klang3/GROUPS_LIST_REQUEST";
export const MQTT_GROUPS_LIST_SUCCESS =
            "@@mqtt/v1/mainhall/klang3/GROUPS_LIST_SUCCESS";

export const MQTT_SAMPLES_LIST_REQUEST =
            "@@mqtt/v1/mainhall/klang3/SAMPLES_LIST_REQUEST";
export const MQTT_SAMPLES_LIST_SUCCESS =
            "@@mqtt/v1/mainhall/klang3/SAMPLES_LIST_SUCCESS";

export const MQTT_SAMPLE_START_REQUEST =
            "@@mqtt/v1/mainhall/klang3/SAMPLE_START_REQUEST";
export const MQTT_SAMPLE_START_SUCCESS =
            "@@mqtt/v1/mainhall/klang3/SAMPLE_START_SUCCESS";
export const MQTT_SAMPLE_START_ERROR =
            "@@mqtt/v1/mainhall/klang3/SAMPLE_START_ERROR";

export const MQTT_SAMPLE_STOP_REQUEST =
            "@@mqtt/v1/mainhall/klang3/SAMPLE_STOP_REQUEST";
export const MQTT_SAMPLE_STOP_SUCCESS =
            "@@mqtt/v1/mainhall/klang3/SAMPLE_STOP_SUCCESS";
export const MQTT_SAMPLE_STOP_ERROR =
            "@@mqtt/v1/mainhall/klang3/SAMPLE_STOP_ERROR";


function mqttGroupsListRequest() {
  return {
    type: MQTT_GROUPS_LIST_REQUEST,
    payload: {
    }
  }
}

function mqttSampleListRequest(group) {
  return {
    type: MQTT_SAMPLES_LIST_REQUEST,
    payload: {
      group: group
    }
  }
}

function mqttSampleStartRequest(sampleId) {
  return {
    type: MQTT_SAMPLE_START_REQUEST,
    payload: {
      sample_id: sampleId
    }
  }
}

function mqttSampleStopRequest(sampleId) {
  return {
    type: MQTT_SAMPLE_STOP_REQUEST,
    payload: {
      sample_id: sampleId,
    }
  }
}

