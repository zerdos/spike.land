import React, { useState } from 'react';

import { css } from 'emotion'

const color = 'white'


export const CounterButton: React.FC<{ label: string }> = ({ label }) => {

  const [counter, changecounter] = useState(0);

  return <div>
    <div
      className={css`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    &:hover {
      color: ${color};
    }
  `}
    >
      Hover to change color.
</div>

    <button onClick={() => changecounter(counter + 1)}> {label} {counter}</button>
      </div>;
}
