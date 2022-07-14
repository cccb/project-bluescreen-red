
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

  const labelEnabled = (
    <span>
      AutoSelect<br/> ENABLED
    </span>
  );

  const labelDisabled = (
    <span> 
      AutoSelect<br/> DISABLED 
    </span>
  );

  return (
    <Toggle
      style={{marginLeft: "10px"}}
      className="btn-small"
      activeLabel={labelEnabled}
      inactiveLabel={labelDisabled}
      onToggle={(v) => setEnabled(v)}
      value={enabled} />
  );
}

export default HdmiAutoSelectToggle;
