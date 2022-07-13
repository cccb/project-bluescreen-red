
import DaliControlPanel
  from 'app/components/light/DaliControlPanel';
import LightPresetsPanel
  from 'app/components/light/LightPresetsPanel';

const LightPage = () => {
  return (
    <div className="page page-lights noselect row">
      <div className="col-md-12">
        <DaliControlPanel />
      </div>

      <div className="col-md-12">
        <LightPresetsPanel />
      </div>

    </div>
  );
};

export default LightPage;
