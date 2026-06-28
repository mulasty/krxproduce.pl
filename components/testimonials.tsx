"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "KRX Produce delivered an outstanding promotional film. Professionalism, creativity, and timeliness at the highest level!",
    author: "Marta Kowalska",
    role: "CEO, FreshBrand",
  },
  {
    quote: "The graphic designs from KRX Produce are true works of art. Our visual identity gained a whole new dimension.",
    author: "Tomasz Nowak",
    role: "Marketing Director, SportFit",
  },
  {
    quote: "Working with KRX Produce is a pure pleasure. Every project is refined to the smallest detail.",
    author: "Anna Wiśniewska",
    role: "Founder, CreativeLab",
  },
  {
    quote: "Editing and post-production at a world-class level. The results exceeded our expectations.",
    author: "Piotr Lewandowski",
    role: "Production Lead, MediaHouse",
  },
  {
    quote: "Great client approach and incredible attention to detail. The results speak for themselves.",
    author: "Katarzyna Zielińska",
    role: "Brand Manager, EcoLife",
  },
];

export default function Testimonials() {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = track.current?.querySelectorAll(".testimonial-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 75%",
            },
          }
        );
      }
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="opinie" ref={container} className="section-glass relative z-[1] py-40 overflow-hidden">
      <div className="mx-auto mb-20 max-w-7xl px-6">
        <div className="max-w-xl">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Client words</h2>
          <p className="section-subtitle">
            What people say about working with us
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={track}
          className="flex gap-5 overflow-x-auto px-6 pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {testimonials.concat(testimonials).map((t, i) => (
            <div
              key={`${t.author}-${i}`}
              className="testimonial-card min-w-[340px] max-w-[380px] shrink-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm"
            >
              <svg className="mb-5 h-6 w-6 text-white/10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>
              <p className="mb-6 text-sm leading-relaxed text-neutral-400">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-medium text-white/80">{t.author}</p>
                <p className="text-xs text-neutral-600">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
