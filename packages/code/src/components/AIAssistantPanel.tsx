import React from 'react';
import ChatInterface from '../ChatInterface';

const AIAssistantPanel: React.FC = () => {
  return (
    <div className="ai-assistant-panel">
      <h2>AI Assistant</h2>
      <ChatInterface />
    </div>
  );
};

export default AIAssistantPanel;
