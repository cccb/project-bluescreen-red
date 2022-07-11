
import { useState }
  from 'react';


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

/**
 * AudioPanel is the main hall audio control panel
 */
const AudioPanel = () => {
  const [mvLevel, setMvLevel] = useState(23.0);
  // Fake state
  const masterVolumeMute = true;
  const onMasterVolumeChanged = (value) => {
    setMvLevel(value);
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
            level={mvLevel}
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

export default AudioPanel;
