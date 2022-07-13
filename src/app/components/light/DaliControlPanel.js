
import { ID_FOH
       , ID_ENTRY
       , ID_DESK_WALL
       , ID_DESK_BAR
       }
  from 'app/components/light/alpaca';

import Panel
  from 'app/components/panel/Panel';

import DaliLevelControl
  from 'app/components/light/DaliLevelControl'


const DaliControlPanel = () => {
  return (
    <Panel title="Dali Control">
      <div className="grid">
        <DaliLevelControl
          title="Entry"
          channel={ID_ENTRY} />
        <DaliLevelControl
          title="FOH"  
          channel={ID_FOH} />
        <DaliLevelControl
          title="Wall"
          channel={ID_DESK_WALL} />
        <DaliLevelControl
          title="Bar"
          channel={ID_DESK_BAR} />
      </div>
    </Panel>
  );
}

export default DaliControlPanel;
