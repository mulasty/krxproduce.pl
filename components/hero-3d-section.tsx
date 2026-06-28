"use client";

import { motion } from "framer-motion";
import Scene from "./scene";

export default function Hero3DSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D Scene background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Scene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-accent"
        >
          Technologia & Kreatywność
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl"
        >
          Tam gdzie{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-warm">
            wizja
          </span>{" "}
          spotyka{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-warm to-accent">
            technologię
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-neutral-400"
        >
          Wykorzystujemy najnowsze technologie 3D i motion design, aby tworzyć
          doświadczenia, które zapadają w pamięć.
        </motion.p>
      </div>
    </section>
  );
}
