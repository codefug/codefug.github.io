"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

type ParticleData = {
  left: number;
  top: number;
  duration: number;
  delay: number;
};

export function BirthdayBackground() {
  const [isMounted, setIsMounted] = useState(false);

  // 클라이언트에서만 랜덤 값 생성 (hydration 오류 방지)
  const particles = useMemo<ParticleData[]>(() => {
    if (!isMounted) return [];
    return Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/10 via-transparent to-transparent" />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-purple-500/10 via-transparent to-blue-500/10"
        animate={{
          x: ["-50%", "50%"],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}-${particle.left}-${particle.top}`}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-primary/30"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
