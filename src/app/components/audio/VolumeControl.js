
import { useState, useEffect }
  from 'react'

import { useAudioLevel }
  from 'app/components/audio/alpaca';

import VSlider
  from 'app/components/sliders/VSlider';



const VolumeControl = ({title, channel}) => {
  const [level, setLevel] = useAudioLevel(channel);
  const [volume, setVolume] = useState(0);
  const [active, setActive] = useState(false);
  
  // TODO: Maybe generalize
  // Dispatch rate limited setLevel
  useEffect(() => {
    const tref = setTimeout(() => {
      setLevel(volume);
    }, 10);
    return () => {
      clearTimeout(tref);
    }
  }, [volume, setLevel]);

  // Update from global state on idle
  useEffect(() => {
    if (!active && level !== undefined) {
      setVolume(level);
    }
  }, [active, level, setVolume]);


  return (
    <div className="volume-ctrl box-centered-content">
      <div className="volume-title">
        {title}
      </div>
      <div className="volume-input">
        <VSlider value={volume} max={100} min={0}
                 onInteract={setActive}
                 onChange={setVolume} />
      </div>
      <div className="volume-value">
        {volume.toFixed(1)}%
      </div>
    </div>
  );
}

export default VolumeControl;
