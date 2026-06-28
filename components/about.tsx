"use client";

import { useRef, useState, useCallback, useEffect } from "react";
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
        "https://www.youtube.com/embed/Q64fpFz0UAU?si=aQXXbakNpKhX3rS5&autoplay=1&mute=1&start=0&enablejsapi=1&loop=1&playlist=Q64fpFz0UAU&controls=0&modestbranding=1&rel=0&iv_load_policy=3"
      );
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="omnie" className="section-glass relative z-[1] overflow-hidden py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-xl">
          <span className="section-label">About</span>
          <h2 className="section-title">The studio</h2>
          <p className="section-subtitle">
            We combine filmmaking and graphic design to create compelling visual stories
          </p>
        </div>

        {/* Video */}
        <div className="relative mx-auto mb-20 max-w-5xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/[0.06] bg-black/40">
            <iframe
              ref={iframeRef}
              src={videoSrc}
              title="KRX Produce — showreel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-full w-full"
              style={{ filter: "brightness(1.2) contrast(1.05)" }}
            />

            {/* Controls */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-md transition-all hover:bg-black/70 hover:text-white"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-md transition-all hover:bg-black/70 hover:text-white"
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-neutral-400">
            Experienced graphic designer with years of work in advertising agencies
            and brand-related companies. Specializing in visual advertising, print
            preparation, and eye-catching graphic design.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {["Branding", "Print", "Motion", "Video"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-2 text-xs tracking-wider text-neutral-500 uppercase"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
