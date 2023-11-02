"use client";

import { motion } from "framer-motion";
import React from "react";

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        exit={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
