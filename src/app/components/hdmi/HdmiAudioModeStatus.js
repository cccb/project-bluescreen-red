
import { useHdmiAudioMode }
  from 'app/components/hdmi/alpaca';

/**
 * HdmiAudioModeStatus indicates the current selected
 * audio mode on the HDMI matrix
 */
const HdmiAudioModeStatus = () => {
  const { mode } = useHdmiAudioMode();
  return (
    <span className="hdmi-audio-mode-status">
      Audio Mode: <b>{mode}</b>
    </span>
  );
}

export default HdmiAudioModeStatus;
