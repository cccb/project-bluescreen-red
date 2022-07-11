
import { useMqtt
       , useMqttReducer
       }
  from 'app/components/mqtt/Provider';



/**
 * The alpaca reducer is an extension to the mqttReducer
 * wrapping the publish method to encode the provided action
 */
export const useAlpacaReducer = (reducer, initialState) => {
  const [state, publish] = useMqttReducer(reducer, initialState);
  
  const dispatch = (action) => {
    const topic = action.type;
    const payload = JSON.stringify(action.payload);
    return publish(topic, payload);
  }

  return [state, dispatch]
}


/**
 * Alpaca dispatch is used when no state is required
 */
export const useAlpacaDispatch = () => {
  const conn = useMqtt();
  const dispatch = (action) => {
    const topic = action.type;
    const payload = JSON.stringify(action.payload);
    return conn.current[0](topic, payload);
  }
  return dispatch;
}

