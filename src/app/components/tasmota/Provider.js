
import { createContext
       , useContext
       , useEffect
       , useState
       , useCallback
       }
  from 'react';

import { useConfig }
  from 'app/components/config/Provider';
import { useMqtt }
  from 'app/components/mqtt/Provider';

/**
 * Tasmota MQTT Messages
 */

export const TASMOTA_TELEMETRY_UPDATE = "@tasmota/TELEMETRY_UPDATE";
export const TASMOTA_STATUS_UPDATE = "@tasmota/STATUS_UPDATE";
export const TASMOTA_COMMAND_REQUEST = "@tasmota/COMMAND_REQUEST";

// Lets see about those.
export const TASMOTA_STATUS_REQUEST = "@@tasmota/STATUS_REQUEST";
export const TASMOTA_STATUS_UPDATE_REQUEST = "@@tasmota/STATUS_UPDATE_REQUEST";

const TASMOTA_ACTION_TYPES = {
  "tele": TASMOTA_TELEMETRY_UPDATE,
  "stat": TASMOTA_STATUS_UPDATE,
};


/**
 * Tasmota Context
 */
const TasmotaContext = createContext({
  devices: {},
  prefix: "",
});

export const useTasmota = () => useContext(TasmotaContext);


const parseTasmotaValue = (data) => {
  // Do we need to do anything?
  if (data.length === 0) {
    return null;
  }
  // First try to decode data as json:
  // This should work for numbers and actual json data
  let value = null;
  try {
    value = JSON.parse(data);
  }
  catch(err) {
    // This should work as a fallback for raw string data
    value = data.toString();
  }
  return value;
}


const parseTasmotaAction = (tasmotaPrefix, topic, data) => {
  if (!topic.startsWith(tasmotaPrefix)) {
    return null; // nothing to do here
  }
  // Strip prefix from topic
  topic = topic.replace(tasmotaPrefix, "");
  // Parse topic
  const tokens = topic.split("/").reverse();
  if (tokens.length < 3) {
    console.error(
      "Tasmota data needs format: ../<endpoint>/<device>/<state>"
    );
    return null;
  }
  const endpoint = tokens[2];
  const device = tokens[1];
  const key = tokens[0].toLowerCase();

  const type = TASMOTA_ACTION_TYPES[endpoint];
  if (!type) {
    return null;
  }

  // Derive payload from topic
  const value = parseTasmotaValue(data);
  const payload = {
    device: device,
    key: key,
    value: value,
  }
  return {
    type: type,
    payload: payload
  }
}

/**
 * Encode tasmota command,
 * example ("switch-lights", "power", "on").
 */
const tasmotaCommand = (prefix, deviceId, endpoint, value="") => {
  let topic = `${prefix}/cmnd/${deviceId}/${endpoint.toUpperCase()}`;
  return [topic, value];
}

/**
 * TasmotaSwitch is a switch component
 */
export const useTasmotaSwitch = (deviceId) => {
  const conn = useMqtt();
  const {prefix} = useTasmota();
  const [state, setState] = useState("off");
  
  useEffect(() => {
    if (!prefix) {
      return;
    }
    const [pub, sub, unsub] = conn.current;

    // Subscribe to MQTT messages
    const onMsg = (topic, msg) => {
      // Decode tasmota message. If status update,
      // set state with new status.
      const action = parseTasmotaAction(prefix, topic, msg);
      if (!action) {
        return // nothing to do here
      }

      // Handle status update
      if (action.type === TASMOTA_STATUS_UPDATE 
          && action.payload.device === deviceId
          && action.payload.key === "power" ) {
        setState(action.payload.value.toLowerCase());
      }
    };
    const ref = sub(onMsg);

    // Dispatch request
    const [topic, msg] = tasmotaCommand(prefix, deviceId, "power");
    pub(topic, msg);

    return () => {
      unsub(ref);
    };
  }, [deviceId, conn, setState, prefix]);

  const toggleState = useCallback(() => {
    const [pub] = conn.current;
    if (state === "on") {
      // Dispatch mqtt tasmota power off
      const [topic, msg] = tasmotaCommand(prefix, deviceId, "power", "off");
      pub(topic, msg);
    } else {
      // Dispatch mqtt tasmota power on 
      const [topic, msg] = tasmotaCommand(prefix, deviceId, "power", "on");
      pub(topic, msg);
    }
  }, [prefix, deviceId, state, conn]);
  
  return [state, toggleState];
}



/**
 * Tasmota Provider
 */
const TasmotaProvider = ({children}) => {
  const config = useConfig();
  
  // Create tasmota config from application runtime configuration
  let devices = {};
  if (config.tasmota?.devices) {
    for (const dev of config.tasmota.devices) {
      devices[dev.id] = dev;
    }
  }

  const tasmota = {
    devices: devices, 
    prefix: config.tasmota?.prefix,
  };

  return (
    <TasmotaContext.Provider value={tasmota}>
      {children}
    </TasmotaContext.Provider>
  );
};



export default TasmotaProvider;
