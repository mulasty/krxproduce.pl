"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frames = [
  {
    title: "Cinematic capture",
    label: "Direction",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=85",
    className: "md:col-span-5 md:row-span-2",
  },
  {
    title: "Precision post",
    label: "Postproduction",
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85",
    className: "md:col-span-3 md:row-span-1",
  },
  {
    title: "Brand systems",
    label: "Design",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    className: "md:col-span-4 md:row-span-1",
  },
  {
    title: "Motion assets",
    label: "Animation",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
    className: "md:col-span-7 md:row-span-1",
  },
];

export default function MoodBoard() {
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mood-frame",
        { y: 70, opacity: 0, clipPath: "inset(12% 0 0 0 round 24px)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0 round 24px)",
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 72%",
          },
        }
      );

      gsap.to(".mood-parallax", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="section-glass relative z-[1] overflow-hidden py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-end">
          <div>
            <span className="section-label">Visual direction</span>
            <h2 className="section-title max-w-3xl">A studio look built like a campaign.</h2>
          </div>
          <p className="text-sm leading-relaxed text-white/45 md:max-w-md md:justify-self-end">
            Film, design, postproduction and motion are treated as one visual system: sharp frames,
            controlled mood, high contrast and assets ready for campaign rollout.
          </p>
        </div>

        <div className="grid auto-rows-[190px] grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[220px]">
          {frames.map((frame, index) => (
            <div
              key={frame.title}
              className={`mood-frame group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] ${frame.className}`}
            >
              <Image
                src={frame.src}
                alt={frame.title}
                fill
                className="mood-parallax scale-110 object-cover opacity-[0.72] transition duration-700 group-hover:scale-[1.16] group-hover:opacity-90"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-black/18" />
              <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-0 group-hover:opacity-100" />
              <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.12]" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5">
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-cyan-200/55">
                    0{index + 1} / {frame.label}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight text-white">{frame.title}</h3>
                </div>
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-xs text-white/60 backdrop-blur-md sm:flex">
                  +
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
