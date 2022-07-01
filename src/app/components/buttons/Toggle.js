


const indicatorClass = (state) => {
  if (state == "ON") {
    return "btn-success";
  }
  return "btn-primary";
}

/**
 * Toggle button based on state
 */
const Toggle = ({
  deviceId, labelOn, labelOff, onClick,
}) => {
  const state = "OFF"; // shim
  const btnClass = "btn btn-lg " + indicatorClass(state);
  const label = state === "ON" ? labelOn : labelOff;

  const togglePower = () => {
    console.log("toggle power", deviceId);
  };

  return (
    <button className={btnClass}
            onClick={() => togglePower()}>
       {label}
    </button>
  );
};

export default Toggle;
