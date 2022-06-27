
import mqtt from 'mqtt'

import { useState
       , useContext
       , createContext
       , useEffect
       , useRef
       }
  from 'react';

import { useConfig }
  from 'app/components/config/Provider';

const MqttContext = createContext();

export const useMqtt = () => useContext(MqttContext).current;

export const useMqttHandler = (fn, deps) => {
  const [, sub, unsub] = useMqtt();
  useEffect(() => {
    const ref = sub(fn);
    return () => {
      unsub(ref);
    };
  }, [...deps]);
};


/**
 * MqttProvider connects to the mqtt server
 * and provides a function for subscribing
 * and publising.
 */
const MqttProvider = ({children}) => {
  const config = useConfig();
  const subscriptions = useRef([]);

  const msgBuf = useRef([]);
  const pubsub = useRef([
    // Publish
    (topic, msg) => {
      msgBuf.current.append([topic, msg]);
    },
    // Subscribe
    (fn) => {
      subscriptions.current.push(fn);
      return fn;
    },
    // Unsubscribe
    (fn) => {
      subscriptions.current = subscriptions.current.filter(
        (sub) => sub != fn);
    },
  ]);

  useEffect(() => {
    const uri = config.mqtt?.uri;
    if (!uri) { return }

    const client = mqtt.connect(uri);
    
    // Register callbacks
    client.on("connect", () => {
      client.subscribe("#");

      // Update publish function
      pubsub.current[0] = (topic, msg) => {
        client.publish(topic, msg);
      }

      // Publish everything from the buffer
      for (const update of msgBuf.current) {
        client.publish(update[0], update[1]);
      }
      msgBuf.current = [];
    });

    client.on("message", (topic, msg) => {
      console.log(subscriptions.current);
      subscriptions.current.map((sub) => sub(topic, msg));
    });
  }, [config]);
  
  return (
    <MqttContext.Provider value={pubsub}>
      {children}
    </MqttContext.Provider>
  );
};

export default MqttProvider;
