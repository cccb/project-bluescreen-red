
import { useMqttReducer }
  from 'app/components/mqtt/Provider';
import Panel
  from 'app/components/panel/Panel';


// Actions
const REALTIMEPOWER_UPDATE = "stat/powermeter/realtimepower";

// State
const initialState = {
  power: {
    total: { value: 0, unit: "kWs" },
    l1:    { value: 0, unit: "kWs" },
    l2:    { value: 0, unit: "kWs" },
    l3:    { value: 0, unit: "kWs" },
  },
  current: {
      total: { value: 0, unit: "A" },
      l1:    { value: 0, unit: "A" },
      l2:    { value: 0, unit: "A" },
      l3:    { value: 0, unit: "A" },
  },
};

const decodeRealtimePower = (stat) => {
  const totalCurrent = parseFloat(stat.channel0.current) +
        parseFloat(stat.channel1.current) +
        parseFloat(stat.channel2.current);
  return {
      power: {
          total: {
              value: parseFloat(stat.all.power), 
              unit: stat.all.PowerUnit
          },
          l1: {
              value: parseFloat(stat.channel0.power), 
              unit: stat.PowerUnit
          },
          l2: {
              value: parseFloat(stat.channel1.power), 
              unit: stat.PowerUnit
          },
          l3: {
              value: parseFloat(stat.channel2.power), 
              unit: stat.PowerUnit
          },
      },
      current: {
          total: {
              value: parseFloat(totalCurrent), 
              unit: stat.CurrentUnit
          },
          l1: {
              value: parseFloat(stat.channel0.current), 
              unit: stat.CurrentUnit
          },
          l2: {
              value: parseFloat(stat.channel1.current), 
              unit: stat.CurrentUnit
          },
          l3: {
              value: parseFloat(stat.channel2.current), 
              unit: stat.CurrentUnit
          },
      },
  };
}

const reducer = (state, action) => {
  if (action.type === REALTIMEPOWER_UPDATE) {
    return decodeRealtimePower(action.payload);
  };
  return state;
};


/**
 * PowerStats shows statistics about the current
 * power consumption
 */
const PowerStatsPanel = () => {
  const [{power, current}] = useMqttReducer(reducer, initialState);

  return (
    <Panel title="Power">
      <p style={{color: "#ffffff"}}>Verbrauch momentant:</p>
      <table className="table">
       <thead>
        <tr>
            <th style={{fontWeight: "bold", color: "#ffffff"}}>Gesamt</th>
            <th>L1</th>
            <th>L2</th>
            <th>L3</th>
        </tr>
       </thead>
       <tbody>
        <tr>
            <td style={{fontWeight: "bold", color: "#ffffff"}}>{power.total.value.toFixed(3)} {power.total.unit}</td>
            <td>{power.l1.value.toFixed(3)} {power.l1.unit}</td>
            <td>{power.l2.value.toFixed(3)} {power.l2.unit}</td>
            <td>{power.l3.value.toFixed(3)} {power.l3.unit}</td>
        </tr>
        <tr>
            <td style={{fontWeight: "bold", color: "#ffffff"}}></td>
            <td>{current.l1.value.toFixed(3)} {current.l1.unit}</td>
            <td>{current.l2.value.toFixed(3)} {current.l2.unit}</td>
            <td>{current.l3.value.toFixed(3)} {current.l3.unit}</td>
        </tr>
       </tbody>
      </table>
    </Panel>
  );
}

export default PowerStatsPanel;

