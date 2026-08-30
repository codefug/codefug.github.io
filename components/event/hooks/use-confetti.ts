import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";

export function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || hasTriggered.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    const triggerFireworks = () => {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
      };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        myConfetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
        });

        myConfetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#ffa500", "#ff69b4", "#00ffff", "#ff1493", "#7fff00"],
        });
      }, 200);

      return () => clearInterval(interval);
    };

    // 약간의 지연 후 폭죽 발사 (애니메이션과 동기화)
    const timeout = setTimeout(() => {
      triggerFireworks();
      hasTriggered.current = true;
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return canvasRef;
}
