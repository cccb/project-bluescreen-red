
import {SET_VALUE} from './actions'

// Lights State

const initialState = {
  values: {
    entry: 42,
    foh: 23,
    deskWall: 23,
    deskBar: 0
  }
}



function updateValue(state, handle, value) {
  let next = Object.assign({}, state);
  next.values[handle] = value;

  return next;
}


export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SET_VALUE:
      return updateValue(state,
                         action.payload.handle,
                         action.payload.value);
  }

  return state;
}


