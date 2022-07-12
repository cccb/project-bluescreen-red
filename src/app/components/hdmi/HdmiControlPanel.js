
import Panel
  from 'app/components/panel/Panel';
import HdmiInputSelect
  from 'app/components/hdmi/HdmiInputSelect';
import HdmiAutoSelectToggle
  from 'app/components/hdmi/HdmiAutoSelectToggle';
import HdmiAudioModeStatus
  from 'app/components/hdmi/HdmiAudioModeStatus';

/**
 * HdmiControlPanel controls the HDMI matrix in the main hall
 */
const HdmiControlPanel = () => {
  return (
    <Panel title="Video">
      <div className="beamer-source-select row">
          <HdmiInputSelect output="presenter" />
      </div>
      <div className="beamer-status row">
        <div className="col-md-6">
          <HdmiAutoSelectToggle />
        </div>
        <div className="col-md-6">
          <HdmiAudioModeStatus />
        </div>
      </div>
    </Panel>
  );
};

export default HdmiControlPanel;
