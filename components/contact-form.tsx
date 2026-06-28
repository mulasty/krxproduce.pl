"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20";

  const labelClass = "mb-2 block text-sm font-medium tracking-wide text-white/60 uppercase";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelClass}>Imię i nazwisko</label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          id="contact-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Jan Kowalski"
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelClass}>Email</label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          id="contact-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="jan@example.com"
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className={labelClass}>Telefon (opcjonalnie)</label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          id="contact-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+48 123 456 789"
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClass}>Wiadomość</label>
        <motion.textarea
          whileFocus={{ scale: 1.01 }}
          id="contact-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Opisz swój projekt..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/30 disabled:opacity-60"
      >
        <AnimatePresence mode="wait">
          {status === "loading" ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Wysyłanie...
            </motion.span>
          ) : (
            <motion.span
              key="send"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Send size={18} className="transition-transform group-hover:translate-x-1" />
              Wyślij wiadomość
            </motion.span>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 -z-10 translate-y-full bg-white/10 transition-transform group-hover:translate-y-0" />
      </motion.button>

      {/* Status messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 rounded-xl bg-green-500/10 px-5 py-4 text-green-400"
          >
            <CheckCircle size={20} />
            <span className="text-sm">Wiadomość wysłana! Skontaktujemy się wkrótce.</span>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 rounded-xl bg-red-500/10 px-5 py-4 text-red-400"
          >
            <AlertCircle size={20} />
            <span className="text-sm">{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
