
import { useState, useEffect, useCallback } from 'react'

import { useDaliLightLevels }
  from 'app/components/light/alpaca';

import VSlider
  from 'app/components/sliders/VSlider'


const DaliLevelControl = ({channel, title}) => {
  const [daliLevels, setDaliLevel] = useDaliLightLevels();
  const daliLevel = daliLevels[channel];

  const [level, setLevel] = useState();
  const [active, setActive] = useState(false);

  const importState = useCallback((level) => {
    if (active || level === undefined) {
      return;
    }
    setLevel(level);
  }, [active, setLevel]);

  const exportState = useCallback((level) => {
    if (!active || level === undefined) {
      return;
    }
    setDaliLevel(channel, level)
  }, [channel, active, setDaliLevel]);

  useEffect(() => {
    importState(daliLevel);
  }, [daliLevel, importState]);

  useEffect(() => {
    exportState(level);
  }, [level, exportState]);

  const levelVal = level || 0;
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
        {levelVal.toFixed(1)}%
      </div>
    </div>
  );
}

export default DaliLevelControl;
