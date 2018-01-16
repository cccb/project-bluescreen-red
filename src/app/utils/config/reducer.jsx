
import {UPDATE_CONFIG} from './actions'

const initialState = {}

export default function reducer(state=initialState, action) {
  switch(action) {
    case UPDATE_CONFIG:
      return Object.assign({}, state, action.payload);
  }

  return state;
}

