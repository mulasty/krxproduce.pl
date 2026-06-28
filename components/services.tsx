"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Sparkles, Fingerprint, Clapperboard } from "lucide-react";
import TiltCard from "./tilt-card";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Unique designs that make your brand stand out. From logos to marketing materials — every detail matters.",
    gradient: "from-cyan-500/10 to-blue-500/5",
  },
  {
    icon: Sparkles,
    title: "Animation & VFX",
    description: "Dynamic animations and visual effects that captivate your audience and amplify your message.",
    gradient: "from-amber-500/10 to-orange-500/5",
  },
  {
    icon: Fingerprint,
    title: "Brand Identity",
    description: "Cohesive visual identities that represent your brand's character at every touchpoint.",
    gradient: "from-cyan-500/10 to-amber-500/5",
  },
  {
    icon: Clapperboard,
    title: "Film Editing",
    description: "Professional post-production for commercials, corporate films, and video content at a world-class level.",
    gradient: "from-blue-500/10 to-cyan-500/5",
  },
];

export default function Services() {
  const container = useRef<HTMLElement>(null);
  const cards = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="uslugi" ref={container} className="section-glass relative z-[1] py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-xl">
          <span className="section-label">Services</span>
          <h2 className="section-title">What we do</h2>
          <p className="section-subtitle">
            We craft visual experiences that blend creativity with technical precision
          </p>
        </div>

        <div ref={cards} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <TiltCard
              key={service.title}
              className="service-card group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/[0.04]"
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} border border-white/[0.06]`}>
                <service.icon size={20} className="text-white/80" />
              </div>
              <h3 className="mb-3 text-base font-medium text-white/90">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">
                {service.description}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
