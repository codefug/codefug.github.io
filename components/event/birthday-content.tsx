"use client";

import { motion } from "motion/react";

export function BirthdayContent() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <motion.p
        className="mt-4 font-medium font-mono text-gray-300 text-lg md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {currentYear}.01.07
      </motion.p>

      <motion.p
        className="mt-4 font-medium text-base text-gray-400 md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Celebrating another year of coding adventures!
      </motion.p>
    </>
  );
}
