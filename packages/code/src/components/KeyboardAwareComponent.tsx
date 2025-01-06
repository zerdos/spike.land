import { useEffect, useState } from "react";
import type { FC } from "react";

const KeyboardAwareComponent: FC<{ children: React.ReactNode; }> = (
  { children },
) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const detectKeyboard = () => {
      const isKeyboard = visualViewport !== null &&
        window.screen.height > visualViewport.height;
      setIsKeyboardVisible(isKeyboard);
    };

    visualViewport?.addEventListener("resize", detectKeyboard);
    return () => visualViewport?.removeEventListener("resize", detectKeyboard);
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
