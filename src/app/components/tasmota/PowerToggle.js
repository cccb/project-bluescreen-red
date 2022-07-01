

/**
 * PowerToggle is a button which reads a tasmota state
 * for a given device ID and toggles the On / Off state
 */
const PowerToggle = ({deviceId, labelOn, labelOff}) => {

  const togglePower = () => {
    console.log("toggle power", deviceId);
  };

  return (
      <>PowerToggle</>
  )
}

export default PowerToggle;

