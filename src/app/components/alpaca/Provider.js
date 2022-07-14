
import { useCallback }
  from 'react';

import { useMqtt
       , useMqttReducer
       }
  from 'app/components/mqtt/Provider';


const encodePayload = (payload) => {
  if (payload === undefined) {
    payload = {};
  }
  return JSON.stringify(payload);
}

/**
 * The alpaca reducer is an extension to the mqttReducer
 * wrapping the publish method to encode the provided action
 */
export const useAlpacaReducer = (reducer, initialState) => {
  const [state, publish] = useMqttReducer(reducer, initialState);
  const dispatch = useCallback(({type, payload}) => {
    return publish(type, encodePayload(payload));
  }, [publish]);
  return [state, dispatch]
}


/**
 * Alpaca dispatch is used when no state is required
 */
export const useAlpacaDispatch = () => {
  const conn = useMqtt();
  const dispatch = useCallback(({type, payload}) => {
    return conn.current[0](type, encodePayload(payload));
  }, [conn]);
  return dispatch;
}

