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
    <section
      id="omnie"
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/Q64fpFz0UAU?si=aQXXbakNpKhX3rS5&autoplay=1&mute=1&start=0&enablejsapi=1&loop=1&playlist=Q64fpFz0UAU"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full object-cover"
        ></iframe>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Sound toggle button */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Włącz dźwięk" : "Wyłącz dźwięk"}
        className="absolute right-6 top-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-110 border border-white/20"
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-4xl px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent-warm">
            O mnie
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Kilka słów o mnie
          </h2>
          <div className="mt-8 space-y-5 text-lg text-neutral-200 leading-relaxed">
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
