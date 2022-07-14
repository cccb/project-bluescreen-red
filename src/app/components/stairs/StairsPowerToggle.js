
import { useTreppePowerState }
  from 'app/components/stairs/alpaca';

import Toggle
  from 'app/components/buttons/Toggle';


const StairsPowerToggle = () => {
  const [state, setState] = useTreppePowerState();
  return (
    <Toggle
      value={state}
      onToggle={(s) => setState(s)}
      className="btn-lg btn-block"
      activeLabel="Power Off"
      activeClass="btn-success"
      inactiveLabel="Power On"
      inactiveClass="btn-warning" />
  );
}

export default StairsPowerToggle;

