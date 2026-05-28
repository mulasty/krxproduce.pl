"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function About() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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

  useEffect(() => {
    if (isHovered) {
      sendCommand('{"event":"command","func":"playVideo","args":""}');
    } else {
      sendCommand('{"event":"command","func":"pauseVideo","args":""}');
    }
  }, [isHovered, sendCommand]);

  return (
    <section
      id="omnie"
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video background */}
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/Q64fpFz0UAU?si=aQXXbakNpKhX3rS5&mute=1&start=0&enablejsapi=1&loop=1&playlist=Q64fpFz0UAU"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full object-cover"
        ></iframe>
      </div>

      {/* Bright overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      <div className="absolute inset-0 bg-black/10" />

      {/* Controls */}
      <div className="absolute right-6 top-6 z-30 flex items-center gap-3">
        <button
          onClick={() => setIsHovered(!isHovered)}
          aria-label={isHovered ? "Pauza" : "Odtwarzaj"}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-110 border border-white/20"
        >
          {isHovered ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={toggleMute}
          aria-label={muted ? "Włącz dźwięk" : "Wyłącz dźwięk"}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-110 border border-white/20"
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

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
          <div className="mt-8 space-y-5 text-lg text-neutral-100 leading-relaxed">
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
