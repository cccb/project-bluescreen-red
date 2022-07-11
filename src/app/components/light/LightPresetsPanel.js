
import { useAlpacaDispatch }
  from 'app/components/alpaca/Provider';

import Panel
  from 'app/components/panel/Panel';


import { ID_ENTRY
       , ID_FOH
       , ID_DESK_WALL
       , ID_DESK_BAR
       , setLightValueRequest
       }
  from 'app/components/light/alpaca';


/**
 * LightPresets shows a list of predefined light presets
 */
const LightPresetsPanel = () => {
  const dispatch = useAlpacaDispatch();
  
  // Light Presets
  const setPresetDefault = () => {
    dispatch(setLightValueRequest(ID_ENTRY, 75.3));
    dispatch(setLightValueRequest(ID_FOH,   94.1));
    dispatch(setLightValueRequest(ID_DESK_WALL, 75.3));
    dispatch(setLightValueRequest(ID_DESK_BAR, 94.1));
  }

  const setPresetDark = () => {
    dispatch(setLightValueRequest(ID_ENTRY, 25.0));
    dispatch(setLightValueRequest(ID_FOH,   75.0));
    dispatch(setLightValueRequest(ID_DESK_WALL, 25.0));
    dispatch(setLightValueRequest(ID_DESK_BAR, 75.0));
  }

  const setPresetBright = () => {
    dispatch(setLightValueRequest(ID_ENTRY, 100.0));
    dispatch(setLightValueRequest(ID_FOH,   100.0));
    dispatch(setLightValueRequest(ID_DESK_WALL, 100.0));
    dispatch(setLightValueRequest(ID_DESK_BAR, 100.0));
  }

  const setPresetOff = () => {
    dispatch(setLightValueRequest(ID_ENTRY, 0));
    dispatch(setLightValueRequest(ID_FOH,   0));
    dispatch(setLightValueRequest(ID_DESK_WALL, 0));
    dispatch(setLightValueRequest(ID_DESK_BAR, 0));
  }

  return (
    <Panel title="Presets" className="panel-grey">
      <div className="controls-row row">
        <div className="controls-ctrl col-sm-6 col-md-3">
          <button onClick={(e) => setPresetDefault()}
                  className="btn btn-success btn-block btn-lg">The Usual(TM)</button>
        </div>
        <div className="controls-ctrl col-sm-6 col-md-3">
          <button onClick={(e) => setPresetDark()}
                  className="btn btn-primary btn-block btn-lg">Dark</button>
        </div>
        <div className="controls-ctrl col-sm-6 col-md-3">
          <button onClick={(e) => setPresetBright()}
                  className="btn btn-light btn-block btn-lg">Cleaning Light</button>
        </div>
        <div className="controls-ctrl col-sm-6 col-md-3">
          <button onClick={(e) => setPresetOff()}
                  className="btn btn-danger btn-block btn-lg">Off</button>
        </div>
      </div>
    </Panel>
  );
};

export default LightPresetsPanel;
