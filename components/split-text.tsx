"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export default function SplitText({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
  stagger = 0.03,
  once = true,
}: SplitTextProps) {
  const chars = useMemo(() => text.split(""), [text]);

  return (
    <Tag className={className} aria-label={text}>
      {chars.map((char, i) => {
        if (char === " ") {
          return <span key={i} className="inline-block">&nbsp;</span>;
        }
        // Random starting position for "litery wpadają" effect
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 120;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{
              opacity: 0,
              x,
              y,
              rotate: (Math.random() - 0.5) * 60,
              filter: "blur(8px)",
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              filter: "blur(0px)",
            }}
            viewport={{ once }}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </Tag>
  );
}
