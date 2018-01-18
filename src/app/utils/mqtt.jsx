
/*
 * MQTT Client Handling
 */

import mqtt from 'mqtt'

// Global state because nothing else is sane...
let _MQTT_CLIENT = null;


// Wrap an MQTT action into
function mqttAction(topic, payload) {
  let type = "@@mqtt/" + topic;
  return {
    type: type,
    payload: payload
  }
}


export function mqttDispatch(action) {
  if (!_MQTT_CLIENT) {
    console.error("MQTT client not initilized");
    return;
  }

  if (!_MQTT_CLIENT.connected) {
    console.error("MQTT client not connected");
    return;
  }

  // Publish message
  let topic = action.type;
  
  // Strip mqtt prefix
  if (!topic.startsWith("@@mqtt/")) {
    console.error("MQTT action needs to start with @@mqtt/");
    return;
  }

  topic = topic.slice(7);

  let payload = JSON.stringify(action.payload);

  _MQTT_CLIENT.publish(topic, payload);
}


export function mqttConnect(brokerHost, store) {
  // Get MQTT client
  let uri = "ws://" + brokerHost; 
  let client = mqtt.connect(uri);

  // Subscribe to everything since we are
  // a central hub. We need to be informed!
  client.on("connect", function() {
    client.subscribe("#");
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





