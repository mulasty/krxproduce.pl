"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "./contact-form";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
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

  const contactInfo = [
    { label: "Email", value: "kontakt@krxproduce.pl", href: "mailto:kontakt@krxproduce.pl" },
    { label: "Phone", value: "+48 509 379 206", href: "tel:+48509379206" },
    { label: "Location", value: "Warsaw / Remote" },
  ];

  return (
    <section id="kontakt" ref={container} className="section-glass relative z-[1] py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-xl">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let&apos;s talk</h2>
          <p className="section-subtitle">
            Have a project in mind? We&apos;d love to hear about it
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Form */}
          <div className="contact-item">
            <ContactForm />
          </div>

          {/* Info */}
          <div className="contact-item flex flex-col justify-between gap-10">
            <div className="space-y-8">
              {contactInfo.map((info) => (
                <div key={info.label}>
                  <p className="mb-1 text-xs tracking-widest text-neutral-600 uppercase">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-lg text-white/70 transition-colors hover:text-white"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-lg text-white/70">{info.value}</p>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-neutral-700">
              &copy; {new Date().getFullYear()} KRX Produce. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
