
import { MAIN_MASTER_LEVEL
       , MAIN_MUTE_MASTER_TOGGLE
       , MAIN_BACK_LEVEL
       , MAIN_MUTE_BACK_TOGGLE
       , MAIN_BAR_LEVEL
       , MAIN_MUTE_BAR_TOGGLE
       }
  from 'app/components/audio/alpaca';

import Panel
  from 'app/components/panel/Panel';
import AudioChannelControl 
  from 'app/components/audio/AudioChannelControl';
import AudioSourceSelect
  from 'app/components/audio/AudioSourceSelect';


/**
 * Main Audio settings page
 */
const MainAudioPage = () => {
  return (
    <div className="page page-mainaudio">
      <div className="content">
        <div className="col-md-4">
          <Panel title="Volume">
            <div className="row box-centered">
              <div className="col-md-12 box-centered">

                <AudioChannelControl 
                  title="Master Volume"
                  channel={MAIN_MASTER_LEVEL}
                  mute={MAIN_MUTE_MASTER_TOGGLE} />

              </div>
            </div>
          </Panel>
        </div>

        <div className="col-md-8">
          <Panel title="Speaker">
            <div className="row box-centered">
              <div className="col-xs-6 box-centered">
                <AudioChannelControl 
                  title="Back"
                  channel={MAIN_BACK_LEVEL}
                  mute={MAIN_MUTE_BACK_TOGGLE} />
              </div>
              <div className="col-xs-6 box-centered">
                <AudioChannelControl 
                  title="Bar"
                  channel={MAIN_BAR_LEVEL}
                  mute={MAIN_MUTE_BAR_TOGGLE} />
              </div>
            </div>
          </Panel>
        </div>

        <div className="col-md-12 audio-source-h">
          <Panel title="Source">
            <AudioSourceSelect />
          </Panel>
        </div>

      </div>
    </div>
  );
}

export default MainAudioPage;
