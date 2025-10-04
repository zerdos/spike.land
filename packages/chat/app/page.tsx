"use client";

import { useEffect, useState } from "react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartChatting = () => {
    window.location.href = "/signin";
  };

  const handleLogin = () => {
    window.location.href = "/signin";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <Header isScrolled={isScrolled} />

      <main className="pt-20">
        <section className="grid md:grid-cols-2 gap-15 md:gap-[60px] items-center min-h-[calc(100vh-160px)] px-5 md:px-10 py-10 md:py-20 max-w-[1200px] mx-auto text-center md:text-left">
          <div className="max-w-[500px] mx-auto md:mx-0">
            <h1 className="text-5xl md:text-[3.5rem] font-bold text-gray-800 mb-6 leading-tight">
              Welcome to AI Chat Assistant
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Experience the power of AI-driven conversations with state-of-the-art language models
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button
                className="px-8 py-4 rounded-xl text-base font-semibold border-none cursor-pointer transition-all duration-200 flex items-center gap-2 min-w-[140px] justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-[0_4px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.6)] disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleStartChatting}
                aria-label="Start a new chat session"
              >
                Start Chatting
              </button>

              <button
                className="px-8 py-4 rounded-xl text-base font-semibold border-2 border-[#667eea] cursor-pointer transition-all duration-200 flex items-center gap-2 min-w-[140px] justify-center bg-white text-[#667eea] shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:bg-[#667eea] hover:text-white hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleLogin}
                aria-label="Login to your account"
              >
                Login
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="bg-white rounded-[20px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] w-full max-w-[400px] animate-[fadeInUp_0.8s_ease]">
              <div className="px-4 py-3 rounded-2xl mb-3 bg-[#667eea] text-white ml-10 rounded-br-[4px]">
                How can AI help me today?
              </div>
              <div className="px-4 py-3 rounded-2xl mb-3 bg-gray-50 text-gray-800 mr-10 rounded-bl-[4px]">
                I&apos;m here to help with coding, writing, analysis, and more!
              </div>
            </div>
          </div>
        </section>

        <section className="py-[100px] px-10 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-center text-[2.5rem] font-bold text-gray-800 mb-15">Why Choose Our AI Chat?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))" }}>
              <div className="p-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                <div className="text-5xl mb-4">🧠</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Intelligent Responses</h3>
                <p className="text-gray-600 leading-relaxed">Get thoughtful, context-aware answers powered by advanced language models</p>
              </div>

              <div className="p-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Real-time Chat</h3>
                <p className="text-gray-600 leading-relaxed">Experience lightning-fast responses with live collaboration features</p>
              </div>

              <div className="p-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                <div className="text-5xl mb-4">💎</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Flexible Pricing</h3>
                <p className="text-gray-600 leading-relaxed">Start free and upgrade for unlimited access with premium features</p>
              </div>

              <div className="p-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Secure & Private</h3>
                <p className="text-gray-600 leading-relaxed">Your conversations are encrypted and protected with enterprise-grade security</p>
              </div>

              <div className="p-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cross-Platform</h3>
                <p className="text-gray-600 leading-relaxed">Access your chats from any device with our responsive design</p>
              </div>

              <div className="p-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Specialized Models</h3>
                <p className="text-gray-600 leading-relaxed">Choose from different AI models optimized for various tasks</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-[100px] px-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white text-center">
          <div className="max-w-[1200px] mx-auto">
            <div>
              <h2 className="text-[2.5rem] font-bold mb-4">Ready to Start Your AI Journey?</h2>
              <p className="text-xl mb-8 opacity-90">Join thousands of users already experiencing the future of AI chat</p>
              <button
                className="px-9 py-[18px] rounded-xl text-lg font-semibold border-none cursor-pointer transition-all duration-200 flex items-center gap-2 min-w-[140px] justify-center mx-auto bg-white text-[#667eea] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleStartChatting}
              >
                Get Started Free
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
