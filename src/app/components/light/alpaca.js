
import { useCallback
       , useEffect
       }
  from 'react';

import { useAlpacaReducer }
  from 'app/components/alpaca/Provider';


// Lights mapping:
export const ID_ENTRY = 2;
export const ID_FOH = 3;
export const ID_DESK_WALL = 0;
export const ID_DESK_BAR = 1;


export const GET_LIGHT_VALUES_REQUEST =
             "v1/mainhall/dali/GET_LIGHT_VALUES_REQUEST";
export const GET_LIGHT_VALUES_SUCCESS =
             "v1/mainhall/dali/GET_LIGHT_VALUES_SUCCESS";
export const GET_LIGHT_VALUES_ERROR =
             "v1/mainhall/dali/GET_LIGHT_VALUES_ERROR";

export const SET_LIGHT_VALUE_REQUEST =
             "v1/mainhall/dali/SET_LIGHT_VALUE_REQUEST";
export const SET_LIGHT_VALUE_SUCCESS =
             "v1/mainhall/dali/SET_LIGHT_VALUE_SUCCESS";

// Action creators
export const getLightValuesRequest = () => {
  return {
    type: GET_LIGHT_VALUES_REQUEST,
    payload: {
    }
  }
}

export const setLightValueRequest = (id, percentage) => {
  let value = Math.round((percentage / 100.0) * 255.0)
  return {
    type: SET_LIGHT_VALUE_REQUEST,
    payload: {
      id: id,
      value: value
    }
  }
}


const daliLightLevelsReducer = (state, {type, payload}) => {
  switch(type) {
    case GET_LIGHT_VALUES_SUCCESS:
      // Decode light levels and return as new state.
      // Levels are mapped to 0..100
      let levels = {};
      for (const light in payload) {
        levels[light.id] = (light.value / 255.0) * 100.0;
      }
      return levels;

    case SET_LIGHT_VALUE_SUCCESS:
      const value = (payload.value / 255.0) * 100.0;
      return {...state, [payload.id]: value};

    default:
  }
  return state;
}

/**
 * useDaliLightLevels uses an alpaca reducer for
 * setting the dali light
 */
export const useDaliLightLevels = () => {
  const [levels, dispatch] = useAlpacaReducer(
    daliLightLevelsReducer, {});

  // Set light level
  const setLevel = useCallback((id, value) => {
    dispatch(setLightValueRequest(id, value));
  }, [dispatch]);

  // Request current state
  useEffect(() => {
    dispatch(getLightValuesRequest());
  }, [dispatch]);

  return [levels, setLevel];
}

