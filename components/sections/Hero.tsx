"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Phone, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const [chevronVisible, setChevronVisible] = useState(true);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setChevronVisible(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-svh flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8 lg:px-12 py-20 md:py-32 text-center">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          {/* Pre-label */}
          <span
            className="text-[#c41e1e] text-sm font-medium uppercase tracking-[0.12em]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            VW / Audi Specialist &middot; Finglas, Dublin
          </span>

          {/* Main headline — single h1 on page */}
          <h1
            className="text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] xl:text-[6.5rem] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#f5f5f5] max-w-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Expert Car Repairs in Dublin
          </h1>

          {/* Sub-headline */}
          <p
            className="text-base md:text-lg text-[#a0a0a0] max-w-md leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Family-run garage. VW and Audi specialists. Trusted by North Dublin drivers for honest, quality work.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mt-2">
            <a
              href="tel:018340938"
              className="flex items-center justify-center gap-2 bg-[#c41e1e] text-[#0a0a0a] text-sm font-semibold uppercase tracking-[0.08em] px-7 py-[14px] rounded min-h-[52px] w-full sm:w-auto transition-all duration-150 ease-in-out hover:bg-[#a01818] hover:scale-[1.02] active:scale-[0.98]"
              style={{ fontFamily: "var(--font-body)" }}
              aria-label="Call 01 834 0938"
            >
              <Phone size={16} aria-hidden="true" />
              Call 01 834 0938
            </a>
            <a
              href="mailto:info@oconnorcars.ie"
              className="flex items-center justify-center gap-2 bg-transparent border-2 border-[#f5f5f5] text-[#f5f5f5] text-sm font-semibold uppercase tracking-[0.08em] px-7 py-[14px] rounded min-h-[52px] w-full sm:w-auto transition-all duration-150 ease-in-out hover:border-[#c41e1e] hover:text-[#c41e1e] active:scale-[0.98]"
              style={{ fontFamily: "var(--font-body)" }}
              aria-label="Email us at info@oconnorcars.ie"
            >
              <Mail size={16} aria-hidden="true" />
              Email Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll chevron */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${
          chevronVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <ChevronDown
          size={28}
          className={`text-[#a0a0a0] ${shouldReduce ? "" : "animate-[bob_2s_ease-in-out_infinite]"}`}
        />
      </div>
    </section>
  );
}
