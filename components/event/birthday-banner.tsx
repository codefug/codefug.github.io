"use client";

import confetti from "canvas-confetti";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export function BirthdayBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    // 연속적인 폭죽 발사
    const fireworks = () => {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // 왼쪽에서 폭죽 발사
        myConfetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
        });

        // 오른쪽에서 폭죽 발사
        myConfetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#ffa500", "#ff69b4", "#00ffff", "#ff1493", "#7fff00"],
        });
      }, 250);

      return () => clearInterval(interval);
    };

    // 초기 폭죽
    fireworks();

    // 15초마다 폭죽 반복
    const repeatInterval = setInterval(fireworks, 15000);

    return () => {
      clearInterval(repeatInterval);
    };
  }, []);

  return (
    <div className="relative mb-6 overflow-hidden rounded-lg border border-gray-800 bg-black py-12">
      {/* Canvas for confetti */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Birthday message */}
      <div className="relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <h1 className="mb-2 bg-gradient-to-r from-primary to-white bg-clip-text font-bold text-5xl text-transparent drop-shadow-2xl md:text-6xl">
            Codefug's Birthday
          </h1>
        </motion.div>

        <motion.p
          className="mt-4 font-medium text-gray-300 text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {new Date().getFullYear()}.01.07
        </motion.p>

        <motion.p
          className="mt-4 font-medium text-gray-300 text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Celebrating another year of coding adventures!
        </motion.p>
      </div>

      {/* Glowing effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-10 via-transparent to-transparent" />
    </div>
  );
}
