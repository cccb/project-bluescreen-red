

import { useDaliLightLevels }
  from 'app/components/light/alpaca';

import VSlider
  from 'app/components/sliders/VSlider'


const DaliLevelControl = ({channel, title}) => {
  const [levels, setLevel] = useDaliLightLevels();
  let level = levels[channel];
  if (!level) {
    level = 0;
  }

  return (
    <div className="light-ctrl">
      <div className="light-title">
        {title}
      </div>
      <div className="light-input">
        <VSlider value={level} max={100} min={0}
                 onChange={(v) => setLevel(channel, v)} />
      </div>
      <div className="light-value">
        {level.toFixed(1)}%
      </div>
    </div>
  );
}

export default DaliLevelControl;
