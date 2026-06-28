"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudio } from "./audio-system";

const navLinks = [
  { label: "Usługi", href: "#uslugi" },
  { label: "O mnie", href: "#omnie" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Opinie", href: "#opinie" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isPlaying, toggle: toggleAudio } = useAudio();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="text-base font-bold tracking-normal">
          KRX<span className="font-normal text-neutral-500"> Produce</span>
        </a>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-xs tracking-widest text-neutral-500 transition-colors hover:text-white uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={toggleAudio}
            aria-label={isPlaying ? "Mute ambient" : "Play ambient"}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300",
              isPlaying
                ? "border-white/20 bg-white/10 text-white"
                : "border-transparent text-neutral-600 hover:text-white/50"
            )}
          >
            {isPlaying ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          <button
            className="md:hidden text-white/70"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="flex flex-col gap-5 px-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-widest text-neutral-500 transition-colors hover:text-white uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
