"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CyclingWordProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function CyclingWord({
  words,
  interval = 2200,
  className = "",
}: CyclingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: "105%", opacity: 0, filter: "blur(6px)", skewY: 4 }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)", skewY: 0 }}
          exit={{ y: "-105%", opacity: 0, filter: "blur(6px)", skewY: -4 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
