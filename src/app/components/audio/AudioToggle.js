
import { useAudioToggle }
  from 'app/components/audio/alpaca';

import Toggle
  from 'app/components/buttons/Toggle';


const AudioToggle = ({toggle, ...props}) => {
  const [state, setState] = useAudioToggle(toggle);
  return (
    <Toggle onToggle={setState} 
            value={state}
            {...props} />
  );
}

export default AudioToggle;
