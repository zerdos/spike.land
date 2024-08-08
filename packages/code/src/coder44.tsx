// coder44.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import QRTerminal from "qrcode-terminal";
import React, { useCallback, useEffect, useState } from "react";

const defaultText = "zoli";

const QRCodeDisplay: React.FC<{ qrCode: string }> = ({ qrCode }) => (
  <motion.div
    className="absolute top-24 right-24 font-mono text-xs "
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
  >
    {qrCode}
  </motion.div>
);

const TypingAnimation: React.FC<{ message: string }> = ({ message }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + message[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, message]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        |
      </motion.span>
    </motion.div>
  );
};

const ASCIIArt: React.FC = () => {
  const rocketArt = `
       /\\
    
     /    \\
    /      \\
   /        \\
  /  ______  \\
 /  /      \\  \\
|  |        |  |
|  |   ZZ   |  |
|  |        |  |
|  |        |  |
|__|        |__|
   |        |
   |        |
  /|        |\\
 / |        | \\
/__|        |__\\
   |   __   |
   |  |  |  |
   |  |  |  |
  /|  |  |  |\\
 / |  |  |  | \\
/  |  |  |  |  \\
   ^^^^^^^^^
  `;

  return (
    <motion.pre
      className="absolute bottom-24 left-24 font-mono text-xs text-yellow-400"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      css={css`
        white-space: pre;
      `}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [-1, 1, -1],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {rocketArt}
      </motion.div>
    </motion.pre>
  );
};

const generateQRCode = (updateQRCode: React.Dispatch<React.SetStateAction<string>>) => {
  QRTerminal.generate(
    "\n\nzz\nyou can scan it with your phone!!\n\n\n\n",
    { small: true },
    (code) => updateQRCode(code.normalize("NFKD")),
  );
};

const Fireworks: React.FC = () => {
  const fireworkVariants = {
    initial: { scale: 0, opacity: 1 },
    animate: {
      scale: [0, 1, 1.2, 1],
      opacity: [1, 1, 0.8, 0],
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div className="absolute inset-0 pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: 12,
            left: `${Math.random() * 100}%`,
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"][
              Math.floor(Math.random() * 5)
            ],
          }}
          variants={fireworkVariants}
          initial="initial"
          animate="animate"
          transition={{ repeat: Infinity, repeatDelay: Math.random() * 3 + 1 }}
        />
      ))}
    </motion.div>
  );
};

const InteractiveSection: React.FC<{ content: string }> = ({ content }) => {
  const [qrCode, setQRCode] = useState("");

  useEffect(() => {
    generateQRCode(setQRCode);
  }, []);

  const triggerFireworks = useCallback(() => {
    // This function will be called when we want to trigger fireworks
    // For now, it's empty as the fireworks are continuous
  }, []);

  const GradientAnimation = ({}) => {
    return (
      <motion.div
        css={css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background; 
        pointer-events: none;
      `}
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,0,0,0.1) 0%, rgba(0,0,0,0) 70%)",
        }}
        animate={{
          background: [
            "radial-gradient(circle, rgba(255,0,0,0.1) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(circle, rgba(0,255,0,0.1) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(circle, rgba(0,0,255,0.1) 0%, rgba(0,0,0,0) 70%)",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse" as const,
        }}
      />
    );
  };

  return (
    <motion.section
      className="h-full h-screen bg-gradient-to-t from-gray-800 via-black to-gray-700 text-red-500 text-xl font-['enhanced_dot_digital-7'] whitespace-pre"
      initial={css`background: linear-gradient(to top, #1a202c, #000000, #2d3748)`}
      transition={{ duration: 10, repeat: Infinity }}
      animate={{
        background: [
          "linear-gradient(to top, #1a202c, #000000, #2d3748)",
          "linear-gradient(to top, #2d3748, #000000, #1a202c)",
          "linear-gradient(to top, #1a202c, #000000, #2d3748)",
        ],
      }}
    >
      <GradientAnimation />
      <TypingAnimation message={`${content}\n${qrCode}`} />
      <QRCodeDisplay qrCode={qrCode} />
      <div className="flex-grow bg-gray-50 dark:bg-gray-900 p-4 overflow-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>error</AlertDescription>
        </Alert>
      </div>
      <ASCIIArt />
      <Fireworks />
    </motion.section>
  );
};

const App: React.FC<{ initialContent?: string }> = ({ initialContent = defaultText }) => (
  <InteractiveSection content={initialContent} />
);

export default App;
