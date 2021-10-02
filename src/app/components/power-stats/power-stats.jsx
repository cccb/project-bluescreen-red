
import React from 'react';
import {connect} from 'react-redux'

import Panel from 'components/containers/panel'

const PowerStats = (props) => {
  const {power, current} = props.stat; 

  
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


export default connect(
    (state) => ({
      stat: state.stat,
    })
)(PowerStats);

