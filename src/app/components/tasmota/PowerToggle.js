
import { useTasmotaSwitch }
  from 'app/components/tasmota/Provider';

import Toggle
  from 'app/components/buttons/Toggle';

/**
 * PowerToggle is a button which reads a tasmota state
 * for a given device ID and toggles the On / Off state
 */
const PowerToggle = ({deviceId, labelOn, labelOff}) => {
  const [state, toggleState] = useTasmotaSwitch(deviceId);

  return (
    <Toggle
      onToggle={(next) => toggleState()}
      value={state === "on"}
      activeClass="btn-success"
      activeLabel="Power Off"
      inactiveLabel="Power On"
      inactiveClass="btn-warning" /> 
  )
}

export default PowerToggle;

