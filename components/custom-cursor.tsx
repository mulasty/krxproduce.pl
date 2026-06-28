"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const dotY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const ringX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 20 });
  const isPointer = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkPointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = !!(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.onclick !== null
      );

      if (isClickable !== isPointer.current) {
        isPointer.current = isClickable;
      }
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", checkPointer);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", checkPointer);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = "a, button, input, textarea, [onclick] { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      document.documentElement.style.cursor = "";
      style.remove();
    };
  }, []);

  return (
    <>
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 mix-blend-difference lg:block"
        style={{ x: ringX, y: ringY }}
      />
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference lg:block"
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
}
