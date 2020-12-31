export const starter = `import { useState } from 'react';
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';

const Hello = () => {
  const [name, setName] = useState('yellowgreen');

  return (
    <div css={\`color:\${name}\`}>
      <h1>Hello World!</h1>
      <label>
        Add a color:
        <input
          css={\`margin: 12px\`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </div>
  );
};

export default () => (
  <>
    <Global
      styles={css\`
      #zbody{
        background: b
          margin: 0;
          overflow: overlay;
        }  
    \`}
    />
    <Hello />
  </>
);`;
