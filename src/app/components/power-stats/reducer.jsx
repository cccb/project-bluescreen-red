
import { STAT_REALTIMEPOWER_UPDATE } from './actions';

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
              unit: stat.CurrentrUnit
          },
      },
  };
}

export default (state=initialState, action) => {
  if (action.type == STAT_REALTIMEPOWER_UPDATE) {
    return decodeRealtimePower(action.payload);
  };
  return state;
};

