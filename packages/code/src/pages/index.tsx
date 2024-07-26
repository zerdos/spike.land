import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { css } from "@emotion/react";
import { Bot, Brush, Code, Download, Package, Palette, Rocket, Share2, Zap } from "lucide-react";
import React from "react";

const Feature = (
  { icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string },
) => (
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

      animation: fadeInUp 1s ease-out;
    `}
  >
    <Card className="hover:shadow-xl transition-all duration-300 border-none bg-white">
      <CardContent className="p-8 flex flex-col items-center text-center group">
        <Icon
          className="w-12 h-12 mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300"
          aria-label={title}
        />
        <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-lg">{description}</p>
      </CardContent>
    </Card>
  </div>
);

const LandingPage = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Development",
      description: "Accelerate your workflow with intelligent code suggestions and rapid prototyping.",
    },
    {
      icon: Zap,
      title: "Instant Experimentation",
      description: "Test ideas and iterate quickly with real-time code execution and preview.",
    },
    {
      icon: Code,
      title: "Cloud-Based React Editor",
      description: "Write and run React code in your browser, no setup required.",
    },
    {
      icon: Palette,
      title: "Tailwind CSS Integration",
      description: "Design stunning UIs effortlessly with pre-configured Tailwind CSS.",
    },
    {
      icon: Brush,
      title: "shadcn/ui Components",
      description: "Access a library of beautiful, customizable UI components instantly.",
    },
    {
      icon: Package,
      title: "@emotion/css Support",
      description: "Create dynamic, scoped styles with built-in CSS-in-JS capabilities.",
    },
    {
      icon: Rocket,
      title: "One-Click Deployment",
      description: "Deploy your app instantly, no configuration needed.",
    },
    {
      icon: Share2,
      title: "Real-Time Collaboration",
      description: "Work together seamlessly with live code sharing and editing.",
    },
    {
      icon: Download,
      title: "Exportable Projects",
      description: "Download your entire project as a ready-to-use package.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-50">
      <header className="container mx-auto px-4 py-24 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold mb-6 text-purple-800 animate-fade-in-down">
            Spike.land: AI-Powered React Development
          </h1>
          <p className="text-2xl text-gray-700 mb-12 animate-fade-in-up">
            Experiment, build, and deploy React apps at lightning speed with AI assistance.
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white text-xl py-6 px-12 rounded-full transition-all duration-300 hover:shadow-lg animate-pulse"
          >
            Start Coding Now
          </Button>
        </div>
        <svg
          className="absolute bottom-0 left-0 right-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
          </path>
        </svg>
      </header>

      <main className="container mx-auto px-4 py-24">
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-800">Supercharge Your Development with AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Rapid Prototyping</h3>
              <p className="text-lg text-gray-700">
                Turn your ideas into working prototypes in minutes. Our AI assistant helps you write code faster,
                suggests optimizations, and even generates entire components based on your descriptions.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Intelligent Code Completion</h3>
              <p className="text-lg text-gray-700">
                Write better code, faster. Our AI understands your project context and provides smart suggestions,
                helping you avoid common pitfalls and adopt best practices effortlessly.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => <Feature key={index} {...feature} />)}
        </div>
      </main>

      <footer className="bg-purple-900 text-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Spike.land. All rights reserved.</p>
          <nav className="mt-4 md:mt-0">
            <a
              href="/privacy-policy"
              className="mx-3 hover:text-purple-300 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="mx-3 hover:text-purple-300 transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="mx-3 hover:text-purple-300 transition-colors duration-300"
            >
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
