"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function About() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");

  const sendCommand = useCallback((command: string) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(command, "*");
  }, []);

  const toggleMute = useCallback(() => {
    sendCommand(
      muted
        ? '{"event":"command","func":"unMute","args":""}'
        : '{"event":"command","func":"mute","args":""}'
    );
    setMuted(!muted);
  }, [muted, sendCommand]);

  const togglePlay = useCallback(() => {
    sendCommand(
      isPlaying
        ? '{"event":"command","func":"pauseVideo","args":""}'
        : '{"event":"command","func":"playVideo","args":""}'
    );
    setIsPlaying(!isPlaying);
  }, [isPlaying, sendCommand]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoSrc(
        "https://www.youtube.com/embed/Q64fpFz0UAU?si=aQXXbakNpKhX3rS5&autoplay=1&mute=1&start=0&enablejsapi=1&loop=1&playlist=Q64fpFz0UAU"
      );
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="omnie" className="relative overflow-hidden">
      {/* Hero 2 — Video on top */}
      <div className="relative w-full">
        <div className="mx-auto aspect-video w-full max-w-6xl overflow-hidden rounded-none sm:rounded-2xl sm:my-8">
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-full w-full"
          ></iframe>
        </div>

        {/* Controls on video */}
        <div className="absolute right-4 top-4 z-30 flex items-center gap-3 sm:right-8 sm:top-8">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pauza" : "Odtwarzaj"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-110 border border-white/10"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Włącz dźwięk" : "Wyłącz dźwięk"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-110 border border-white/10"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>

      {/* Text below video */}
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
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
          <div className="mt-8 space-y-5 text-lg text-neutral-300 leading-relaxed">
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
