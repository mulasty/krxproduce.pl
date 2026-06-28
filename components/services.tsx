"use client";

import { motion } from "framer-motion";
import { Palette, Sparkles, Fingerprint, Clapperboard } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Projektowanie Graficzne",
    description:
      "Unikalne projekty graficzne, które wyróżniają Twoją markę. Od logo po materiały marketingowe — dbam o każdy detal.",
  },
  {
    icon: Sparkles,
    title: "Animacja i Efekty",
    description:
      "Dynamiczne i porywające animacje, które przyciągną uwagę Twojej publiczności i wzmocnią przekaz.",
  },
  {
    icon: Fingerprint,
    title: "Identyfikacja Wizualna",
    description:
      "Spójne i zapadające w pamięć identyfikacje wizualne, które będą reprezentować charakter Twojej marki na każdym kroku.",
  },
  {
    icon: Clapperboard,
    title: "Montaż Filmowy",
    description:
      "Niezależnie od tego, czy to reklama, film korporacyjny czy vlog — zapewniam profesjonalną postprodukcję na światowym poziomie.",
  },
];

export default function Services() {
  return (
    <section id="uslugi" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Oferta
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Moje usługi
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-400">
            Zapoznaj się z usługami, które mogę dla Ciebie przygotować
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-8 transition-colors hover:border-accent/30 hover:bg-surface-elevated"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <service.icon size={24} />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                {service.description}
              </p>
              <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-accent/5 blur-2xl transition-all group-hover:bg-accent/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
