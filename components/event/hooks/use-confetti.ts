import confetti from "canvas-confetti";
import { random } from "es-toolkit";
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

    let interval: ReturnType<typeof setInterval> | undefined;

    // 애니메이션과 맞추려고 늦게 쏜다.
    const timeout = setTimeout(() => {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
      };

      interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        myConfetti({
          ...defaults,
          particleCount,
          origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
        });

        myConfetti({
          ...defaults,
          particleCount,
          origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#ffa500", "#ff69b4", "#00ffff", "#ff1493", "#7fff00"],
        });
      }, 200);
      hasTriggered.current = true;
    }, 500);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return canvasRef;
}
