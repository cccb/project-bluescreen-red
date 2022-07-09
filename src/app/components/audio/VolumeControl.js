
import VSlider
  from 'app/components/sliders/VSlider';

const VolumeControl = ({title, level, onChange}) => {
  return (
    <div className="volume-ctrl box-centered-content">
      <div className="volume-title">
        {title}
      </div>
      <div className="volume-input">
        <VSlider value={level} max={100} min={0}
                 onChange={onChange} />
      </div>
      <div className="volume-value">
        {level.toFixed(1)}%
      </div>
    </div>
  );
}

export default VolumeControl;
