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
    <footer className="bg-gray-900 text-gray-200 border-t border-gray-800">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 lg:gap-15 py-15">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-white font-bold text-2xl">
              <span className="text-3xl">🤖</span>
              <span>AI Chat</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm m-0">
              Empowering conversations with advanced AI technology. Experience the future of
              intelligent chat today.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-[10px] text-gray-400 no-underline transition-all duration-200 hover:bg-gray-700 hover:text-gray-200 hover:-translate-y-0.5"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-base">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            <div>
              <h3 className="text-white text-base font-semibold mb-4">Product</h3>
              <ul className="list-none m-0 p-0">
                {footerLinks.product.map((link) => (
                  <li key={link.href} className="mb-3">
                    <a href={link.href} className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-gray-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-base font-semibold mb-4">Company</h3>
              <ul className="list-none m-0 p-0">
                {footerLinks.company.map((link) => (
                  <li key={link.href} className="mb-3">
                    <a href={link.href} className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-gray-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-base font-semibold mb-4">Resources</h3>
              <ul className="list-none m-0 p-0">
                {footerLinks.resources.map((link) => (
                  <li key={link.href} className="mb-3">
                    <a href={link.href} className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-gray-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-base font-semibold mb-4">Legal</h3>
              <ul className="list-none m-0 p-0">
                {footerLinks.legal.map((link) => (
                  <li key={link.href} className="mb-3">
                    <a href={link.href} className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-gray-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-1 max-w-[400px] mx-auto lg:mx-0 lg:max-w-full">
            <h3 className="text-white text-base font-semibold m-0">Stay Updated</h3>
            <p className="text-gray-400 text-sm leading-normal m-0">Get the latest updates and features delivered to your inbox.</p>
            <form
              className="mt-2"
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.target as HTMLFormElement).email.value;
                console.log("Newsletter signup:", email);
                alert("Thanks for subscribing! We'll keep you updated.");
              }}
            >
              <div className="flex md:flex-row flex-col rounded-lg overflow-hidden">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 border border-gray-700 md:border-r-0 bg-gray-800 text-gray-200 text-sm outline-none focus:border-[#667eea] placeholder:text-gray-600 md:rounded-l-lg rounded-t-lg md:rounded-tr-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-none text-sm font-semibold cursor-pointer transition-all duration-200 hover:from-[#5a6fd8] hover:to-[#6b46a4] md:rounded-r-lg rounded-b-lg md:rounded-bl-none"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500 mt-2 m-0">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm text-gray-400 m-0">
              © {currentYear} AI Chat by Spike.land. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
              <span className="flex items-center gap-2 text-xs text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                All systems operational
              </span>
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">v2.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
