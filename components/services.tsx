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
    meta: "Identity / Print / Campaign",
    gradient: "from-cyan-500/10 to-blue-500/5",
  },
  {
    icon: Sparkles,
    title: "Animation & VFX",
    description: "Dynamic animations and visual effects that captivate your audience and amplify your message.",
    meta: "Motion / Effects / Social",
    gradient: "from-amber-500/10 to-orange-500/5",
  },
  {
    icon: Fingerprint,
    title: "Brand Identity",
    description: "Cohesive visual identities that represent your brand's character at every touchpoint.",
    meta: "Logo / System / Guidelines",
    gradient: "from-cyan-500/10 to-amber-500/5",
  },
  {
    icon: Clapperboard,
    title: "Film Editing",
    description: "Professional post-production for commercials, corporate films, and video content at a world-class level.",
    meta: "Edit / Color / Sound",
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
              className="service-card group relative min-h-[320px] overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.018] p-8 backdrop-blur-sm transition-all hover:border-white/14 hover:bg-white/[0.045]"
            >
              <div className="pointer-events-none absolute -right-3 -top-6 text-[8rem] font-black leading-none tracking-[-0.12em] text-white/[0.025] transition-colors group-hover:text-white/[0.045]">
                0{i + 1}
              </div>
              <div className={`mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} border border-white/[0.08] shadow-[0_0_40px_rgba(34,211,238,0.08)]`}>
                <service.icon size={20} className="text-white/80" />
              </div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-white/28">
                {service.meta}
              </p>
              <h3 className="mb-4 max-w-[10rem] text-xl font-semibold tracking-tight text-white/92">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">
                {service.description}
              </p>
              <div className="absolute bottom-6 left-8 right-8 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan-300/70 to-amber-300/40 transition-transform duration-500 group-hover:scale-x-100" />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
