"use client";

import React from "react";
import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[99999] bg-slate-950 flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-widest mb-6 bg-gradient-to-r from-purple via-[#CBACF9] to-cyanAccent bg-clip-text text-transparent text-center select-none"
        >
          CHIRAG JAIN
        </motion.div>
        <div className="w-64 md:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-purple to-cyanAccent"
          />
        </div>
      </div>
    </motion.div>
  );
};
