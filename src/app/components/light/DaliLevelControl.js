
import { useState, useEffect, useCallback } from 'react'

import { useDaliLightLevels }
  from 'app/components/light/alpaca';

import VSlider
  from 'app/components/sliders/VSlider'


const DaliLevelControl = ({channel, title}) => {
  const [daliLevels, setDaliLevel] = useDaliLightLevels();
  const daliLevel = daliLevels[channel];

  const [level, setLevel] = useState(0);
  const [active, setActive] = useState(false);

  const setChannelLevel = useCallback(
    (v) => setDaliLevel(channel, v),
    [channel, setDaliLevel]
  );

  // Dispatch rate limited dali level update
  useEffect(() => {
    const tref = setTimeout(() => {
      setChannelLevel(level);
    }, 10);
    return () => {
      clearTimeout(tref);
    }
  }, [level, setChannelLevel]);

  // Update from global state on idle
  useEffect(() => {
    if (!active && daliLevel !== undefined) {
      setLevel(daliLevel);
    }
  }, [active, daliLevel, setLevel]);


  return (
    <div className="light-ctrl">
      <div className="light-title">
        {title}
      </div>
      <div className="light-input">
        <VSlider value={level} max={100} min={0}
                 onChange={setLevel}
                 onInteract={setActive} />
      </div>
      <div className="light-value">
        {level.toFixed(1)}%
      </div>
    </div>
  );
}

export default DaliLevelControl;
