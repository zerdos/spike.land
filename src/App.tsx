import React from 'react';


export const App: React.FC<{name: string}> = ({name}) => {
  return <>
    <h1>Hello {name}</h1>
  </>;
}
