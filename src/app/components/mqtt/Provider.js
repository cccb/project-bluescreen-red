
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

export const useMqtt = () => useContext(MqttContext).current;

export const useMqttReducer = (reducer, initialState) => {
  const [pub, sub, unsub] = useMqtt();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const onMsg = (topic, msg) => {
      try {
        const payload = JSON.parse(msg);
      } catch (err) {
        return; // discard non json MQTT msg
      }
      dispatch({
        type: topic,
        payload: JSON.parse(msg),
      })
    };
    const ref = sub(onMsg);
    return () => {
      unsub(ref);
    };
  }, [dispatch, sub, unsub]);
  return [state, pub];
};

/**
 * MqttProvider connects to the mqtt server
 * and provides a function for subscribing
 * and publising.
 */
const MqttProvider = ({children}) => {
  const config = useConfig();
  const subscriptions = useRef([]);

  const pubsub = useRef([
    // Publish
    (topic, msg) => {
      console.error("DEVNULL PUBLISH", topic, msg); // should never happen
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

    const client = mqtt.connect(uri);
    pubsub.current[0] = client.publish; // Set publish function
    
    // Register callbacks
    client.on("connect", () => {
      client.subscribe("#");
    });

    client.on("message", (topic, msg) => {
      subscriptions.current.map((sub) => sub(topic, msg));
    });

    return () => {
      client.end();
    };
  }, [config]);
  
  return (
    <MqttContext.Provider value={pubsub}>
      {children}
    </MqttContext.Provider>
  );
};

export default MqttProvider;
