
import AudioToggle
  from 'app/components/audio/AudioToggle';

import VolumeControl
  from 'app/components/audio/VolumeControl';


const AudioChannelControl = ({channel, mute, title}) => {
  return (
    <>
      <VolumeControl
        channel={channel}
        title={title} />

      <div className="box-ctrl">
        <AudioToggle 
          toggle={mute}
          activeLabel="Unmute"
          inactiveLabel="Mute" />
      </div>
    </>
  );
}

export default AudioChannelControl;
