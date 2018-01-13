
export const SET_VALUE = "@lights/SET_VALUE";

// Action creators
export function setValue(handle, value) {
  return {
    type: SET_VALUE,
    payload: {
      value: value,
      handle: handle
    }
  }
}

