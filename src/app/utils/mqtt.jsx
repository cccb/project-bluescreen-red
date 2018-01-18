
/*
 * MQTT Client Handling
 */

import mqtt from 'mqtt'


const MQTT_ACTION = "@@mqtt/ACTION";
const MQTT_PUBLISH = "@@mqtt/PUBLISH";

// Wrap an MQTT action into
export function mqttAction(topic, payload) {
  let type = "@@mqtt/" + topic;
  return {
    type: type,
    payload: payload
  }
}

export function mqttPublish(payload) {
  return {
    type: MQTT_PUBLISH,
    payload: payload
  }
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
    let payload = JSON.parse(msg);
    
    // Dispatch action
    store.dispatch(mqttAction(topic, payload));
  });

  return client;
}





