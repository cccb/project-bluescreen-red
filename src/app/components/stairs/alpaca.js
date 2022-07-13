
import { useCallback
       , useEffect
       }
  from 'react';

import { useAlpacaReducer }
  from 'app/components/alpaca/Provider';


export const STATE_POWER_OFF = 0;
export const STATE_POWER_ON  = 1;

export const TREPPE_POWER_STATE_CHANGED =
  "v1/treppe/power/POWER_STATE_CHANGED";

export const TREPPE_POWER_STATE =
  "v1/treppe/power/POWER_STATE";

export const TREPPE_POWER_ON =
  "v1/treppe/power/POWER_ON";

export const TREPPE_POWER_OFF =
  "v1/treppe/power/POWER_OFF";


export const requestPowerState = () => {
  return {
    type: TREPPE_POWER_STATE,
  }
}

export const requestPowerOn = () => {
  return {
    type: TREPPE_POWER_ON,
  }
}

export const requestPowerOff = () => {
  return {
    type: TREPPE_POWER_OFF,
  }
}


const powerStateReducer = (state, {type, payload}) => {
  if (type !== TREPPE_POWER_STATE_CHANGED) {
    return state; 
  }
  return payload.state === STATE_POWER_ON;
}

/**
 * Alpaca reducer for handling the treppe power state
 */
export const useTreppePowerState = () => {
  const [state, dispatch] = useAlpacaReducer(powerStateReducer, false);
  const setState = useCallback((s) => {
    if (s) {
      return dispatch(requestPowerOn());
    } else {
      return dispatch(requestPowerOff());
    };
  }, [dispatch]);

  // Request current state
  useEffect(() => {
    dispatch(requestPowerState());
  }, [dispatch]);
  
  return [state, setState];
}


