"use client";

import { useState } from "react";
import { Footer } from "../../components/layout/footer";
import { Header } from "../../components/layout/header";
import { api } from "../../lib/api";

interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  credits: number;
  highlighted?: boolean;
  buttonText: string;
  popular?: boolean;
}

export function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const pricingTiers: PricingTier[] = [
    {
      id: "free",
      name: "Free",
      price: 0,
      period: "forever",
      description: "Perfect for trying out AI chat",
      credits: 10,
      features: [
        "10 messages per day",
        "Basic AI models",
        "Community support",
        "Standard response time",
        "Web access only",
      ],
      buttonText: "Get Started",
    },
    {
      id: "pro",
      name: "Pro",
      price: billingPeriod === "monthly" ? 19 : 190,
      period: billingPeriod === "monthly" ? "month" : "year",
      description: "Ideal for professionals and power users",
      credits: 1000,
      features: [
        "1,000 messages per month",
        "Advanced AI models",
        "Priority support",
        "Faster response time",
        "API access",
        "Conversation export",
        "Custom model parameters",
      ],
      highlighted: true,
      popular: true,
      buttonText: "Start Free Trial",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: billingPeriod === "monthly" ? 99 : 990,
      period: billingPeriod === "monthly" ? "month" : "year",
      description: "For teams and organizations",
      credits: 10000,
      features: [
        "10,000 messages per month",
        "All AI models",
        "24/7 dedicated support",
        "Fastest response time",
        "Full API access",
        "Advanced analytics",
        "Team management",
        "Custom integrations",
        "SLA guarantee",
      ],
      buttonText: "Contact Sales",
    },
  ];

  const handleSubscribe = async (tierId: string) => {
    if (tierId === "free") {
      window.location.href = "/chat";
      return;
    }

    if (tierId === "enterprise") {
      window.location.href = "mailto:sales@spike.land?subject=Enterprise Plan Inquiry";
      return;
    }

    setIsLoading(tierId);

    try {
      const response = await api.createCheckoutSession(tierId);
      if (response.url) {
        window.location.href = response.url;
      } else {
        // Fallback to demo checkout
        window.location.href = "https://checkout.stripe.com/demo";
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      // Fallback to demo checkout
      window.location.href = "https://checkout.stripe.com/demo";
    } finally {
      setIsLoading(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getSavings = (tier: PricingTier) => {
    if (billingPeriod === "yearly" && tier.price > 0) {
      const monthlyTotal = (tier.price / 10) * 12; // Approximate monthly price
      const yearlySavings = monthlyTotal - tier.price;
      return Math.round((yearlySavings / monthlyTotal) * 100);
    }
    return 0;
  };

  return (
    <div className="pricing-page">
      <Header />

      <main className="pricing-main">
        <div className="container">
          {/* Hero Section */}
          <section className="pricing-hero">
            <h1>Choose Your Plan</h1>
            <p>
              Select the perfect plan for your AI chat needs. Start free and upgrade anytime.
            </p>

            {/* Billing Toggle */}
            <div className="billing-toggle">
              <span className={billingPeriod === "monthly" ? "active" : ""}>
                Monthly
              </span>
              <button
                className="toggle-switch"
                onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
                aria-label="Toggle billing period"
              >
                <span className="toggle-slider" />
              </button>
              <span className={billingPeriod === "yearly" ? "active" : ""}>
                Yearly
                <span className="savings-badge">Save 20%</span>
              </span>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="pricing-cards">
            <div className="cards-grid">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`pricing-card ${tier.highlighted ? "highlighted" : ""}`}
                >
                  {tier.popular && <div className="popular-badge">Most Popular</div>}

                  <div className="card-header">
                    <h3>{tier.name}</h3>
                    <div className="price">
                      <span className="price-amount">{formatPrice(tier.price)}</span>
                      <span className="price-period">/{tier.period}</span>
                    </div>
                    {getSavings(tier) > 0 && (
                      <div className="savings">
                        Save {getSavings(tier)}% yearly
                      </div>
                    )}
                    <p className="description">{tier.description}</p>
                  </div>

                  <div className="card-features">
                    <div className="credits-info">
                      <strong>{tier.credits.toLocaleString()} credits</strong>
                      <span>per {tier.period}</span>
                    </div>

                    <ul className="features-list">
                      {tier.features.map((feature, index) => (
                        <li key={index}>
                          <span className="feature-check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-footer">
                    <button
                      className={`btn ${
                        tier.highlighted ? "btn-primary" : "btn-secondary"
                      } pricing-btn`}
                      onClick={() => handleSubscribe(tier.id)}
                      disabled={isLoading === tier.id}
                    >
                      {isLoading === tier.id
                        ? (
                          <>
                            <span className="spinner" />
                            Loading...
                          </>
                        )
                        : (
                          tier.buttonText
                        )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>What are credits?</h3>
                <p>
                  Credits are used for each message you send to the AI. Different models may consume
                  different amounts of credits based on their complexity and capabilities.
                </p>
              </div>

              <div className="faq-item">
                <h3>Can I change my plan anytime?</h3>
                <p>
                  Yes! You can upgrade or downgrade your plan at any time. Changes will be prorated
                  and reflected in your next billing cycle.
                </p>
              </div>

              <div className="faq-item">
                <h3>Is there a free trial?</h3>
                <p>
                  All paid plans come with a 7-day free trial. You can cancel anytime during the
                  trial period without being charged.
                </p>
              </div>

              <div className="faq-item">
                <h3>What AI models are available?</h3>
                <p>
                  We offer various models including GPT-4, Claude, Llama, and more. Higher tier
                  plans get access to more advanced and specialized models.
                </p>
              </div>

              <div className="faq-item">
                <h3>Do unused credits roll over?</h3>
                <p>
                  Pro plan credits expire monthly, but Enterprise plan credits can roll over for up
                  to 3 months. Free tier credits reset daily.
                </p>
              </div>

              <div className="faq-item">
                <h3>Is my data secure?</h3>
                <p>
                  Yes! All conversations are encrypted in transit and at rest. We never share your
                  data with third parties and you can delete your data at any time.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-content">
              <h2>Ready to get started?</h2>
              <p>Join thousands of users already using AI chat to boost their productivity</p>
              <div className="cta-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => handleSubscribe("pro")}
                >
                  Start Free Trial
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => window.location.href = "/chat"}
                >
                  Try Free Plan
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      <style jsx>
        {`
        .pricing-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        .pricing-main {
          padding-top: 80px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .pricing-hero {
          text-align: center;
          padding: 80px 0 60px;
        }

        .pricing-hero h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 16px;
        }

        .pricing-hero p {
          font-size: 1.25rem;
          color: #4a5568;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .billing-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 40px;
        }

        .billing-toggle span {
          font-size: 16px;
          font-weight: 600;
          color: #4a5568;
          transition: color 0.2s ease;
        }

        .billing-toggle span.active {
          color: #667eea;
        }

        .toggle-switch {
          position: relative;
          width: 60px;
          height: 30px;
          background: #e2e8f0;
          border-radius: 15px;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .toggle-switch:hover {
          background: #cbd5e0;
        }

        .toggle-slider {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 50%;
          transition: transform 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .toggle-switch:not(:checked) .toggle-slider {
          transform: translateX(30px);
        }

        .savings-badge {
          font-size: 12px;
          background: #48bb78;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 8px;
        }

        .pricing-cards {
          padding: 0 0 80px;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .pricing-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          position: relative;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 2px solid transparent;
        }

        .pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .pricing-card.highlighted {
          border-color: #667eea;
          transform: scale(1.05);
        }

        .pricing-card.highlighted:hover {
          transform: scale(1.05) translateY(-4px);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 24px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .card-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .card-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .price {
          margin-bottom: 8px;
        }

        .price-amount {
          font-size: 3rem;
          font-weight: 700;
          color: #2d3748;
        }

        .price-period {
          font-size: 1rem;
          color: #4a5568;
        }

        .savings {
          font-size: 14px;
          color: #48bb78;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .description {
          color: #4a5568;
          margin: 0;
        }

        .card-features {
          margin-bottom: 32px;
        }

        .credits-info {
          background: #f7fafc;
          padding: 16px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 24px;
        }

        .credits-info strong {
          font-size: 1.25rem;
          color: #2d3748;
          display: block;
        }

        .credits-info span {
          font-size: 14px;
          color: #4a5568;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          color: #4a5568;
        }

        .feature-check {
          color: #48bb78;
          font-weight: 700;
          font-size: 16px;
        }

        .card-footer {
          text-align: center;
        }

        .btn {
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 180px;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .btn-secondary {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        .pricing-btn {
          width: 100%;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .faq-section {
          padding: 80px 0;
          border-top: 1px solid #e2e8f0;
        }

        .faq-section h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 60px;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }

        .faq-item {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .faq-item h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 12px;
        }

        .faq-item p {
          color: #4a5568;
          line-height: 1.6;
          margin: 0;
        }

        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          text-align: center;
          color: white;
          margin-bottom: 80px;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-content p {
          font-size: 1.25rem;
          margin-bottom: 32px;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-section .btn-primary {
          background: white;
          color: #667eea;
        }

        .cta-section .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
        }

        .cta-section .btn-secondary {
          background: transparent;
          color: white;
          border-color: white;
        }

        .cta-section .btn-secondary:hover:not(:disabled) {
          background: white;
          color: #667eea;
        }

        @media (max-width: 768px) {
          .pricing-hero h1 {
            font-size: 2.5rem;
          }

          .cards-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .pricing-card.highlighted {
            transform: none;
          }

          .pricing-card.highlighted:hover {
            transform: translateY(-4px);
          }

          .faq-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}
      </style>
    </div>
  );
}

export default PricingPage;
