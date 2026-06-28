"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="kontakt" className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Kontakt
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Porozmawiajmy
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-400">
            Masz pytanie lub chcesz się spotkać? Skontaktuj się ze mną już dziś,
            a z przyjemnością odpowiem na Twoje pytania i pomogę Ci we
            wszystkich sprawach związanych z projektem.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          <motion.a
            href="mailto:kontakt@krxproduce.pl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center rounded-2xl border border-white/10 bg-surface p-8 text-center transition-colors hover:border-accent/30"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Mail size={22} />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-white">E-mail</h3>
            <p className="text-sm text-neutral-400">kontakt@krxproduce.pl</p>
          </motion.a>

          <motion.a
            href="tel:+48601477510"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center rounded-2xl border border-white/10 bg-surface p-8 text-center transition-colors hover:border-accent/30"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-warm/10 text-accent-warm">
              <Phone size={22} />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-white">Telefon</h3>
            <p className="text-sm text-neutral-400">+48 601 477 510</p>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center rounded-2xl border border-white/10 bg-surface p-8 text-center transition-colors hover:border-accent/30"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white">
              <MapPin size={22} />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-white">Lokalizacja</h3>
            <p className="text-sm text-neutral-400">Polska / Zdalnie</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
