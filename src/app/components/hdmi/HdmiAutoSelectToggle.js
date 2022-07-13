
import { useHdmiAutoSelect }
  from 'app/components/hdmi/alpaca';

import Toggle
  from 'app/components/buttons/Toggle';

/**
 * HdmiAutoSelectToggle toggles automatic source
 * selection for the HDMI video matrix
 */
const HdmiAutoSelectToggle = () => {
  const [enabled, setEnabled] = useHdmiAutoSelect();
  return (
    <Toggle
      activeLabel="AutoSelect ENABLED"
      inactiveLabel="AutoSelect DISABLED"
      onToggle={(v) => setEnabled(v)}
      value={enabled} />
  );
}

export default HdmiAutoSelectToggle;
