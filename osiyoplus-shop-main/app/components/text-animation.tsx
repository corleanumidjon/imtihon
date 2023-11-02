"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface TextAnimationProps {
  children: ReactNode;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ children }) => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 1 } }, // Yangi exit holatini qo'shish
    initial: { opacity: 0, y: 20 }, // Yangi initial holatini qo'shish
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={textVariants}>
      {children}
    </motion.div>
  );
};

export default TextAnimation;
