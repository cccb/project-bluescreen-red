
/*
 * MQTT Client Handling
 */

import mqtt from 'mqtt'

import {
    TASMOTA_TELEMETRY_UPDATE,
    TASMOTA_STATUS_UPDATE,
} from 'components/tasmota/actions'

// TasMOTA ACtions
const TASMOTA_ACTION_TYPES = {
  "tele": TASMOTA_TELEMETRY_UPDATE,
  "stat": TASMOTA_STATUS_UPDATE,
};

// Global state because nothing else is sane...
let _MQTT_CLIENT = null;
let _MQTT_BUFFER = [];

// Json payload
function decodeJsonPayload(data) {
  let payload = null;
  if (data.length != 0) {
    try {
      payload = JSON.parse(data);
    }
    catch(err) {
      console.warn("Error while decoding MQTT payload:", err);
    }
  }
  return payload;
}

// Wrap an MQTT action into
function mqttAction(topic, msg) {
  let type = "@@mqtt/" + topic;
  let payload = decodeJsonPayload(msg);
  return {
    type: type,
    payload: payload
  }
}

function parseTasmotaValue(data) {
  // Do we need to do anything?
  if (data.length == 0) {
    return null;
  }

  // First try to decode data as json:
  // This should work for numbers and actual json data
  let value = null;
  try {
    value = JSON.parse(data);
  }
  catch(err) {
    // This should work as a fallback for raw string data
    value = data.toString();
  }

  return value;
}

function tasmotaAction(tasmotaPrefix, topic, data) {
  // Strip prefix from topic
  topic = topic.replace(tasmotaPrefix, "");
  // Parse topic
  let tokens = topic.split("/").reverse();
  console.log("tokens:", tokens);
  if (tokens.length < 3) {
    console.error(
      "Tasmota data needs format: ../<endpoint>/<device>/<state>"
    );
    return null;
  }
  let endpoint = tokens[2];
  let device = tokens[1];
  let key = tokens[0].toLowerCase();

  console.log(endpoint);
  let type = TASMOTA_ACTION_TYPES[endpoint];
  console.log(type);
  if (!type) {
    return null;
  }

  // Derive payload from topic
  let value = parseTasmotaValue(data);
  let payload = {
    device: device,
    key: key,
    value: value,
  }

  return {
    type: type,
    payload: payload
  }
}


export function mqttDispatch(action) {
  // Publish message
  let topic = action.type;
  if (!topic.startsWith("@@mqtt/")) {
    console.error("MQTT action needs to start with @@mqtt/");
    return;
  }

  // Strip mqtt prefix
  topic = topic.slice(7);
  let payload = JSON.stringify(action.payload);

  // Retain until we are connected
  if (!_MQTT_CLIENT || !_MQTT_CLIENT.connected) {
    _MQTT_BUFFER.push([topic, payload]);
    return;
  }

  _MQTT_CLIENT.publish(topic, payload);
}


export function mqttConnect(uri, store) {
  // Get Configuration
  let config = store.getState().config.tasmota;
  let tasmotaPrefix = config.prefix;

  // Get MQTT client
  let client = mqtt.connect(uri);

  // Subscribe to everything since we are
  // a central hub. We need to be informed!
  client.on("connect", function() {
    client.subscribe("#");

    // Publish everything in the buffer
    for (let update of _MQTT_BUFFER) {
      client.publish(update[0], update[1]);
    }

    // Clear buffer
    _MQTT_BUFFER = [];
  });

  // Create on message handler
  client.on("message", function(topic, msg) {
    // Decode message
    let action = null;
    if (topic.startsWith("v1/")) {
      action = mqttAction(topic, msg);
    } else if (topic.startsWith(tasmotaPrefix)) {
      action = tasmotaAction(tasmotaPrefix, topic, msg);
    }
    // Dispatch action
    if (action) {
      store.dispatch(action);
    }
  });

  _MQTT_CLIENT = client;
}





