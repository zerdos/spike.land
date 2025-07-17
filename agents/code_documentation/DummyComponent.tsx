import React from "react";

interface DummyComponentProps {
  message: string;
}

const DummyComponent: React.FC<DummyComponentProps> = ({ message }) => {
  return (
    <div>
      <h1>Hello from Dummy Component!</h1>
      <p>{message}</p>
    </div>
  );
};

export default DummyComponent;
