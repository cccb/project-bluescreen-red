
export const MQTT_GET_CHANNEL_INPUTS_REQUEST =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_CHANNEL_INPUTS_REQUEST";
export const MQTT_GET_CHANNEL_INPUTS_SUCCESS =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_CHANNEL_INPUTS_SUCCESS";

export const MQTT_SET_CHANNEL_A_INPUT_REQUEST =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_CHANNEL_A_INPUT_REQUEST";
export const MQTT_SET_CHANNEL_A_INPUT_CANCEL =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_CHANNEL_A_INPUT_CANCEL";
export const MQTT_SET_CHANNEL_A_INPUT_START =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_CHANNEL_A_INPUT_START";
export const MQTT_SET_CHANNEL_A_INPUT_SUCCESS =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_CHANNEL_A_INPUT_SUCCESS";
export const MQTT_SET_CHANNEL_A_INPUT_ERROR =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_CHANNEL_A_INPUT_ERROR";

export const MQTT_SET_CHANNEL_B_INPUT_REQUEST =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_CHANNEL_B_INPUT_REQUEST";
export const MQTT_SET_CHANNEL_B_INPUT_CANCEL =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_CHANNEL_B_INPUT_CANCEL";
export const MQTT_SET_CHANNEL_B_INPUT_START =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_CHANNEL_B_INPUT_START";
export const MQTT_SET_CHANNEL_B_INPUT_SUCCESS =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_CHANNEL_B_INPUT_SUCCESS";
export const MQTT_SET_CHANNEL_B_INPUT_ERROR =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_CHANNEL_B_INPUT_ERROR";


export function mqttGetChannelInputsRequest() {
  return {
    type: MQTT_GET_CHANNEL_INPUTS_REQUEST,
    payload: {
    }
  };
}

export function mqttSetChannelAInputRequest(channelId) {
  return {
    type: MQTT_SET_CHANNEL_A_INPUT_REQUEST,
    payload: {
      "id": channelId
    }
  };
}


export function mqttSetChannelBInputRequest(channelId) {
  return {
    type: MQTT_SET_CHANNEL_B_INPUT_REQUEST,
    payload: {
      "id": channelId
    }
  };
}

