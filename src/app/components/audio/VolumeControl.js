
import { useState, useEffect, useCallback }
  from 'react'

import { useAudioLevel }
  from 'app/components/audio/alpaca';

import VSlider
  from 'app/components/sliders/VSlider';



const VolumeControl = ({title, channel}) => {
  const [level, setLevel] = useAudioLevel(channel);
  const [active, setActive] = useState(false);
  const [volume, setVolume] = useState();
  
  const importState = useCallback((level) => {
    if (active || level === undefined) {
      return;
    }
    setVolume(level);
  }, [active, setVolume]);

  const exportState = useCallback((level) => {
    if (!active || level === undefined) {
      return;
    }
    setLevel(level);
  }, [active, setLevel]);

  // Dispatch rate limited setLevel
  useEffect(() => {
    const tref = setTimeout(() => {
      exportState(volume);
    }, 10);
    return () => {
      clearTimeout(tref);
    }
  }, [volume, exportState]);

  // Update from global state on idle
  useEffect(() => {
    importState(level);
  }, [level, importState]);

  const volumeVal = volume || 0;
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
        {volumeVal.toFixed(1)}%
      </div>
    </div>
  );
}

export default VolumeControl;
