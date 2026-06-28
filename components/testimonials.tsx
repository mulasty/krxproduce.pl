"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Współpraca z Panem Mateuszem to czysta przyjemność i fascynująca przygoda, przez jego zdolność zrozumienia potrzeb klienta i precyzyjne sprecyzowanie oczekiwań. Gorąco polecam.",
    author: "Wojciech Kłos",
    role: "Właściciel firmy",
  },
  {
    text: "Profesjonalne podejście do Klienta. Jego wizytówki to arcydzieło: elegancja, precyzja, szybkość. Komunikacja bez zarzutu. Gorąco polecam – firma zyskała nowy wymiar!",
    author: "Dominika Kuć",
    role: "Manager restauracji",
  },
  {
    text: "Genialne bannery na social media! Super kreacje idealnie oddające charakter restauracji. Kreatywność, profesjonalizm i zrozumienie branży w jednym. Szybka współpraca, efekty powalające!",
    author: "Łukasz Pawlicz",
    role: "Marketing Manager",
  },
];

export default function Testimonials() {
  return (
    <section id="opinie" className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent-warm">
            Opinie
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Co mówią klienci
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-8"
            >
              <Quote className="mb-6 h-8 w-8 text-accent/40" />
              <p className="mb-8 text-neutral-300 leading-relaxed">
                &ldquo;{item.text}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-white">{item.author}</div>
                <div className="text-sm text-neutral-500">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
