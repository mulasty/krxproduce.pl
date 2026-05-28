"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const images = [
  { src: "/images/portfolio/Dzieciaki.jpg", size: "col-span-1 row-span-2" },
  { src: "/images/portfolio/ICE-CREAM-day.jpg", size: "col-span-1 row-span-1" },
  { src: "/images/portfolio/Isotonic-baner.jpg", size: "col-span-1 row-span-1" },
  { src: "/images/portfolio/Grandpa-DAY.jpg", size: "col-span-1 row-span-1" },
  { src: "/images/portfolio/keep-sleep-shot.jpg", size: "col-span-1 row-span-2" },
  { src: "/images/portfolio/strawberry-jjelly-small.png", size: "col-span-1 row-span-1" },
  { src: "/images/portfolio/wiosenne-promo.jpg", size: "col-span-1 row-span-1" },
  { src: "/images/portfolio/WPI-saszetki-banner-1080x1080-.jpg", size: "col-span-1 row-span-1" },
  { src: "/images/portfolio/post-ojca.jpg", size: "col-span-1 row-span-2" },
  { src: "/images/portfolio/L-carnitine-5000.jpg", size: "col-span-1 row-span-1" },
  { src: "/images/portfolio/Peanut-Butter-protein.jpg", size: "col-span-1 row-span-1" },
  { src: "/images/portfolio/1080x1080-kopia.jpg", size: "col-span-1 row-span-1" },
];

const videos = [
  "https://www.youtube.com/embed/cV4d65AP3qU?si=A1etxxavT-1rPLzT",
  "https://www.youtube.com/embed/5GbnT_Z6CD0?si=E3rjJkCtdsDJpIfn",
  "https://www.youtube.com/embed/P6Q-Ae8NcLo?si=LL27Jbi9hLEE05vx",
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Portfolio
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Przykładowe projekty
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-400">
            Zobacz wybrane realizacje, które łączą estetykę z funkcjonalnością
          </p>
        </motion.div>

        <div className="grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, index) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-surface ${img.size}`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100">
                <ArrowUpRight size={18} />
              </div>
            </motion.div>
          ))}

          {videos.map((videoUrl, index) => (
            <motion.div
              key={videoUrl}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (images.length + index) * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface col-span-1 row-span-2"
            >
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full"
              ></iframe>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
