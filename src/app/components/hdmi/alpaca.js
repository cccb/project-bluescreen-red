

import { useEffect
       , useCallback
       }
  from 'react';

import { useAlpacaReducer }
  from 'app/components/alpaca/Provider';


// ID mappings
export const IN_TABLE   = 0;
export const IN_NUC     = 1;
export const IN_APPLETV = 2;
export const IN_FOH     = 3;

export const OUT_PROJECTOR = 4;

// Actions
export const GET_SELECTED_INPUT_REQUEST =
  "v1/mainhall/hdmimatrix/GET_SELECTED_INPUT_REQUEST";
export const GET_SELECTED_INPUT_SUCCESS =
  "v1/mainhall/hdmimatrix/GET_SELECTED_INPUT_SUCCESS";
export const GET_SELECTED_INPUT_ERROR =
  "v1/mainhall/hdmimatrix/GET_SELECTED_INPUT_ERROR";

export const SET_SELECTED_INPUT_REQUEST =
  "v1/mainhall/hdmimatrix/SET_SELECTED_INPUT_REQUEST";
export const SET_SELECTED_INPUT_SUCCESS =
  "v1/mainhall/hdmimatrix/SET_SELECTED_INPUT_SUCCESS";
export const SET_SELECTED_INPUT_ERROR =
  "v1/mainhall/hdmimatrix/SET_SELECTED_INPUT_ERROR";

export const GET_AUDIO_MODE_REQUEST =
  "v1/mainhall/hdmimatrix/GET_AUDIO_MODE_REQUEST";
export const GET_AUDIO_MODE_SUCCESS =
  "v1/mainhall/hdmimatrix/GET_AUDIO_MODE_SUCCESS";
export const GET_AUDIO_MODE_ERROR =
  "v1/mainhall/hdmimatrix/GET_AUDIO_MODE_ERROR";

export const SET_AUDIO_MODE_REQUEST =
  "v1/mainhall/hdmimatrix/SET_AUDIO_MODE_REQUEST";
export const SET_AUDIO_MODE_SUCCESS =
  "v1/mainhall/hdmimatrix/SET_AUDIO_MODE_SUCCESS";
export const SET_AUDIO_MODE_ERROR =
  "v1/mainhall/hdmimatrix/SET_AUDIO_MODE_ERROR";

export const GET_AUTO_SELECT_REQUEST =
  "v1/mainhall/hdmimatrix/GET_AUTO_SELECT_REQUEST";
export const GET_AUTO_SELECT_SUCCESS =
  "v1/mainhall/hdmimatrix/GET_AUTO_SELECT_SUCCESS";
export const GET_AUTO_SELECT_ERROR =
  "v1/mainhall/hdmimatrix/GET_AUTO_SELECT_ERROR";

export const SET_AUTO_SELECT_REQUEST =
  "v1/mainhall/hdmimatrix/SET_AUTO_SELECT_REQUEST";
export const SET_AUTO_SELECT_SUCCESS =
  "v1/mainhall/hdmimatrix/SET_AUTO_SELECT_SUCCESS";
export const SET_AUTO_SELECT_ERROR =
  "v1/mainhall/hdmimatrix/SET_AUTO_SELECT_ERROR";

export const GET_CONNECTION_STATES_REQUEST =
  "v1/mainhall/hdmimatrix/GET_CONNECTION_STATES_REQUEST";
export const GET_CONNECTION_STATES_SUCCESS =
  "v1/mainhall/hdmimatrix/GET_CONNECTION_STATES_SUCCESS";
export const GET_CONNECTION_STATES_ERROR =
  "v1/mainhall/hdmimatrix/GET_CONNECTION_STATES_ERROR";


/*
 * Action Creators
 */

export const getSelectedInputRequest = () => {
  return {
    type: GET_SELECTED_INPUT_REQUEST,
    payload: {},
  };
}

export const setSelectedInputRequest = (inputId) => {
  return {
    type: SET_SELECTED_INPUT_REQUEST,
    payload: {
      input_id: inputId
    }
  };
}

export const getAudioModeRequest = () => {
  return {
    type: GET_AUDIO_MODE_REQUEST,
    payload: {},
  };
}

export const setAudioModeRequest = (modeId) => {
  return {
    type: SET_AUDIO_MODE_REQUEST,
    payload: {
      mode_id: modeId
    }
  };
}

export const getAutoSelectRequest = () => {
  return {
    type: GET_AUTO_SELECT_REQUEST,
    payload: {}
  };
}

export const setAutoSelectRequest = (enabled) => {
  return {
    type: SET_AUTO_SELECT_REQUEST,
    payload: {
      enabled: enabled
    }
  };
}

export const getConnectionStatesRequest = () => {
  return {
    type: GET_CONNECTION_STATES_REQUEST,
    payload: {},
  };
}



/**
 * HDMI audio mode reducer
 */

const initialAudioModeState = {
  id: -1,
  mode: "unknown",
};

const audioModeReducer = (state, {type, payload}) => {
  switch (type) {
    case GET_AUDIO_MODE_SUCCESS:
    case SET_AUDIO_MODE_SUCCESS:
      return {
        id:   payload.mode_id,
        mode: payload.mode
      };
    default:
  }
  return state:
}

/**
 * useHdmiAudioMode uses an alpaca reducer to retrieve
 * the current audio mode
 */
export const useHdmiAudioMode = () => {
  const [state, dispatch] = useAlpacaReducer(
    audioModeReducer,
    initialAudioModeState,
  );

  useEffect(() => {
    dispatch(getAudioModeRequest());
  }, [dispatch]);

  return state;
}



/**
 * HDMI input reducer
 */
const inputReducer = (state, {type, payload}) => {
  switch (type) {
    case GET_SELECTED_INPUT_SUCCESS:
    case SET_SELECTED_INPUT_SUCCESS:
      return payload.input_id;
    default:
  }
  return state;
}


/**
 * HDMI selected input
 */
export const useHdmiInput = () => {
  const [state, dispatch] = useAlpacaReducer(inputReducer, -1);

  const setInput = useCallback((id) => {
    dispatch(setSelectedInputRequest(id)); 
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSelectedInputRequest());
  }, [dispatch]);

  return [state, setInput];
}


/**
 * autoSelect reducer
 */
const autoSelectReducer = (state, {type, payload}) => {
  switch(type) {
    case GET_AUTO_SELECT_SUCCESS:
    case SET_AUTO_SELECT_SUCCESS:
      return payload.enabled;
    }
    default:
  }
  return state;
}

/**
 * HDMI AutoSelect
 */
export const useHdmiAutoSelect = () => {
  const [enabled, dispatch] = useAlpacaReducer(inputReducer, false);
  const setEnabled = useCallback((enabled) => {
    dispatch(setAutoSelectRequest(enabled)); 
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAutoSelectRequest());
  }, [dispatch]);
  return [state, setEnabled];
}


/**
 * connections reducer
 */
const connectionsInitialState = [false, false, false, false, false];

const connectionsReducer = (state, {type, payload}) => {
  switch (type) {
    case GET_CONNECTION_STATES_SUCCESS:
      return payload.connections;
    default:
  }
  return state;
}


/**
 * HDMI Connections 
 */
export const useHdmiConnections = () => {
  const [connections, dispatch] = useAlpacaReducer(
    connectionsReducer,
    connectionsInitialState
  );

  useEffect(() => {
    dispatch(getConnectionStatesRequest());
  }, [dispatch]);
  
  return connections;
}

