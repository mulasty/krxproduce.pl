"use client";

import { motion } from "framer-motion";
import SplitText from "./split-text";
import MagneticButton from "./magnetic-button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "brightness(1.4) contrast(1.1)" }}
        aria-hidden="true"
      >
        <source src="/videos/7963111-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/5 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/10" />
      <div className="absolute inset-0 bg-black/5" />

      {/* Subtle noise/grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-300 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Otwarty na nowe projekty
        </motion.div>

        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl lg:text-8xl">
          <SplitText
            text="Filmowanie"
            as="span"
            delay={0.4}
            stagger={0.04}
            className="inline-block"
          />{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-warm inline-block">
            <SplitText
              text="&"
              as="span"
              delay={0.4}
              stagger={0.04}
            />
          </span>{" "}
          <br className="hidden sm:block" />
          <SplitText
            text="Projektowanie Graficzne"
            as="span"
            delay={0.4}
            stagger={0.03}
            className="inline-block"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl"
        >
          Witaj na pokładzie kreatywnej podróży. Wchodzisz na teren
          nieograniczonych możliwości twórczych.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton
            href="#portfolio"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-black transition-all hover:bg-cyan-300"
          >
            Zobacz portfolio
          </MagneticButton>
          <MagneticButton
            href="#kontakt"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            Skontaktuj się
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
