"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "KRX Produce wykonał niesamowitą pracę przy naszym filmie promocyjnym. Profesjonalizm, kreatywność i terminowość na najwyższym poziomie!",
    author: "Marta Kowalska",
    role: "CEO, FreshBrand",
  },
  {
    quote:
      "Projekty graficzne od KRX Produce to prawdziwe dzieła sztuki. Nasza identyfikacja wizualna zyskała nowy wymiar.",
    author: "Tomasz Nowak",
    role: "Marketing Director, SportFit",
  },
  {
    quote:
      "Współpraca z KRX Produce to czysta przyjemność. Każdy projekt jest dopracowany w najmniejszym szczególe.",
    author: "Anna Wiśniewska",
    role: "Founder, CreativeLab",
  },
  {
    quote:
      "Montaż i postprodukcja na światowym poziomie. Efekty przerosły nasze oczekiwania. Polecam każdemu!",
    author: "Piotr Lewandowski",
    role: "Production Lead, MediaHouse",
  },
  {
    quote:
      "Świetne podejście do klienta i niesamowita dbałość o detale. Efekty mówią same za siebie.",
    author: "Katarzyna Zielińska",
    role: "Brand Manager, EcoLife",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      id="opinie"
      ref={containerRef}
      className="section-gradient section-grid relative py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/5 blur-[150px]" />

      <div className="relative mx-auto mb-16 max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Opinie
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Co mówią klienci
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll carousel */}
      <motion.div
        ref={carouselRef}
        style={{ x }}
        className="flex gap-6 px-6 will-change-transform"
      >
        {testimonials.concat(testimonials).map((t, i) => (
          <motion.div
            key={`${t.author}-${i}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % testimonials.length) * 0.1 }}
            className="min-w-[350px] max-w-[400px] shrink-0 rounded-2xl border border-white/10 bg-surface p-8"
          >
            <Quote size={28} className="mb-4 text-accent/40" />
            <p className="mb-6 leading-relaxed text-neutral-300">&ldquo;{t.quote}&rdquo;</p>
            <div>
              <p className="font-semibold text-white">{t.author}</p>
              <p className="text-sm text-neutral-500">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
