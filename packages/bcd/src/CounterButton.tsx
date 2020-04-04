import React, { useState } from 'react';


export const CounterButton: React.FC<{label: string}> = ({label}) => {



  const [counter, changecounter] = useState(0);
  
  return <>
    <button onClick={()=>changecounter(counter+1)}> {label} {counter}</button>
  </>;
}
