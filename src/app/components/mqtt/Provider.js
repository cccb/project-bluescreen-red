
import mqtt from 'mqtt'

import { useContext
       , useReducer
       , createContext
       , useEffect
       , useRef
       }
  from 'react';

import { useConfig }
  from 'app/components/config/Provider';

const MqttContext = createContext();

export const useMqtt = () => useContext(MqttContext);

export const useMqttReducer = (reducer, initialState) => {
  // Wrap reducer, because it needs to handle unverifed input.
  // Causing the app to crash because of a malformed MQTT message
  // would be unfortunate.
  const safeReducer = (state, action) => {
    try {
      return reducer(state, action);
    } catch (err) {
      console.warn("reducer error", err, action);
      return state;
    }
  }

  const conn = useMqtt();
  const [state, dispatch] = useReducer(safeReducer, initialState);

  const publish = (topic, msg) => conn.current[0](topic, msg);

  useEffect(() => {
    const [, sub, unsub] = conn.current;
    const onMsg = (topic, msg) => {
      let payload = null;
      try {
        payload = JSON.parse(msg);
      } catch (err) {
        return; // discard non json MQTT msg
      }
      dispatch({
        type: topic,
        payload: payload,
      })
    };
    const ref = sub(onMsg);
    return () => {
      unsub(ref);
    };
  }, [conn]);

  return [state, publish];
};


/**
 * MqttProvider connects to the mqtt server
 * and provides a function for subscribing
 * and publising.
 */
const MqttProvider = ({children}) => {
  const config = useConfig();
  const subscriptions = useRef([]);
  const client = useRef();
  const msgBuf = useRef([]);

  const pubsub = useRef([
    // Publish
    (topic, msg) => {
      if (client.current) {
        client.current.publish(topic, msg);
      } else { 
        msgBuf.current.push([topic, msg]);
      }
    },
    // Subscribe
    (fn) => {
      subscriptions.current.push(fn);
      return fn;
    },
    // Unsubscribe
    (fn) => {
      subscriptions.current = subscriptions.current.filter(
        (sub) => sub !== fn);
    },
  ]);

  useEffect(() => {
    const uri = config.mqtt?.uri;
    if (!uri) { return }

    client.current = mqtt.connect(uri);
    
    // Register callbacks
    client.current.on("connect", () => {
      client.current.subscribe("#");
      // Flush buffer
      for (const [msg, topic] of msgBuf.current) {
        client.current.publish(msg, topic);
      }
      msgBuf.current = [];
    });

    client.current.on("message", (topic, msg) => {
      subscriptions.current.map((sub) => sub(topic, msg));
    });

    return () => {
      client.current.end();
    };
  }, [config]);
  
  return (
    <MqttContext.Provider value={pubsub}>
      {children}
    </MqttContext.Provider>
  );
};

export default MqttProvider;
