
import {UPDATE_CONFIG} from './actions'

const initialState = {
  "mqtt": {},
  "tasmota": {
    "prefix": "",
    "devices": []
  }
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case UPDATE_CONFIG:
      return Object.assign({}, state, action.payload);
  }

  return state;
}

