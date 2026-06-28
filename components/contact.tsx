"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./contact-form";

export default function Contact() {
  return (
    <section id="kontakt" className="section-gradient relative py-32 overflow-hidden">
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

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ContactForm />
          </motion.div>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center gap-6"
          >
            <motion.a
              href="mailto:kontakt@krxproduce.pl"
              whileHover={{ y: -4 }}
              className="flex items-center gap-6 rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-accent/30"
            >
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">E-mail</h3>
                <p className="text-sm text-neutral-400">kontakt@krxproduce.pl</p>
              </div>
            </motion.a>

            <motion.a
              href="tel:+48601477510"
              whileHover={{ y: -4 }}
              className="flex items-center gap-6 rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-accent-warm/30"
            >
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-warm/10 text-accent-warm">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Telefon</h3>
                <p className="text-sm text-neutral-400">+48 601 477 510</p>
              </div>
            </motion.a>

            <motion.div
              whileHover={{ y: -4 }}
              className="flex items-center gap-6 rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-white/20"
            >
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Lokalizacja</h3>
                <p className="text-sm text-neutral-400">Polska / Zdalnie</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
