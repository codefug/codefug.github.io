"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
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

  const animationDirection = useMemo(
    () => initStyleBasedOnDirection[direct || "up"],
    [direct],
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...animationDirection }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
