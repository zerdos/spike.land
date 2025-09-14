interface SubscriptionStatusProps {
  subscription: {
    tier: string;
    credits: number;
    features: string;
    limit: number;
  };
  onUpgrade: () => void;
}

export function SubscriptionStatus({ subscription, onUpgrade }: SubscriptionStatusProps) {
  const isFreeTier = subscription.tier.toLowerCase() === "free";
  const creditsPercentage = (subscription.credits / subscription.limit) * 100;
  const isLowCredits = subscription.credits <= 2;

  return (
    <div className="subscription-info">
      <div className="subscription-header">
        <span className="subscription-tier">{subscription.tier}</span>
        {isFreeTier && <span className="tier-badge">Free</span>}
      </div>

      <div className="credits-section">
        <div className="credits-label">Credits</div>
        <div className="credits-display">
          <span className="credits-remaining">{subscription.credits}</span>
          <span className="credits-separator">/</span>
          <span className="credit-limit">{subscription.limit}</span>
        </div>

        <div className="credits-bar">
          <div
            className="credits-progress"
            style={{ width: `${creditsPercentage}%` }}
          />
        </div>

        {isLowCredits && (
          <div className="low-credits-warning">
            Low credits remaining
          </div>
        )}
      </div>

      <div className="subscription-features">
        {subscription.features}
      </div>

      {isFreeTier && (
        <button
          className="upgrade-btn"
          onClick={onUpgrade}
        >
          Upgrade to Pro
        </button>
      )}

      {subscription.credits === 0 && (
        <button
          className="buy-credits-btn"
          onClick={onUpgrade}
        >
          Buy Credits
        </button>
      )}

      <style jsx>
        {`
        .subscription-info {
          margin-top: 20px;
          padding: 15px;
          background: #f7f7f9;
          border-radius: 10px;
        }
        
        .subscription-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .subscription-tier {
          font-weight: bold;
          color: #667eea;
          font-size: 16px;
        }
        
        .tier-badge {
          padding: 2px 8px;
          background: #e5e5e7;
          border-radius: 12px;
          font-size: 12px;
          color: #666;
        }
        
        .credits-section {
          margin: 15px 0;
        }
        
        .credits-label {
          font-size: 12px;
          color: #999;
          margin-bottom: 5px;
        }
        
        .credits-display {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 8px;
        }
        
        .credits-remaining {
          font-size: 24px;
          font-weight: bold;
          color: ${isLowCredits ? "#ff4444" : "#333"};
        }
        
        .credits-separator {
          color: #999;
          font-size: 16px;
        }
        
        .credit-limit {
          font-size: 16px;
          color: #666;
        }
        
        .credits-bar {
          width: 100%;
          height: 6px;
          background: #e5e5e7;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .credits-progress {
          height: 100%;
          background: ${isLowCredits ? "#ff4444" : "#667eea"};
          transition: width 0.3s ease;
        }
        
        .low-credits-warning {
          margin-top: 8px;
          padding: 6px 10px;
          background: #fff5f5;
          border: 1px solid #ffdddd;
          border-radius: 6px;
          color: #ff4444;
          font-size: 12px;
          text-align: center;
        }
        
        .subscription-features {
          font-size: 12px;
          color: #666;
          margin: 10px 0;
          line-height: 1.4;
        }
        
        .upgrade-btn, .buy-credits-btn {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: transform 0.2s;
        }
        
        .upgrade-btn:hover, .buy-credits-btn:hover {
          transform: translateY(-2px);
        }
        
        .buy-credits-btn {
          background: #ff4444;
        }
      `}
      </style>
    </div>
  );
}
