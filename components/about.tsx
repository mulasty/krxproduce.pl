"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function About() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const command = muted
      ? '{"event":"command","func":"unMute","args":""}'
      : '{"event":"command","func":"mute","args":""}';

    iframe.contentWindow.postMessage(command, "*");
    setMuted(!muted);
  }, [muted]);

  return (
    <section id="omnie" className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-warm/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
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

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full"
          >
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-accent/10">
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Q64fpFz0UAU?si=aQXXbakNpKhX3rS5&autoplay=1&mute=1&start=0&enablejsapi=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full"
              ></iframe>
            </div>

            {/* Sound toggle button */}
            <button
              onClick={toggleMute}
              aria-label={muted ? "Włącz dźwięk" : "Wyłącz dźwięk"}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-110 border border-white/10"
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
