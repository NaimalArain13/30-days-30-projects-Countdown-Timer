"use client";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
export default function CountDownTimer() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  //timer functions
  function handleSetDuration(): void {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }
  function handleStart(): void {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  }
  function handlePause(): void {
    if (isActive) {
      setIsActive(false);
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }
  function handleReset(): void {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }

  //applying side effects
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((previousTime: number) => {
          if (previousTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return previousTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  //helper Function
  function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 dark:bg-gray-900 h-screen ">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
          CountDown Timer
        </h1>

        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            value={duration}
            placeholder="Enter duration in sec"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDuration(+e.target.value || "")
            }
            className="flex-1 mr-4 border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <Button
            onClick={handleSetDuration}
            variant={"outline"}
            className="text-gray-800 dark:text-gray-200"
          >
            Set
          </Button>
        </div>
        <div className="text-6xl font-bold mb-8 text-gray-800 dark:text-gray-200 text-center">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant={"outline"}
            className="text-gray-800 dark:text-gray-200"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant={"outline"}
            className="text-gray-800 dark:text-gray-200"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant={"outline"}
            className="text-gray-800 dark:text-gray-200"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
