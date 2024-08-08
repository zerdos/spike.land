// landing.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Code, Download, Moon, Package, Share2, Sun, Zap } from "@/external/lucideReact";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";

// Create a context for the theme
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

const Feature = ({ icon: Icon, title, description, color }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      css={css`
        .icon-wrapper {
          transition: all 0.3s ease;
        }
        &:hover .icon-wrapper {
          transform: translateY(-5px);
        }
      `}
    >
      <Card
        className={`h-full hover:shadow-lg transition-all duration-300 border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <CardContent className="p-6 flex flex-col items-center text-center group">
          <div className="icon-wrapper mb-4">
            <Icon
              className={`w-12 h-12 ${color} group-hover:scale-110 transition-transform duration-300`}
              aria-label={title}
            />
          </div>
          <h3
            className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}
          >
            {title}
          </h3>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className={`rounded-full ${isDarkMode ? "bg-gray-800 text-yellow-400" : "bg-white text-gray-800"}`}
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const features = [
    {
      icon: Code,
      title: "Online Code Editor & Runner",
      description: "Edit and run your code directly in the browser with our powerful online IDE.",
      color: "text-blue-600",
    },
    {
      icon: Zap,
      title: "Instant Setup & Deployment",
      description: "No installation or build time. Your projects are ready to run and deploy in real-time.",
      color: "text-yellow-600",
    },
    {
      icon: Bot,
      title: "AI-Powered Code Modification",
      description: "Let AI assist you in modifying your code, with instant execution of changes.",
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
      description: "Access all npm packages with built-in TypeScript support for enhanced development.",
      color: "text-red-600",
    },
    {
      icon: Download,
      title: "Portable HTML Export",
      description: "Download your project as a self-contained HTML file for easy sharing and deployment.",
      color: "text-indigo-600",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => prevIndex === features.length - 1 ? 0 : prevIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div
        className={`min-h-screen ${
          isDarkMode
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-b from-blue-50 to-white text-gray-900"
        }`}
      >
        <header className="container mx-auto px-4 py-20 text-center relative">
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6"
          >
            Revolutionize Your <span className="text-blue-600">Coding Experience</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-xl mb-10 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Discover a new way to code, collaborate, and create with our cutting-edge development platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-10 rounded-md transition-all duration-300 hover:shadow-md"
            >
              Get Started!
            </Button>
          </motion.div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl font-bold mb-4 ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}
            >
              Featured Capability
            </h2>
            <motion.div
              key={currentFeatureIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-lg shadow-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <Feature {...features[currentFeatureIndex]} />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => <Feature key={index} {...feature} />)}
          </div>
        </main>

        <footer
          className={`py-10 ${
            isDarkMode
              ? "bg-gray-800 text-gray-300"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            <nav className="mt-4 md:mt-0">
              <a
                href="/privacy-policy"
                className={`mx-3 hover:text-blue-600 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className={`mx-3 hover:text-blue-600 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className={`mx-3 hover:text-blue-600 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Contact
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
};

export default LandingPage;
