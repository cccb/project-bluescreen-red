
import { IN_TABLE
       , IN_NUC
       , IN_APPLETV
       , IN_FOH

       , useHdmiConnections
       , useHdmiInput
       }
  from 'app/components/hdmi/alpaca';


/**
 * Indicate the connection is present
 */
const ConnectionIndicator = ({connected}) => {
  let status = "";
  if (connected) {
    status = "♥";
  }
  return (
    <span className="hdmi-connection-indicator">
      {status}
    </span>
  );
}


/**
 * ChannelButton renders a button representing a channel
 */
const ChannelButton = ({active, connected, onClick, label}) => {
  let clsClass = "btn btn-lg btn-block btn-channel";
  if (active) {
    clsClass += " btn-success";
  }

  if (!connected) {
    clsClass += " btn-disabled";
  }

  return (
    <button className={clsClass}
            onClick={onClick}>
          {label}
          <ConnectionIndicator connected={connected} />
    </button>
  );
};


/**
 * HdmiInputSelect selects a video source for the presenter.
 */
const HdmiInputSelect = () => {
  const connections       = useHdmiConnections();
  const [input, setInput] = useHdmiInput();

  return (
    <div className="hdmi-channel-input col-md-12">
      <div className="col-xs-6 col-md-12">
        <ChannelButton
          label="Table"
          active={input === IN_TABLE}
          connected={connections[IN_TABLE]}
          onClick={() => setInput(IN_TABLE)} />
      </div>
      <div className="col-xs-6 col-md-12">
        <ChannelButton
          label="Keksdose"
          active={input === IN_NUC}
          connected={connections[IN_NUC]}
          onClick={() => setInput(IN_NUC)} />
      </div>
      <div className="col-xs-6 col-md-12">
        <ChannelButton
          active={input === IN_APPLETV}
          connected={connections[IN_APPLETV]}
          onClick={() => setInput(IN_APPLETV)}
          label="AppleTV" />
      </div>
      <div className="col-xs-6 col-md-12">
        <ChannelButton
          active={input === IN_FOH}
          connected={connections[IN_FOH]}
          onClick={() => setInput(IN_FOH)}
          label="FOH" />
      </div>
    </div>
  );
}

export default HdmiInputSelect;

