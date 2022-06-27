
import { useState 
       , useEffect
       }
  from 'react';

import { useMqtt, useMqttHandler }
  from 'app/components/mqtt/Provider';


const Page = () => {
  const [msgs, setMsgs]   = useState([]);

  useMqttHandler((topic, msg) => {
    setMsgs([msg.toString(), ...msgs]);
  }, [msgs]);

  
  return (
    <>
      {msgs.map((msg, i) =>
        <p key={i}>
          {msg} 
        </p>)}
    </>    
  );
}


export default Page;

