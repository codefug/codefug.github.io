"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  direct?: "up" | "down" | "left" | "right";
  className?: string;
}

// Use the `direct` prop to determine the direction of the animation
const initStyleBasedOnDirection = {
  up: { y: 50 },
  down: { y: -50 },
  left: { x: 50 },
  right: { x: -50 },
};

export const FadeInSection = ({
  children,
  delay = 0,
  direct,
  className,
}: FadeInSectionProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [forceVisible, setForceVisible] = useState(false);

  // IntersectionObserver가 어떤 이유로든 트리거되지 않은 채로 멈춰버린 경우
  // (뒤로가기 후 재마운트 누락, 브라우저 캐시 복원 등) 짧은 fallback 타이머로
  // 콘텐츠가 영영 숨겨지지 않도록 보장
  useEffect(() => {
    const timer = window.setTimeout(() => setForceVisible(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const animationDirection = useMemo(
    () => initStyleBasedOnDirection[direct || "up"],
    [direct],
  );

  const visible = inView || forceVisible;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...animationDirection }}
      animate={visible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
