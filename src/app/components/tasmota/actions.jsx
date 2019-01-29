
export const TASMOTA_TELEMETRY_UPDATE = "@tasmota/TELEMETRY_UPDATE";
export const TASMOTA_STATUS_UPDATE = "@tasmota/STATUS_UPDATE";
export const TASMOTA_COMMAND_REQUEST = "@tasmota/COMMAND_REQUEST";
export const TASMOTA_STATUS_REQUEST = "@@tasmota/STATUS_REQUEST";
export const TASMOTA_STATUS_UPDATE_REQUEST = "@@tasmota/STATUS_UPDATE_REQUEST";

export function tasmotaStatusRequest(deviceId, endpoint) {
  return {
    type: TASMOTA_STATUS_REQUEST,
    payload: {
      deviceId: deviceId,
      endpoint: endpoint
    }
  }
}

export function tasmotaStatusUpdateRequest(deviceId, endpoint, value) {
  return {
    type: TASMOTA_STATUS_UPDATE_REQUEST,
    payload: {
      deviceId: deviceId,
      endpoint: endpoint,
      value: value
    }
  };
}


