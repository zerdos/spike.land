import { useEffect, useState } from "react";

const KeyboardAwareComponent = ({ children }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const detectKeyboard = () => {
      const isKeyboard = window.screen.height > window.visualViewport.height;
      setIsKeyboardVisible(isKeyboard);
    };

    window.visualViewport.addEventListener("resize", detectKeyboard);
    return () =>
      window.visualViewport.removeEventListener("resize", detectKeyboard);
  }, []);

  return (
    <div
      className={`app-container ${isKeyboardVisible ? "keyboard-visible" : ""}`}
    >
      {children}
    </div>
  );
};

export default KeyboardAwareComponent;
