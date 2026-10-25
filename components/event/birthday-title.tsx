import { motion } from "motion/react";
import { AUTHOR_GIVEN_NAME_EN } from "@/constants/site";

export function BirthdayTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative"
    >
      <h1 className="mb-2 animate-gradient-shift bg-linear-to-r from-primary via-purple-500 to-white bg-clip-text py-2 font-bold text-5xl text-transparent drop-shadow-2xl md:text-6xl">
        {AUTHOR_GIVEN_NAME_EN}'s Birthday
      </h1>
      <motion.div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
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
