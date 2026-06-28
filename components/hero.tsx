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
  const creditsRef = useRef<HTMLDivElement>(null);

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

    gsap.fromTo(
      creditsRef.current?.querySelectorAll(".hero-credit") || [],
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, delay: 0.8, ease: "power3.out" }
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-100"
        style={{ filter: "brightness(1.55) contrast(1.12) saturate(1.06)" }}
        aria-hidden="true"
      >
        <source src="/videos/7963111-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.84),rgba(0,0,0,0.28)_45%,rgba(0,0,0,0.74))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/88" />
      <div className="pointer-events-none absolute inset-0 hero-grain opacity-[0.13]" />
      <div className="pointer-events-none absolute inset-x-6 top-24 bottom-10 hidden rounded-[2rem] border border-white/[0.07] md:block" />
      <div className="pointer-events-none absolute left-8 top-28 hidden h-14 w-14 border-l border-t border-white/20 md:block" />
      <div className="pointer-events-none absolute right-8 bottom-16 hidden h-14 w-14 border-b border-r border-white/20 md:block" />

      <div ref={creditsRef} className="pointer-events-none absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-8 md:flex">
        {[
          ["DISCIPLINE", "FILM / DESIGN / MOTION"],
          ["FRAME RATE", "25 FPS CINEMATIC"],
          ["LOCATION", "POLAND / REMOTE"],
        ].map(([label, value]) => (
          <div key={label} className="hero-credit max-w-[150px]">
            <p className="mb-2 text-[10px] tracking-[0.28em] text-white/30">{label}</p>
            <p className="text-xs leading-relaxed text-white/62">{value}</p>
          </div>
        ))}
      </div>

      <div className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 md:block">
        <div className="flex h-[280px] w-px flex-col justify-between bg-white/10">
          <span className="h-10 w-px bg-cyan-300/80" />
          <span className="h-16 w-px bg-amber-300/60" />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 px-6 pt-28 md:grid-cols-[1fr_320px] md:pt-20">
        <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/25 px-4 py-1.5 text-xs text-white/68 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Creative studio / film / identity
        </motion.div>

        <h1
          ref={titleRef}
          className="text-left text-[17vw] font-black leading-[0.78] tracking-[-0.09em] text-white sm:text-[15vw] lg:text-[11rem]"
        >
          {splitTitle("KRX")}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-amber-200">
            {splitTitle("Produce")}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-8 max-w-xl text-left text-base leading-relaxed text-white/58 sm:text-lg"
        >
          Cinematic visuals, graphic systems and motion assets for brands that need to look impossible to ignore.
        </p>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row">
          <MagneticButton
            href="#portfolio"
            className="hero-cta inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black shadow-[0_0_50px_rgba(255,255,255,0.18)] transition-all hover:bg-cyan-100"
          >
            View work
          </MagneticButton>
          <MagneticButton
            href="#kontakt"
            className="hero-cta inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-black/20 px-8 text-sm font-medium text-white/72 backdrop-blur-sm transition-all hover:border-white/35 hover:text-white"
          >
            Get in touch
          </MagneticButton>
        </div>
      </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
          className="hidden rounded-3xl border border-white/[0.08] bg-black/28 p-5 backdrop-blur-xl md:block"
        >
          <div className="mb-8 flex items-center justify-between text-[10px] tracking-[0.24em] text-white/35 uppercase">
            <span>KRX INDEX</span>
            <span>LIVE</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["12+", "years visual craft"],
              ["4K", "film-ready assets"],
              ["360", "brand coverage"],
              ["01", "single studio flow"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/[0.06] bg-white/[0.035] p-4">
                <p className="text-2xl font-semibold tracking-tight text-white">{value}</p>
                <p className="mt-2 text-[11px] leading-tight text-white/42">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-y border-white/[0.06] bg-black/25 py-3 backdrop-blur-md">
        <div className="hero-marquee flex w-max gap-8 text-[11px] uppercase tracking-[0.32em] text-white/40">
          {Array.from({ length: 2 }).map((_, group) => (
            <span key={group} className="flex gap-8">
              <span>Film Production</span>
              <span>Graphic Design</span>
              <span>Motion Direction</span>
              <span>Brand Identity</span>
              <span>Postproduction</span>
              <span>Campaign Assets</span>
            </span>
          ))}
        </div>
      </div>

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
