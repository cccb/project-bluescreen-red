
import LightPresetsPanel
  from 'app/components/light/LightPresetsPanel';
import PowerStatsPanel
  from 'app/components/power-stats/PowerStatsPanel';
import AudioMasterPanel
  from 'app/components/audio/AudioMasterPanel';
import HdmiMasterPanel 
  from 'app/components/hdmi/HdmiMasterPanel';


/**
 * The MainHall Page provides an interface for controlling
 * lights and audio in the main hall.
 */
const MainHallPage = () => {
  return (
    <div className="page page-mainhall">
      <div className="content">
        <div className="col-md-8">
          <AudioMasterPanel />
        </div>
        <div className="col-md-4">
          <HdmiMasterPanel />
        </div>
        <div className="col-md-8">
          <LightPresetsPanel title="Light Presets" />
        </div>
        <div className="col-md-4">
          <PowerStatsPanel />
        </div>
      </div>
    </div>
  );
}
export default MainHallPage;
