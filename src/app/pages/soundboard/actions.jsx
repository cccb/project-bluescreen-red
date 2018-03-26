
export const MQTT_GROUPS_LIST_REQUEST =
             "@@mqtt/v1/mainhall/sampler/GROUPS_LIST_REQUEST";
export const MQTT_GROUPS_LIST_SUCCESS =
             "@@mqtt/v1/mainhall/sampler/GROUPS_LIST_SUCCES";
export const MQTT_GROUPS_LIST_ERROR =
             "@@mqtt/v1/mainhall/sampler/GROUPS_LIST_ERROR";

export const MQTT_SAMPLES_LIST_REQUEST =
             "@@mqtt/v1/mainhall/sampler/SAMPLES_LIST_REQUEST";
export const MQTT_SAMPLES_LIST_SUCCESS =
             "@@mqtt/v1/mainhall/sampler/SAMPLES_LIST_SUCCESS";
export const MQTT_SAMPLES_LIST_ERROR =
             "@@mqtt/v1/mainhall/sampler/SAMPLES_LIST_ERROR";

export const MQTT_SAMPLE_START_REQUEST =
             "@@mqtt/v1/mainhall/sampler/SAMPLE_START_REQUEST";
export const MQTT_SAMPLE_START_SUCCESS =
             "@@mqtt/v1/mainhall/sampler/SAMPLE_START_SUCCESS";
export const MQTT_SAMPLE_START_ERROR =
             "@@mqtt/v1/mainhall/sampler/SAMPLE_START_ERROR";

export const MQTT_SAMPLE_STOP_REQUEST =
             "@@mqtt/v1/mainhall/sampler/SAMPLE_STOP_REQUEST";
export const MQTT_SAMPLE_STOP_SUCCESS =
             "@@mqtt/v1/mainhall/sampler/SAMPLE_STOP_SUCCESS";
export const MQTT_SAMPLE_STOP_ERROR =
             "@@mqtt/v1/mainhall/sampler/SAMPLE_STOP_ERROR";


export function mqttGroupsListRequest() {
  return {
    type: MQTT_GROUPS_LIST_REQUEST,
    payload: {},
  };
}

export function mqttSamplesListRequest(group="*") {
  return {
    type: MQTT_GROUPS_LIST_REQUEST,
    payload: {
      group: group
    },
  };
}

export function mqttSampleStartRequest(sampleId) {
  return {
    type: MQTT_SAMPLE_START_REQUEST,
    payload: {
      sample_id: sampleId
    },
  };
}

export function mqttSampleStopRequest(sampleId) {
  return {
    type: MQTT_SAMPLE_STOP_REQUEST,
    payload: {},
  }
}

