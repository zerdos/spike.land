export const originalCode = `// pixie.tsx
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

import { motion, AnimatePresence } from "framer-motion";

const PuppyTimeCalculator = () => {
  const { isDarkMode } = useDarkMode();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showEmoji, setShowEmoji] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setShowEmoji((prev) => !prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Import framer-motion at the  top of your file if not already imported

  const birthDate = new Date("2024-07-26");
  const adoptionDate = new Date("2024-10-25");

  const totalLifeMs = currentTime.getTime() - birthDate.getTime();
  const timeWithMeMs = currentTime.getTime() - adoptionDate.getTime();
  const percentageWithMe = (timeWithMeMs / totalLifeMs) * 100;

  const totalDays = Math.floor(totalLifeMs / (1000 * 60 * 60 * 24));
  const daysWithMe = Math.floor(timeWithMeMs / (1000 * 60 * 60 * 24));

  const calculateHumanYears = (days) => {
    const years = days / 365;
    if (years <= 1) return years * 15;
    if (years <= 2) return 15 + (years - 1) * 9;
    return 24 + (years - 2) * 4;
  };

  const humanYearsTotal = calculateHumanYears(totalDays);
  const humanYearsWithMe = calculateHumanYears(daysWithMe);

  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-center justify-center  relative",
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      )}
    >
      <div className="absolute  top-4  right-4">
        <ThemeToggle />
      </div>
      <Card
        className={cn(
          "w-full max-w-md  m-4",
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        )}
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Clock className="w-6 h-6" /> Time Calculator 🐶
            <AnimatePresence mode="wait">
              {showEmoji && (
                <motion.span
                  key="woof"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  🐾
                </motion.span>
              )}
            </AnimatePresence>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p
              className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}
            >
              Current time: {currentTime.toLocaleString()}
            </p>
            <motion.p
              className={cn(
                "font-medium",
                isDarkMode ? "text-white" : "text-gray-800"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Your puppy is {totalDays} days old! 🎂
            </motion.p>
            <motion.p
              className={cn(
                "font-medium",
                isDarkMode ? "text-white" : "text-gray-800"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Youve been together for {daysWithMe} days! 💖
            </motion.p>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span
                  className={cn(
                    "text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full",
                    isDarkMode
                      ? "bg-blue-700 text-blue-200"
                      : "bg-blue-200 text-blue-800"
                  )}
                >
                  Time Together:
                </span>
              </div>
              <div className="text-right">
                <span
                  className={cn(
                    "text-xs font-semibold inline-block",
                    isDarkMode ? "text-blue-300" : "text-blue-800"
                  )}
                >
                  {percentageWithMe.toFixed(1)}%
                </span>
              </div>
            </div>
            <div
              className={cn(
                "overflow-hidden h-2 mb-4 text-xs flex rounded",
                isDarkMode ? "bg-blue-900" : "bg-blue-200"
              )}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: \`\${percentageWithMe}%\` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={cn(
                  "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center",
                  isDarkMode ? "bg-blue-500" : "bg-blue-600"
                )}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={cn(
              "space-y-2 pt-4 border-t",
              isDarkMode ? "border-gray-700" : "border-gray-200"
            )}
          >
            <h3
              className={cn(
                "font-semibold flex items-center gap-2",
                isDarkMode ? "text-white" : "text-gray-800"
              )}
            >
              Human Age Equivalent 👤
            </h3>
            <motion.p
              className={isDarkMode ? "text-gray-200" : "text-gray-700"}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Your puppy's age is roughly equivalent to{" "}
              <span className="font-bold">
                {humanYearsTotal.toFixed(1)} human years
              </span>{" "}
              🧓
            </motion.p>
            <motion.p
              className={isDarkMode ? "text-gray-200" : "text-gray-700"}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Time spent together equals about{" "}
              <span className="font-bold">
                {humanYearsWithMe.toFixed(1)} human years
              </span>{" "}
              ❤️
            </motion.p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PuppyTimeCalculator;`;

