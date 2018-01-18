
/*
 * MQTT Client Handling
 */

import mqtt from 'mqtt'

// Global state because nothing else is sane...
let _MQTT_CLIENT = null;
let _MQTT_BUFFER = [];


// Wrap an MQTT action into
function mqttAction(topic, payload) {
  let type = "@@mqtt/" + topic;
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
    let payload = null;
    if (msg.length != 0) {
      try {
        payload = JSON.parse(msg);
      }
      catch(err) {
        console.warn("Error while decoding MQTT payload:", err);
      }
    }
    
    // Dispatch action
    store.dispatch(mqttAction(topic, payload));
  });

  _MQTT_CLIENT = client;
}





