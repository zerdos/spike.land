import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState("work");
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000) as unknown as number;
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setSessionType("work");
    setTimeLeft(25 * 60);
    setSessionsCompleted(0);
  };

  const switchSession = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    if (sessionType === "work") {
      setSessionsCompleted((prev) => prev + 1);
      if (sessionsCompleted === 3) {
        setSessionType("longBreak");
        setTimeLeft(15 * 60);
      } else {
        setSessionType("shortBreak");
        setTimeLeft(5 * 60);
      }
    } else {
      setSessionType("work");
      setTimeLeft(25 * 60);
      if (sessionsCompleted === 4) {
        setSessionsCompleted(0);
      }
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      switchSession();
    }
  }, [timeLeft]);

  const progressPercentage = () => {
    const totalTime = sessionType === "work"
      ? 25 * 60
      : sessionType === "shortBreak"
      ? 5 * 60
      : 15 * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            {sessionType === "work"
              ? "Work Session"
              : sessionType === "shortBreak"
              ? "Short Break"
              : "Long Break"}
          </h2>
          <div className="relative w-64 h-64 mx-auto mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              >
              </circle>
              <circle
                className="text-blue-500 stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * progressPercentage()) / 100}
                transform="rotate(-90 50 50)"
              >
              </circle>
              <text
                x="50"
                y="50"
                fontFamily="Verdana"
                fontSize="20"
                textAnchor="middle"
                alignmentBaseline="central"
              >
                {formatTime(timeLeft)}
              </text>
            </svg>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              onClick={isActive ? pauseTimer : startTimer}
              className="flex items-center"
            >
              {isActive
                ? <Pause className="mr-2" />
                : <Play className="mr-2" />}
              {isActive ? "Pause" : "Start"}
            </Button>
            <Button
              onClick={resetTimer}
              variant="outline"
              className="flex items-center"
            >
              <RotateCcw className="mr-2" />
              Reset
            </Button>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">
              Sessions Completed: {sessionsCompleted}
            </p>
            <Progress value={progressPercentage()} className="w-full h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