export const targetCode = `// pixie.tsx
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

import { motion, AnimatePresence } from "framer-motion";

const PuppyTimeCalculator = () => {
  const { isDarkMode } = useDarkMode();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showEmoji, setShowEmoji] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setShowEmoji((prev) => !prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Import framer-motion at the  top of your file if not already imported

  const birthDate = new Date("2024-07-26");
  const adoptionDate = new Date("2024-10-25");

  const totalLifeMs = currentTime.getTime() - birthDate.getTime();
  const timeWithMeMs = currentTime.getTime() - adoptionDate.getTime();
  const percentageWithMe = (timeWithMeMs / totalLifeMs) * 100;

  const totalDays = Math.floor(totalLifeMs / (1000 * 60 * 60 * 24));
  const daysWithMe = Math.floor(timeWithMeMs / (1000 * 60 * 60 * 24));

  const calculateHumanYears = (days) => {
    const years = days / 365;
    if (years <= 1) return years * 15;
    if (years <= 2) return 15 + (years - 1) * 9;
    return 24 + (years - 2) * 4;
  };

  const humanYearsTotal = calculateHumanYears(totalDays);
  const humanYearsWithMe = calculateHumanYears(daysWithMe);

  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-center justify-center  relative",
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      )}
    >
      <div className="absolute  top-4  right-4">
        <ThemeToggle />
      </div>
      <Card
        className={cn(
          "w-full max-w-md  m-4",
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        )}
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Clock className="w-6 h-6" />P Time Calculator 🐶
            <AnimatePresence mode="wait">
              {showEmoji && (
                <motion.span
                  key="woof"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  🐾
                </motion.span>
              )}
            </AnimatePresence>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p
              className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}
            >
              Current time: {currentTime.toLocaleString()}
            </p>
            <motion.p
              className={cn(
                "font-medium",
                isDarkMode ? "text-white" : "text-gray-800"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Your puppy is {totalDays} days old! 🎂
            </motion.p>
            <motion.p
              className={cn(
                "font-medium",
                isDarkMode ? "text-white" : "text-gray-800"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Youve been together for {daysWithMe} days! 💖
            </motion.p>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span
                  className={cn(
                    "text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full",
                    isDarkMode
                      ? "bg-blue-700 text-blue-200"
                      : "bg-blue-200 text-blue-800"
                  )}
                >
                  Time Together:
                </span>
              </div>
              <div className="text-right">
                <span
                  className={cn(
                    "text-xs font-semibold inline-block",
                    isDarkMode ? "text-blue-300" : "text-blue-800"
                  )}
                >
                  {percentageWithMe.toFixed(1)}%
                </span>
              </div>
            </div>
            <div
              className={cn(
                "overflow-hidden h-2 mb-4 text-xs flex rounded",
                isDarkMode ? "bg-blue-900" : "bg-blue-200"
              )}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: \`\${percentageWithMe}%\` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={cn(
                  "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center",
                  isDarkMode ? "bg-blue-500" : "bg-blue-600"
                )}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={cn(
              "space-y-2 pt-4 border-t",
              isDarkMode ? "border-gray-700" : "border-gray-200"
            )}
          >
            <h3
              className={cn(
                "font-semibold flex items-center gap-2",
                isDarkMode ? "text-white" : "text-gray-800"
              )}
            >
              Human Age Equivalent 👤
            </h3>
            <motion.p
              className={isDarkMode ? "text-gray-200" : "text-gray-700"}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Your puppy's age is roughly equivalent to{" "}
              <span className="font-bold">
                {humanYearsTotal.toFixed(1)} human years
              </span>{" "}
              🧓
            </motion.p>
            <motion.p
              className={isDarkMode ? "text-gray-200" : "text-gray-700"}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Time spent together equals about{" "}
              <span className="font-bold">
                {humanYearsWithMe.toFixed(1)} human years
              </span>{" "}
              ❤️
            </motion.p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PuppyTimeCalculator;`;

