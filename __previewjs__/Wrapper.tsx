
import React from 'react';
import "packages/code/src/index.css"

export const Wrapper: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => (
  <>
      <div className="wrapped">
        {children}
      </div>
  </>
);