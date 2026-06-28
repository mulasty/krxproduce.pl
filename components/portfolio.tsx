"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortfolioLightbox from "./portfolio-lightbox";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: "/images/portfolio/Dzieciaki.jpg", size: "col-span-1 row-span-2", alt: "Children campaign graphic design" },
  { src: "/images/portfolio/ICE-CREAM-day.jpg", size: "col-span-1 row-span-1", alt: "Ice Cream Day promo banner" },
  { src: "/images/portfolio/Isotonic-baner.jpg", size: "col-span-1 row-span-1", alt: "Isotonic drink banner" },
  { src: "/images/portfolio/Grandpa-DAY.jpg", size: "col-span-1 row-span-1", alt: "Grandpa Day promo" },
  { src: "/images/portfolio/keep-sleep-shot.jpg", size: "col-span-1 row-span-2", alt: "Keep Sleep Shot campaign" },
  { src: "/images/portfolio/strawberry-jjelly-small.png", size: "col-span-1 row-span-1", alt: "Strawberry Jelly packaging" },
  { src: "/images/portfolio/wiosenne-promo.jpg", size: "col-span-1 row-span-1", alt: "Spring promotion banner" },
  { src: "/images/portfolio/WPI-saszetki-banner-1080x1080-.jpg", size: "col-span-1 row-span-1", alt: "WPI sachets banner" },
  { src: "/images/portfolio/post-ojca.jpg", size: "col-span-1 row-span-2", alt: "Father's Day social graphic" },
  { src: "/images/portfolio/L-carnitine-5000.jpg", size: "col-span-1 row-span-1", alt: "L-Carnitine 5000 banner" },
  { src: "/images/portfolio/Peanut-Butter-protein.jpg", size: "col-span-1 row-span-1", alt: "Peanut Butter Protein banner" },
  { src: "/images/portfolio/1080x1080-kopia.jpg", size: "col-span-1 row-span-1", alt: "Social media marketing post" },
];

const videos = [
  "https://www.youtube.com/embed/cV4d65AP3qU?si=A1etxxavT-1rPLzT",
  "https://www.youtube.com/embed/5GbnT_Z6CD0?si=E3rjJkCtdsDJpIfn",
  "https://www.youtube.com/embed/P6Q-Ae8NcLo?si=LL27Jbi9hLEE05vx",
];

export default function Portfolio() {
  const container = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".portfolio-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  const lightboxItems = [
    ...images.map((img) => ({ src: img.src, alt: img.alt, type: "image" as const })),
    ...videos.map((url, i) => ({
      src: "",
      alt: `KRX Produce video ${i + 1}`,
      type: "video" as const,
      videoUrl: url,
    })),
  ];

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <section id="portfolio" ref={container} className="section-glass relative z-[1] py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-xl">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Selected work</h2>
          <p className="section-subtitle">
            A curated collection of our best projects
          </p>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, index) => (
            <button
              key={img.src}
              onClick={() => openLightbox(index)}
              className={`portfolio-item group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] text-left ${img.size}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}

          {videos.map((videoUrl, index) => (
            <button
              key={videoUrl}
              onClick={() => openLightbox(images.length + index)}
              className="portfolio-item group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] col-span-1 row-span-2"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-6 w-6">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <PortfolioLightbox
        items={lightboxItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
