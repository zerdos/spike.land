import React from 'react';

interface AIAssistantButtonProps {
  onClick: () => void;
}

const AIAssistantButton: React.FC<AIAssistantButtonProps> = ({ onClick }) => {
  return (
    <button className="ai-assistant-button" onClick={onClick}>
      AI Assistant
    </button>
  );
};

export default AIAssistantButton;
