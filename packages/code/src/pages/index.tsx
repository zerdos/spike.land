// shadTod.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Zap, Bot, Share2, Package, Download } from "lucide-react";
import { css } from "@emotion/react";

const Feature = ({ icon: Icon, title, description, color }) => (
  <div
    css={css`
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translate3d(0, 20%, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.5s ease-out;
      }
    `}>
    <Card className="hover:shadow-md transition-all duration-300 border border-gray-200">
      <CardContent className="p-6 flex flex-col items-center text-center group">
        <Icon
          className={`w-12 h-12 mb-4 ${color} group-hover:scale-110 transition-transform duration-300`}
          aria-label={title}
        />
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  </div>
);

const LandingPage = () => {
  const features = [
    {
      icon: Code,
      title: "Online Code Editor & Runner",
      description:
        "Edit and run your code directly in the browser with our powerful online IDE.",
      color: "text-blue-600",
    },
    {
      icon: Zap,
      title: "Instant Setup & Deployment",
      description:
        "No installation or build time. Your projects are ready to run and deploy in real-time.",
      color: "text-yellow-600",
    },
    {
      icon: Bot,
      title: "AI-Powered Code Modification",
      description:
        "Let AI assist you in modifying your code, with instant execution of changes.",
      color: "text-green-600",
    },
    {
      icon: Share2,
      title: "Real-Time Code Sharing",
      description: "Collaborate seamlessly with real-time code sharing capabilities.",
      color: "text-purple-600",
    },
    {
      icon: Package,
      title: "Comprehensive Package Support",
      description:
        "Access all npm packages with built-in TypeScript support for enhanced development.",
      color: "text-red-600",
    },
    {
      icon: Download,
      title: "Portable HTML Export",
      description:
        "Download your project as a self-contained HTML file for easy sharing and deployment.",
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900 animate-fade-in-up">
          Revolutionize Your <span className="text-blue-600">Coding Experience</span>
        </h1>
        <p className="text-xl text-gray-700 mb-10 animate-fade-in-up">
          Discover a new way to code, collaborate, and create with our cutting-edge
          development platform.
        </p>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-10 rounded-md transition-all duration-300 hover:shadow-md animate-fade-in-up">
          Get Started
        </Button>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 text-gray-700 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
          <nav className="mt-4 md:mt-0">
            <a
              href="/privacy-policy"
              className="mx-3 hover:text-blue-600 transition-colors duration-300">
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="mx-3 hover:text-blue-600 transition-colors duration-300">
              Terms of Service
            </a>
            <a
              href="/contact"
              className="mx-3 hover:text-blue-600 transition-colors duration-300">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