export const originalTransformedCode = `var __defProp = Object.defineProperty;
var __name = (target, value) =\u003E __defProp(target, "
name"
, { value, configurable: true });
import { useState, useEffect } from "
react"
;
import { Card, CardHeader, CardTitle, CardContent } from "
@/components/ui/card"
;
import { Clock } from "
lucide-react"
;
import { useDarkMode } from "
@/hooks/use-dark-mode"
;
import { ThemeToggle } from "
@/components/ui/theme-toggle"
;
import { cn } from "
@/lib/utils"
;
import { motion, AnimatePresence } from "
framer-motion"
;
import { jsx, jsxs } from "
@emotion/react/jsx-runtime"
;
const PuppyTimeCalculator = /* @__PURE__ */ __name(() =\u003E {
  const { isDarkMode } = useDarkMode();
  const [currentTime, setCurrentTime] = useState(/* @__PURE__ */ new Date());
  const [showEmoji, setShowEmoji] = useState(true);
  useEffect(() =\u003E {
    const timer = setInterval(() =\u003E {
      setCurrentTime(/* @__PURE__ */ new Date());
      setShowEmoji((prev) =\u003E !prev);
    }, 1e3);
    return () =\u003E clearInterval(timer);
  }, []);
  const birthDate = /* @__PURE__ */ new Date("
2024-07-26"
);
  const adoptionDate = /* @__PURE__ */ new Date("
2024-10-25"
);
  const totalLifeMs = currentTime.getTime() - birthDate.getTime();
  const timeWithMeMs = currentTime.getTime() - adoptionDate.getTime();
  const percentageWithMe = timeWithMeMs / totalLifeMs * 100;
  const totalDays = Math.floor(totalLifeMs / (1e3 * 60 * 60 * 24));
  const daysWithMe = Math.floor(timeWithMeMs / (1e3 * 60 * 60 * 24));
  const calculateHumanYears = /* @__PURE__ */ __name((days) =\u003E {
    const years = days / 365;
    if (years \u003C= 1) return years * 15;
    if (years \u003C= 2) return 15 + (years - 1) * 9;
    return 24 + (years - 2) * 4;
  }, "
calculateHumanYears"
);
  const humanYearsTotal = calculateHumanYears(totalDays);
  const humanYearsWithMe = calculateHumanYears(daysWithMe);
  return /* @__PURE__ */ jsxs(
    "
div"
,
    {
      className: cn(
        "
min-h-screen w-full flex items-center justify-center  relative"
,
        isDarkMode ? "
bg-gray-900"
 : "
bg-gray-50"

      ),
      children: [
        /* @__PURE__ */ jsx("
div"
, { className: "
absolute  top-4  right-4"
, children: /* @__PURE__ */ jsx(ThemeToggle, {}) }),
        /* @__PURE__ */ jsxs(
          Card,
          {
            className: cn(
              "
w-full max-w-md  m-4"
,
              isDarkMode ? "
bg-gray-800 text-white"
 : "
bg-white text-gray-800"

            ),
            children: [
              /* @__PURE__ */ jsx(CardHeader, { className: "
space-y-1"
, children: /* @__PURE__ */ jsxs(CardTitle, { className: "
text-2xl flex items-center gap-2"
, children: [
                /* @__PURE__ */ jsx(Clock, { className: "
w-6 h-6"
 }),
                "
 Time Calculator 🐶"
,
                /* @__PURE__ */ jsx(AnimatePresence, { mode: "
wait"
, children: showEmoji && /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -10 },
                    transition: { duration: 0.3 },
                    children: "
🐾"

                  },
                  "
woof"

                ) })
              ] }) }),
              /* @__PURE__ */ jsxs(CardContent, { className: "
space-y-4"
, children: [
                /* @__PURE__ */ jsxs("
div"
, { className: "
space-y-2"
, children: [
                  /* @__PURE__ */ jsxs(
                    "
p"
,
                    {
                      className: cn(
                        "
text-sm"
,
                        isDarkMode ? "
text-gray-400"
 : "
text-gray-600"

                      ),
                      children: [
                        "
Current time: "
,
                        currentTime.toLocaleString()
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    motion.p,
                    {
                      className: cn(
                        "
font-medium"
,
                        isDarkMode ? "
text-white"
 : "
text-gray-800"

                      ),
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { duration: 0.5 },
                      children: [
                        "
Your puppy is "
,
                        totalDays,
                        "
 days old! 🎂"

                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    motion.p,
                    {
                      className: cn(
                        "
font-medium"
,
                        isDarkMode ? "
text-white"
 : "
text-gray-800"

                      ),
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { duration: 0.5, delay: 0.2 },
                      children: [
                        "
Youve been together for "
,
                        daysWithMe,
                        "
 days! 💖"

                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("
div"
, { className: "
relative pt-1"
, children: [
                  /* @__PURE__ */ jsxs("
div"
, { className: "
flex mb-2 items-center justify-between"
, children: [
                    /* @__PURE__ */ jsx("
div"
, { children: /* @__PURE__ */ jsx(
                      "
span"
,
                      {
                        className: cn(
                          "
text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full"
,
                          isDarkMode ? "
bg-blue-700 text-blue-200"
 : "
bg-blue-200 text-blue-800"

                        ),
                        children: "
Time Together:"

                      }
                    ) }),
                    /* @__PURE__ */ jsx("
div"
, { className: "
text-right"
, children: /* @__PURE__ */ jsxs(
                      "
span"
,
                      {
                        className: cn(
                          "
text-xs font-semibold inline-block"
,
                          isDarkMode ? "
text-blue-300"
 : "
text-blue-800"

                        ),
                        children: [
                          percentageWithMe.toFixed(1),
                          "
%"

                        ]
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "
div"
,
                    {
                      className: cn(
                        "
overflow-hidden h-2 mb-4 text-xs flex rounded"
,
                        isDarkMode ? "
bg-blue-900"
 : "
bg-blue-200"

                      ),
                      children: /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          initial: { width: 0 },
                          animate: { width: \`\${percentageWithMe}%\` },
                          transition: { duration: 1, ease: "
easeOut"
 },
                          className: cn(
                            "
shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
,
                            isDarkMode ? "
bg-blue-500"
 : "
bg-blue-600"

                          )
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.7, delay: 0.3 },
                    className: cn(
                      "
space-y-2 pt-4 border-t"
,
                      isDarkMode ? "
border-gray-700"
 : "
border-gray-200"

                    ),
                    children: [
                      /* @__PURE__ */ jsx(
                        "
h3"
,
                        {
                          className: cn(
                            "
font-semibold flex items-center gap-2"
,
                            isDarkMode ? "
text-white"
 : "
text-gray-800"

                          ),
                          children: "
Human Age Equivalent 👤"

                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        motion.p,
                        {
                          className: isDarkMode ? "
text-gray-200"
 : "
text-gray-700"
,
                          initial: { x: -10, opacity: 0 },
                          animate: { x: 0, opacity: 1 },
                          transition: { duration: 0.5, delay: 0.5 },
                          children: [
                            "
Your puppy's age is roughly equivalent to"
,
                            "
 "
,
                            /* @__PURE__ */ jsxs("
span"
, { className: "
font-bold"
, children: [
                              humanYearsTotal.toFixed(1),
                              "
 human years"

                            ] }),
                            "
 "
,
                            "
🧓"

                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        motion.p,
                        {
                          className: isDarkMode ? "
text-gray-200"
 : "
text-gray-700"
,
                          initial: { x: -10, opacity: 0 },
                          animate: { x: 0, opacity: 1 },
                          transition: { duration: 0.5, delay: 0.7 },
                          children: [                            "
Time spent together equals about"
,
                            "
 "
,
                            /* @__PURE__ */ jsxs("
span"
, { className: "
font-bold"
, children: [
                              humanYearsWithMe.toFixed(1),
                              "
 human years"

                            ] }),
                            "
 "
,
                            "
❤️"

                          ]
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}, "
PuppyTimeCalculator"
);
var stdin_default = PuppyTimeCalculator;
export {
  stdin_default as default
};`;

