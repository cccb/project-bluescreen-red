
import Panel
  from 'app/components/panel/Panel';
import Toggle
  from 'app/components/buttons/Toggle';
import PowerToggle 
  from 'app/components/tasmota/PowerToggle';
import VolumeControl
  from 'app/components/audio/VolumeControl';
import AudioSourceSelect
  from 'app/components/audio/AudioSourceSelect'; 
import HdmiInputSelect
  from 'app/components/hdmi/HdmiInputSelect';
import HdmiAutoSelectToggle
  from 'app/components/hdmi/HdmiAutoSelectToggle';
import HdmiAudioModeStatus
  from 'app/components/hdmi/HdmiAudioModeStatus';
import LightPresets
  from 'app/components/light/LightPresets';
import PowerStats
  from 'app/components/power-stats/PowerStats';


/**
 * AudioPanel is the main hall audio control panel
 */
const AudioPanel = () => {
  // Fake state
  const masterVolumeMute = true;
  const masterVolumeLevel = 42.0;
  const onMasterVolumeChanged = (value) => {
    console.log(value);
  };
  const onMasterVolumeMuteToggle = (s) => {
    console.log(s);
  }
  return (
    <Panel title="Audio">
      <div className="row">
        <div className="col-xs-4 box-centered">
          <VolumeControl
            title="Master Volume"
            level={masterVolumeLevel}
            onChange={onMasterVolumeChanged} />

          <div className="box-ctrl">
            <Toggle onToggle={onMasterVolumeMuteToggle}
                    value={masterVolumeMute}
                    activeLabel="Unmute"
                    inactiveLabel="Mute" />
        </div>

        <div className="col-xs-8">
          <PowerToggle deviceId="power-music" />
          <AudioSourceSelect />
        </div>
      </div>
      </div>
    </Panel>
  );
};

/**
 * VideoPanel controls the HDMI matrix in the main hall
 */
const VideoPanel = () => {
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

/**
 * The MainHall Page provides an interface for controlling
 * lights and audio in the main hall.
 */
const MainHallPage = () => {
  return (
    <div className="page page-mainhall">
      <div className="content">

        <div className="col-md-8">
          <AudioPanel />
        </div>

        <div className="col-md-4">
          vidoe panel
        </div>

        <div className="col-md-8">
          <LightPresets title="Light Presets" />
        </div>

        <div className="col-md-4">
          <PowerStats />
        </div>

      </div>
    </div>
  );
}
export default MainHallPage;
