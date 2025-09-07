import { useEffect, useState } from "react";

interface ConnectionStatusProps {
  isConnected: boolean;
}

export function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
  const [showReconnecting, setShowReconnecting] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  useEffect(() => {
    if (!isConnected && reconnectAttempts < 3) {
      setShowReconnecting(true);
      const timer = setTimeout(() => {
        setReconnectAttempts(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (isConnected) {
      setShowReconnecting(false);
      setReconnectAttempts(0);
    }
  }, [isConnected, reconnectAttempts]);

  return (
    <div className={`connection-status ${isConnected ? "connected" : "disconnected"}`}>
      <div className="status-indicator">
        <span className="status-dot" />
        <span className="status-text">
          {isConnected ? "Connected" : showReconnecting ? "Reconnecting..." : "Disconnected"}
        </span>
      </div>
      
      {showReconnecting && (
        <div className="reconnect-info">
          Attempt {reconnectAttempts + 1} of 3
        </div>
      )}
      
      {!isConnected && reconnectAttempts >= 3 && (
        <button 
          className="reconnect-btn"
          onClick={() => {
            setReconnectAttempts(0);
            // Trigger reconnection logic
            window.location.reload();
          }}
        >
          Reconnect
        </button>
      )}
      
      <style jsx>{`
        .connection-status {
          margin-top: 15px;
          padding: 10px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e5e5e7;
        }
        
        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        .connected .status-dot {
          background: #4ade80;
        }
        
        .disconnected .status-dot {
          background: #ff4444;
          animation: none;
        }
        
        .status-text {
          font-size: 14px;
          color: #666;
        }
        
        .connected .status-text {
          color: #4ade80;
        }
        
        .disconnected .status-text {
          color: #ff4444;
        }
        
        .reconnect-info {
          margin-top: 8px;
          font-size: 12px;
          color: #999;
        }
        
        .reconnect-btn {
          width: 100%;
          padding: 8px;
          margin-top: 10px;
          background: white;
          color: #667eea;
          border: 1px solid #667eea;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s;
        }
        
        .reconnect-btn:hover {
          background: #667eea;
          color: white;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(74, 222, 128, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
          }
        }
      `}</style>
    </div>
  );
}