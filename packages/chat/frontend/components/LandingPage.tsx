import { useState } from "react";
import type { User } from "../../src/types";

interface LandingPageProps {
  onAuth: (user: User) => void;
}

export function LandingPage({ onAuth }: LandingPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartChatting = () => {
    setIsLoading(true);
    
    // Mock authentication for demo
    const mockUser: User = {
      id: "demo-user-" + Date.now(),
      email: "demo@example.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Simulate authentication delay
    setTimeout(() => {
      onAuth(mockUser);
      setIsLoading(false);
    }, 500);
  };

  const handleLogin = () => {
    // Handle actual login flow
    console.log("Login clicked");
    handleStartChatting(); // For now, use the same flow
  };

  return (
    <div className="landing-page">
      <div className="hero">
        <h1>Welcome to AI Chat Assistant</h1>
        <p>Experience the power of AI-driven conversations</p>
        
        <div className="landing-buttons">
          <button
            className="auth-btn start-chatting-btn"
            onClick={handleStartChatting}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Start Chatting"}
          </button>
          
          <button
            className="auth-btn login-btn"
            onClick={handleLogin}
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>Intelligent Responses</h3>
          <p>Get thoughtful, context-aware answers to your questions</p>
        </div>
        
        <div className="feature">
          <h3>Real-time Collaboration</h3>
          <p>Share conversations and collaborate with others in real-time</p>
        </div>
        
        <div className="feature">
          <h3>Flexible Pricing</h3>
          <p>Choose from free tier or upgrade for unlimited access</p>
        </div>
      </div>
      
      <style jsx>{`
        .landing-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
          padding: 40px;
        }
        
        .hero {
          margin-bottom: 60px;
        }
        
        .hero h1 {
          font-size: 3rem;
          color: #333;
          margin-bottom: 20px;
        }
        
        .hero p {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 40px;
        }
        
        .landing-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        
        .start-chatting-btn {
          padding: 15px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .start-chatting-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        
        .start-chatting-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .login-btn {
          padding: 15px 40px;
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
          border-radius: 10px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .login-btn:hover:not(:disabled) {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }
        
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          max-width: 900px;
          width: 100%;
        }
        
        .feature {
          padding: 30px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .feature h3 {
          color: #667eea;
          margin-bottom: 15px;
        }
        
        .feature p {
          color: #666;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}