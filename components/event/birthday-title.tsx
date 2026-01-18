"use client";

import { motion } from "motion/react";

/**
 * 생일 제목 컴포넌트
 * 글리치 효과와 그라데이션 애니메이션을 포함합니다.
 */
export function BirthdayTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // 커스텀 이징
      }}
      className="relative"
    >
      <h1 className="mb-2 animate-gradient-shift bg-gradient-to-r from-primary via-purple-500 to-white bg-clip-text font-bold text-5xl text-transparent drop-shadow-2xl md:text-6xl">
        Codefug's Birthday
      </h1>
      {/* 글리치 효과 오버레이 */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
