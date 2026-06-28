"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./magnetic-button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current?.querySelectorAll(".word") || [],
      { y: 80, opacity: 0, rotateX: -40 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.08 }
    );
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );
    tl.fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      "-=0.3"
    );
  }, []);

  const splitTitle = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block overflow-hidden mr-[0.3em]">
        <span className="inline-block">{word}</span>
      </span>
    ));

  return (
    <section
      id="hero"
      ref={container}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Video background - subtle, dark */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        style={{ filter: "brightness(0.5) contrast(1.2) saturate(0.8)" }}
        aria-hidden="true"
      >
        <source src="/videos/7963111-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-neutral-400 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Creative Studio — Poland
        </motion.div>

        <h1
          ref={titleRef}
          className="text-6xl font-bold leading-[1.05] tracking-tight text-white sm:text-8xl lg:text-9xl"
        >
          {splitTitle("KRX")}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-accent-warm">
            {splitTitle("Produce")}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mx-auto mt-8 max-w-xl text-base text-neutral-500 sm:text-lg"
        >
          Film & Design Studio
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton
            href="#portfolio"
            className="hero-cta inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-sm font-medium text-black transition-all hover:bg-neutral-200"
          >
            View work
          </MagneticButton>
          <MagneticButton
            href="#kontakt"
            className="hero-cta inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-medium text-white/70 backdrop-blur-sm transition-all hover:border-white/30 hover:text-white"
          >
            Get in touch
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-8 w-[14px] items-start justify-center rounded-full border border-white/20 p-1">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-1.5 w-[3px] rounded-full bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
