"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="omnie" className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-warm/5 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent-warm">
            O mnie
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Kilka słów o mnie
          </h2>
          <div className="mt-8 space-y-5 text-neutral-400 leading-relaxed">
            <p>
              Jestem doświadczonym grafikiem zajmującym się tą dziedziną od
              wielu lat. Moje doświadczenie obejmuje pracę zarówno w agencjach
              reklamowych, jak i w firmach powiązanych z tą branżą.
            </p>
            <p>
              Posiadam szeroką wiedzę na temat reklamy wizualnej oraz
              umiejętność przygotowania plików pod druk. Chętnie zaproponuję
              Ci ciekawą i przyciągającą oko szatę graficzną.
            </p>
            <p>
              Moje umiejętności obejmują projektowanie wizytówek, ulotek,
              plakatów, banerów, logotypów oraz materiałów do mediów
              społecznościowych. Zajmuję się również filmowaniem,
              postprodukcją, reklamami video oraz montażem.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
