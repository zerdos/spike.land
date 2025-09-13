export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { href: "/", label: "Home" },
      { href: "/chat", label: "AI Chat" },
      { href: "/pricing", label: "Pricing" },
      { href: "/dashboard", label: "Dashboard" },
    ],
    company: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
    resources: [
      { href: "/docs", label: "Documentation" },
      { href: "/api", label: "API Reference" },
      { href: "/help", label: "Help Center" },
      { href: "/status", label: "System Status" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/security", label: "Security" },
    ],
  };

  const socialLinks = [
    { href: "https://twitter.com/spike_ai", label: "Twitter", icon: "𝕏" },
    { href: "https://github.com/spike-land", label: "GitHub", icon: "📱" },
    { href: "https://discord.gg/spike-ai", label: "Discord", icon: "💬" },
    { href: "https://linkedin.com/company/spike-ai", label: "LinkedIn", icon: "💼" },
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-brand">
            <div className="brand-logo">
              <span className="logo-icon">🤖</span>
              <span className="logo-text">AI Chat</span>
            </div>
            <p className="brand-description">
              Empowering conversations with advanced AI technology.
              Experience the future of intelligent chat today.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  className="social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            <div className="link-column">
              <h3>Product</h3>
              <ul>
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-column">
              <h3>Company</h3>
              <ul>
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-column">
              <h3>Resources</h3>
              <ul>
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-column">
              <h3>Legal</h3>
              <ul>
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="newsletter-section">
            <h3>Stay Updated</h3>
            <p>Get the latest updates and features delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={(e) => {
              e.preventDefault();
              const email = (e.target as HTMLFormElement).email.value;
              console.log("Newsletter signup:", email);
              alert("Thanks for subscribing! We'll keep you updated.");
            }}>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="email-input"
                />
                <button type="submit" className="subscribe-btn">
                  Subscribe
                </button>
              </div>
            </form>
            <p className="newsletter-disclaimer">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} AI Chat by Spike.land. All rights reserved.
            </p>
            <div className="footer-meta">
              <span className="status-indicator">
                <span className="status-dot"></span>
                All systems operational
              </span>
              <span className="version">v2.1.0</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #1a202c;
          color: #e2e8f0;
          border-top: 1px solid #2d3748;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 60px;
          padding: 60px 0;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          font-weight: 700;
          font-size: 1.5rem;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .brand-description {
          color: #a0aec0;
          line-height: 1.6;
          font-size: 14px;
          margin: 0;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: #2d3748;
          border-radius: 10px;
          color: #a0aec0;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .social-link:hover {
          background: #4a5568;
          color: #e2e8f0;
          transform: translateY(-2px);
        }

        .social-icon {
          font-size: 16px;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .link-column h3 {
          color: white;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .link-column ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .link-column li {
          margin-bottom: 12px;
        }

        .footer-link {
          color: #a0aec0;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: #e2e8f0;
        }

        .newsletter-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .newsletter-section h3 {
          color: white;
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }

        .newsletter-section p {
          color: #a0aec0;
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }

        .newsletter-form {
          margin-top: 8px;
        }

        .input-group {
          display: flex;
          gap: 0;
          border-radius: 8px;
          overflow: hidden;
        }

        .email-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #4a5568;
          background: #2d3748;
          color: #e2e8f0;
          font-size: 14px;
          border-right: none;
          outline: none;
        }

        .email-input:focus {
          border-color: #667eea;
        }

        .email-input::placeholder {
          color: #718096;
        }

        .subscribe-btn {
          padding: 12px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .subscribe-btn:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6b46a4 100%);
        }

        .newsletter-disclaimer {
          font-size: 12px;
          color: #718096;
          margin-top: 8px;
        }

        .footer-bottom {
          border-top: 1px solid #2d3748;
          padding: 24px 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright {
          font-size: 14px;
          color: #a0aec0;
          margin: 0;
        }

        .footer-meta {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #68d391;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #68d391;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .version {
          font-size: 12px;
          color: #718096;
          background: #2d3748;
          padding: 4px 8px;
          border-radius: 4px;
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1.5fr;
            gap: 40px;
          }

          .newsletter-section {
            grid-column: 1 / -1;
            max-width: 400px;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 40px 0;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .footer-bottom-content {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .footer-meta {
            flex-direction: column;
            gap: 12px;
          }

          .social-links {
            justify-content: center;
          }

          .input-group {
            flex-direction: column;
          }

          .email-input {
            border-right: 1px solid #4a5568;
            border-bottom: none;
            border-radius: 8px 8px 0 0;
          }

          .subscribe-btn {
            border-radius: 0 0 8px 8px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }

          .footer-content {
            padding: 32px 0;
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .link-column h3 {
            font-size: 15px;
            margin-bottom: 12px;
          }

          .social-links {
            gap: 12px;
          }

          .social-link {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;