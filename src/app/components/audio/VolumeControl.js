
import { useAudioLevel }
  from 'app/components/audio/alpaca';

import VSlider
  from 'app/components/sliders/VSlider';

const VolumeControl = ({title, channel}) => {
  const [level, setLevel] = useAudioLevel(channel);

  return (
    <div className="volume-ctrl box-centered-content">
      <div className="volume-title">
        {title}
      </div>
      <div className="volume-input">
        <VSlider value={level} max={100} min={0}
                 onChange={(v) => setLevel(v)} />
      </div>
      <div className="volume-value">
        {level.toFixed(1)}%
      </div>
    </div>
  );
}

export default VolumeControl;
