
import { useAudioSource
       , MAIN_SOURCE_DESK
       , MAIN_SOURCE_HDMI
       , MAIN_SOURCE_SONIC
       , MAIN_SOURCE_FOH
       }
  from 'app/components/audio/alpaca';

const SourceButton = ({active, onClick, children}) => {
    let btnClass = "btn btn-lg"
    if (active) {
      btnClass += " btn-success"
    }
    return (
      <button
        onClick={onClick}
        className={btnClass}>{children}</button>
    );
}


/**
 * AudioSourceSelect provides the interface for selecting
 * an audio source on the soundweb audio matrix
 */
const AudioSourceSelect = () => {
  const [source, select] = useAudioSource(); 

  return (
    <div className="panel panel-grey panel-input-sources row">
       <div className="audio-selector col-sm-6 col-md-3">
          <SourceButton 
            active={source === MAIN_SOURCE_DESK}
            onClick={() => select(MAIN_SOURCE_DESK)}>
              Table AUX
          </SourceButton>
       </div>

       <div className="audio-selector col-sm-6 col-md-3">
          <SourceButton
            active={source === MAIN_SOURCE_HDMI}
            onClick={() => select(MAIN_SOURCE_HDMI)}>
              HDMI / Projector
          </SourceButton>
       </div>

       <div className="audio-selector col-sm-6 col-md-3">
          <SourceButton 
            active={source === MAIN_SOURCE_SONIC}
            onClick={() => select(MAIN_SOURCE_SONIC)}>
              Sonic
          </SourceButton>
       </div>

       <div className="audio-selector col-sm-6 col-md-3">
          <SourceButton 
            active={source === MAIN_SOURCE_FOH}
            onClick={() => select(MAIN_SOURCE_FOH)}>
              VOC Mixer
          </SourceButton>
       </div>
    </div>
  );
}

export default AudioSourceSelect;
