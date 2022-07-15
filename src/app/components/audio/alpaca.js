
import { useEffect
       , useCallback
       }
  from 'react';

import { withRemap }
  from 'app/utils/math';

import { useAlpacaReducer }
  from 'app/components/alpaca/Provider';

// ID mappings
export const MAIN_MASTER_LEVEL = 1;
export const MAIN_BACK_LEVEL = 3;
export const MAIN_BACK_LEVEL_LEFT = 3;
export const MAIN_BACK_LEVEL_RIGHT = 7;
export const MAIN_BASS_LEVEL = 5;
export const MAIN_BAR_LEVEL = 2;

export const MAIN_MUTE_MASTER_TOGGLE = 1;
export const MAIN_MUTE_BAR_TOGGLE = 12;
export const MAIN_MUTE_BACK_TOGGLE  = 13;

export const MAIN_SOURCE = 2;
export const MAIN_SOURCE_LEFT = 2;
export const MAIN_SOURCE_RIGHT = 7;

export const MAIN_SOURCE_DESK = 1;
export const MAIN_SOURCE_HDMI = 2;
export const MAIN_SOURCE_SONIC = 3;
export const MAIN_SOURCE_FOH = 4;

// Actions
export const GET_LEVELS_REQUEST =
             "v1/mainhall/soundweb/GET_LEVELS_REQUEST";
export const GET_LEVELS_SUCCESS =
             "v1/mainhall/soundweb/GET_LEVELS_SUCCESS";

export const GET_TOGGLE_REQUEST =
             "v1/mainhall/soundweb/GET_TOGGLE_REQUEST";
export const GET_TOGGLE_SUCCESS =
             "v1/mainhall/soundweb/GET_TOGGLE_SUCCESS";

export const GET_SOURCE_REQUEST =
             "v1/mainhall/soundweb/GET_SOURCE_REQUEST";
export const GET_SOURCE_SUCCESS =
             "v1/mainhall/soundweb/GET_SOURCE_SUCCESS";

export const GET_LEVEL_REQUEST =
             "v1/mainhall/soundweb/GET_LEVEL_REQUEST";
export const GET_LEVEL_SUCCESS =
             "v1/mainhall/soundweb/GET_LEVEL_SUCCESS";
export const GET_LEVEL_ERROR =
             "v1/mainhall/soundweb/GET_LEVEL_ERROR";

export const SET_LEVEL_REQUEST =
             "v1/mainhall/soundweb/SET_LEVEL_REQUEST";
export const SET_LEVEL_SUCCESS =
             "v1/mainhall/soundweb/SET_LEVEL_SUCCESS";

export const SET_TOGGLE_REQUEST =
             "v1/mainhall/soundweb/SET_TOGGLE_REQUEST";
export const SET_TOGGLE_SUCCESS =
             "v1/mainhall/soundweb/SET_TOGGLE_SUCCESS";

export const SET_SOURCE_REQUEST =
             "v1/mainhall/soundweb/SET_SOURCE_REQUEST";
export const SET_SOURCE_SUCCESS =
             "v1/mainhall/soundweb/SET_SOURCE_SUCCESS";


// Value conversion:
//  Levels are represented within 0..255
//  We want somehing like 0..100 for presentation.
const remap100 = withRemap(0, 255, 0, 100);
const remap255 = withRemap(0, 100, 0, 255);

// Action creators

export const setLevelRequest = (levelId, value) => {
  return {
    type: SET_LEVEL_REQUEST,
    payload: {
      id: levelId,
      value: Math.round(remap255(value)), 
    }
  }
}


export const getLevelsRequest = () => {
  return {
    type: GET_LEVELS_REQUEST,
  }
}

export const getLevelRequest = (channel) => {
  return {
    type: GET_LEVEL_REQUEST,
    payload: {
      id: channel,
    },
  }
}

export const getToggleRequest = (id) => {
  return {
    type: GET_TOGGLE_REQUEST,
    payload: {
      id: id,
    },
  }
}

export const getSourceRequest = (id) => {
  return {
    type: GET_SOURCE_REQUEST,
    payload: {
      id: id,
    },
  }
}

export const setSourceRequest = (sourceId, value) => {
  return {
    type: SET_SOURCE_REQUEST,
    payload: {
      id: sourceId,
      value: value
    }
  }
}

// State: true | false
export const setToggleRequest = (toggleId, state) => {
  return {
    type: SET_TOGGLE_REQUEST,
    payload: {
      id: toggleId,
      state: state
    }
  }
}

// State

/**
 * audioLevelReducer produces a reducer for a given
 * audio channel (levelId, legacy).
 *
 * State is the current level (0..100).
 */
const audioLevelReducer = (channel) => (state, action) => {
  if (action.type !== GET_LEVEL_SUCCESS &&
      action.type !== SET_LEVEL_SUCCESS ) {
    return state; // nothing to do here
  }

  const {id, value} = action.payload;
  if (id !== channel) {
    return state; // nothing to do here
  }

  return remap100(value);
};

/**
 * useAudioLevel uses an alpaca reducer to set and retrieve
 * the current audio level of a channel
 */
export const useAudioLevel = (channel) => {
  const [level, dispatch] = useAlpacaReducer(audioLevelReducer(channel));
  const setLevel = useCallback((level) => {
    dispatch(setLevelRequest(channel, level));
  }, [channel, dispatch]);

  // Initialize by making a request to get the current level
  useEffect(() => {
    dispatch(getLevelRequest(channel));
  }, [dispatch, channel]);
  
  return [level, setLevel];
}


/**
 * audioSourceReducer is a reducer for the selected audio
 * channel. We always assume MAIN_SOURCE as the channel.
 */
const audioSourceReducer = (state, {type, payload}) => {
  if (type !== SET_SOURCE_SUCCESS &&
      type !== GET_SOURCE_SUCCESS ) {
    return state; // Nothing to do
  }
  if (payload.id !== MAIN_SOURCE) {
    return state; // Same
  }

  return payload.value;
}

/**
 * useAudioSource uses an alpaca reducer to set and retrieve
 * the selected source.
 */
export const useAudioSource = () => {
  const [source, dispatch] = useAlpacaReducer(audioSourceReducer, 0);
  const setSource = useCallback((id) => {
    dispatch(setSourceRequest(MAIN_SOURCE, id)); 
  }, [dispatch]);

  // Initialize by making a request to get the current level
  useEffect(() => {
    dispatch(getSourceRequest(MAIN_SOURCE));
  }, [dispatch]);

  return [source, setSource];
}

/**
 * audioToggleReducer creates a reducer for the current toggle
 */
const audioToggleReducer = (toggle) => (state, {type, payload}) => {
  if (type !== SET_TOGGLE_SUCCESS &&
      type !== GET_TOGGLE_SUCCESS ) {
    return state; // nothing to do here
  }
  if (payload.id !== toggle) {
    return state; // not interested
  }

  // Update state (payload.state is either true or false)
  return payload.state;
}

/**
 * useAudioToggle uses an alpaca reducer to set and retrieve the
 * current toggle value identified by id.
 */
export const useAudioToggle = (toggle) => {
  const [state, dispatch] = useAlpacaReducer(
    audioToggleReducer(toggle), false);
  const setState = useCallback((state) => {
    dispatch(setToggleRequest(toggle, state)); 
  }, [toggle, dispatch]);

  // Initialize by making a request to get the current state
  useEffect(() => {
    dispatch(getToggleRequest(toggle));
  }, [toggle, dispatch]);

  return [state, setState];
};


