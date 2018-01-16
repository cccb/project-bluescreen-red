
export const UPDATE_CONFIG = "@config/UPDATE";

export function updateConfig(config) {
  return {
    type: UPDATE_CONFIG,
    payload: config
  }
}