export const modifiedTransformed = `var __defProp = Object.defineProperty;
var __name = (target, value) =\u003E __defProp(target, "
name"
, { value, configurable: true });
import { useState, useEffect } from "
react"
;
import { Card, CardHeader, CardTitle, CardContent } from "
@/components/ui/card"
;
import { Clock } from "
lucide-react"
;
import { useDarkMode } from "
@/hooks/use-dark-mode"
;
import { ThemeToggle } from "
@/components/ui/theme-toggle"
;
import { cn } from "
@/lib/utils"
;
import { motion, AnimatePresence } from "
framer-motion"
;
import { jsx, jsxs } from "
@emotion/react/jsx-runtime"
;
const PuppyTimeCalculator = /* @__PURE__ */ __name(() =\u003E {
  const { isDarkMode } = useDarkMode();
  const [currentTime, setCurrentTime] = useState(/* @__PURE__ */ new Date());
  const [showEmoji, setShowEmoji] = useState(true);
  useEffect(() =\u003E {
    const timer = setInterval(() =\u003E {
      setCurrentTime(/* @__PURE__ */ new Date());
      setShowEmoji((prev) =\u003E !prev);
    }, 1e3);
    return () =\u003E clearInterval(timer);
  }, []);
  const birthDate = /* @__PURE__ */ new Date("
2024-07-26"
);
  const adoptionDate = /* @__PURE__ */ new Date("
2024-10-25"
);
  const totalLifeMs = currentTime.getTime() - birthDate.getTime();
  const timeWithMeMs = currentTime.getTime() - adoptionDate.getTime();
  const percentageWithMe = timeWithMeMs / totalLifeMs * 100;
  const totalDays = Math.floor(totalLifeMs / (1e3 * 60 * 60 * 24));
  const daysWithMe = Math.floor(timeWithMeMs / (1e3 * 60 * 60 * 24));
  const calculateHumanYears = /* @__PURE__ */ __name((days) =\u003E {
    const years = days / 365;
    if (years \u003C= 1) return years * 15;
    if (years \u003C= 2) return 15 + (years - 1) * 9;
    return 24 + (years - 2) * 4;
  }, "
calculateHumanYears"
);
  const humanYearsTotal = calculateHumanYears(totalDays);
  const humanYearsWithMe = calculateHumanYears(daysWithMe);
  return /* @__PURE__ */ jsxs(
    "
div"
,
    {
      className: cn(
        "
min-h-screen w-full flex items-center justify-center  relative"
,
        isDarkMode ? "
bg-gray-900"
 : "
bg-gray-50"

      ),
      children: [
        /* @__PURE__ */ jsx("
div"
, { className: "
absolute  top-4  right-4"
, children: /* @__PURE__ */ jsx(ThemeToggle, {}) }),
        /* @__PURE__ */ jsxs(
          Card,
          {
            className: cn(
              "
w-full max-w-md  m-4"
,
              isDarkMode ? "
bg-gray-800 text-white"
 : "
bg-white text-gray-800"

            ),
            children: [
              /* @__PURE__ */ jsx(CardHeader, { className: "
space-y-1"
, children: /* @__PURE__ */ jsxs(CardTitle, { className: "
text-2xl flex items-center gap-2"
, children: [
                /* @__PURE__ */ jsx(Clock, { className: "
w-6 h-6"
 }),
                "
P Time Calculator 🐶"
,
                /* @__PURE__ */ jsx(AnimatePresence, { mode: "
wait"
, children: showEmoji && /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -10 },
                    transition: { duration: 0.3 },
                    children: "
🐾"

                  },
                  "
woof"

                ) })
              ] }) }),
              /* @__PURE__ */ jsxs(CardContent, { className: "
space-y-4"
, children: [
                /* @__PURE__ */ jsxs("
div"
, { className: "
space-y-2"
, children: [
                  /* @__PURE__ */ jsxs(
                    "
p"
,
                    {
                      className: cn(
                        "
text-sm"
,
                        isDarkMode ? "
text-gray-400"
 : "
text-gray-600"

                      ),
                      children: [
                        "
Current time: "
,
                        currentTime.toLocaleString()
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    motion.p,
                    {
                      className: cn(
                        "
font-medium"
,
                        isDarkMode ? "
text-white"
 : "
text-gray-800"

                      ),
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { duration: 0.5 },
                      children: [
                        "
Your puppy is "
,
                        totalDays,
                        "
 days old! 🎂"

                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    motion.p,
                    {
                      className: cn(
                        "
font-medium"
,
                        isDarkMode ? "
text-white"
 : "
text-gray-800"

                      ),
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { duration: 0.5, delay: 0.2 },
                      children: [
                        "
Youve been together for "
,
                        daysWithMe,
                        "
 days! 💖"

                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("
div"
, { className: "
relative pt-1"
, children: [
                  /* @__PURE__ */ jsxs("
div"
, { className: "
flex mb-2 items-center justify-between"
, children: [
                    /* @__PURE__ */ jsx("
div"
, { children: /* @__PURE__ */ jsx(
                      "
span"
,
                      {
                        className: cn(
                          "
text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full"
,
                          isDarkMode ? "
bg-blue-700 text-blue-200"
 : "
bg-blue-200 text-blue-800"

                        ),
                        children: "
Time Together:"

                      }
                    ) }),
                    /* @__PURE__ */ jsx("
div"
, { className: "
text-right"
, children: /* @__PURE__ */ jsxs(
                      "
span"
,
                      {
                        className: cn(
                          "
text-xs font-semibold inline-block"
,
                          isDarkMode ? "
text-blue-300"
 : "
text-blue-800"

                        ),
                        children: [
                          percentageWithMe.toFixed(1),
                          "
%"

                        ]
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "
div"
,
                    {
                      className: cn(
                        "
overflow-hidden h-2 mb-4 text-xs flex rounded"
,
                        isDarkMode ? "
bg-blue-900"
 : "
bg-blue-200"

                      ),
                      children: /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          initial: { width: 0 },
                          animate: { width: \`\${percentageWithMe}%\` },
                          transition: { duration: 1, ease: "
easeOut"
 },
                          className: cn(
                            "
shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
,
                            isDarkMode ? "
bg-blue-500"
 : "
bg-blue-600"

                          )
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.7, delay: 0.3 },
                    className: cn(
                      "
space-y-2 pt-4 border-t"
,
                      isDarkMode ? "
border-gray-700"
 : "
border-gray-200"

                    ),
                    children: [
                      /* @__PURE__ */ jsx(
                        "
h3"
,
                        {
                          className: cn(
                            "
font-semibold flex items-center gap-2"
,
                            isDarkMode ? "
text-white"
 : "
text-gray-800"

                          ),
                          children: "
Human Age Equivalent 👤"

                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        motion.p,
                        {
                          className: isDarkMode ? "
text-gray-200"
 : "
text-gray-700"
,
                          initial: { x: -10, opacity: 0 },
                          animate: { x: 0, opacity: 1 },
                          transition: { duration: 0.5, delay: 0.5 },
                          children: [
                            "
Your puppy's age is roughly equivalent to"
,
                            "
 "
,
                            /* @__PURE__ */ jsxs("
span"
, { className: "
font-bold"
, children: [
                              humanYearsTotal.toFixed(1),
                              "
 human years"

                            ] }),
                            "
 "
,
                            "
🧓"

                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        motion.p,
                        {
                          className: isDarkMode ? "
text-gray-200"
 : "
text-gray-700"
,
                          initial: { x: -10, opacity: 0 },
                          animate: { x: 0, opacity: 1 },
                          transition: { duration: 0.5, delay: 0.7 },
                          children: [                            "
Time spent together equals about"
,
                            "
 "
,
                            /* @__PURE__ */ jsxs("
span"
, { className: "
font-bold"
, children: [
                              humanYearsWithMe.toFixed(1),
                              "
 human years"

                            ] }),
                            "
 "
,
                            "
❤️"

                          ]
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}, "
PuppyTimeCalculator"
);
var stdin_default = PuppyTimeCalculator;
export {
  stdin_default as default
};`;
