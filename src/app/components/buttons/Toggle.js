
import { useCallback }
  from 'react';


/**
 * Toggle is a button rendering two different
 * states: active and inactive, on click the
 * onToggle callback will be invoked.
 */
const Toggle = ({
  onToggle,
  value,
  activeLabel,
  inactiveLabel=activeLabel,
  inactiveClass="btn-warning",
  activeClass="btn-success",
  className="",
}) => {
  const onClick = useCallback(() => {
    if (value) {
      onToggle(false);
    } else {
      onToggle(true);
    }
  }, [onToggle, value]);

  let btnClass = `btn btn-lg ${className}`;
  let label = inactiveLabel;

  if (value) {
    label = activeLabel;
    btnClass += " " + activeClass;
  } else {
    btnClass += " " + inactiveClass;
  }

  return (
    <button className={btnClass}
            onClick={onClick}>
      {label}
    </button>
  );
}

export default Toggle;
