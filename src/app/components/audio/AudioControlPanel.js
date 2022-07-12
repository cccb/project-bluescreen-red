
import { MAIN_MASTER_LEVEL
       , MAIN_MUTE_MASTER_TOGGLE
       }
  from 'app/components/audio/alpaca';

import Panel
  from 'app/components/panel/Panel';
import PowerToggle 
  from 'app/components/tasmota/PowerToggle';
import VolumeControl
  from 'app/components/audio/VolumeControl';
import AudioToggle
  from 'app/components/audio/AudioToggle';
import AudioSourceSelect
  from 'app/components/audio/AudioSourceSelect'; 

/**
 * AudioPanel is the main hall audio control panel
 */
const AudioControlPanel = () => {
  return (
    <Panel title="Audio">
      <div className="row">
        <div className="col-xs-4 box-centered">
          <VolumeControl
            channel={MAIN_MASTER_LEVEL}
            title="Master Volume" />

          <div className="box-ctrl">
            <AudioToggle 
              toggle={MAIN_MUTE_MASTER_TOGGLE}
              activeLabel="Unmute"
              inactiveLabel="Mute" />
          </div>
        </div>

        <div className="col-xs-8">
          <div className="panel panel-grey panel-input-sources row">
           <div className="audio-selector col-sm-6 col-md-3">
             <PowerToggle deviceId="power-music" />
           </div>
          </div>
          <AudioSourceSelect />
        </div>
      </div>
    </Panel>
  );
};

export default AudioControlPanel;
