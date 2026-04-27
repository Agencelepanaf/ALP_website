"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface AnimatedIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function AnimatedIcon({
  src,
  alt,
  size = 40,
  className = "",
}: AnimatedIconProps) {
  return (
    <motion.div
      className={`flex-shrink-0 ${className}`}
      style={{ width: size, height: size, transformStyle: "preserve-3d" }}
      whileHover={{
        rotate: [0, -8, 8, -6, 6, -3, 3, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </motion.div>
  );
}
