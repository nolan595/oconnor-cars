"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "NCT Prep", href: "#nct" },
  { label: "Hours", href: "#hours" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const shouldReduce = useReducedMotion();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Prevent scroll when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Focus trap: keep keyboard focus inside the drawer while it is open.
  // On open, move focus into the drawer. On close, return focus to the hamburger.
  useEffect(() => {
    if (!mobileOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusableElements = Array.from(
      drawer.querySelectorAll<HTMLElement>(focusableSelectors)
    );

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    // Move initial focus into the drawer
    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    // Capture ref value at effect run-time so the cleanup uses the stable reference
    const hamburger = hamburgerRef.current;

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Return focus to the button that opened the drawer
      hamburger?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out ${
          scrolled
            ? "bg-[#0a0a0a] border-b border-[#242424]"
            : "bg-transparent"
        }`}
      >
        <nav
          className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8 lg:px-12 flex items-center justify-between h-16 md:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="O'Connor Cars — home"
          >
            <Image
              src="/logo.png"
              alt="O'Connor Cars"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-150 ${
                  activeSection === link.href.slice(1)
                    ? "text-[#c41e1e]"
                    : "text-[#a0a0a0] hover:text-[#c41e1e]"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="tel:018340938"
            className="hidden md:inline-flex items-center gap-2 bg-[#c41e1e] text-[#0a0a0a] text-xs font-semibold uppercase tracking-[0.08em] px-4 py-2.5 rounded min-h-[40px] transition-all duration-150 hover:bg-[#a01818] hover:scale-[1.02] active:scale-[0.98]"
            style={{ fontFamily: "var(--font-body)" }}
            aria-label="Call us on 01 834 0938"
          >
            <Phone size={14} aria-hidden="true" />
            Call Us
          </a>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            className="md:hidden flex items-center justify-center w-12 h-12 text-[#f5f5f5] rounded transition-colors hover:text-[#c41e1e]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={drawerRef}
            id="mobile-nav"
            initial={shouldReduce ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: shouldReduce ? 0 : 0.35, ease: [0, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-[#111111] flex flex-col pt-20 px-6 pb-8"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-2 flex-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={`text-3xl font-bold uppercase py-3 border-b border-[#242424] transition-colors duration-150 ${
                    activeSection === link.href.slice(1)
                      ? "text-[#c41e1e]"
                      : "text-[#f5f5f5] hover:text-[#c41e1e]"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-8">
              <a
                href="tel:018340938"
                className="flex items-center justify-center gap-2 bg-[#c41e1e] text-[#0a0a0a] text-sm font-semibold uppercase tracking-[0.08em] px-6 py-4 rounded min-h-[52px] transition-all duration-150 hover:bg-[#a01818]"
                style={{ fontFamily: "var(--font-body)" }}
                aria-label="Call 01 834 0938"
              >
                <Phone size={16} aria-hidden="true" />
                01 834 0938
              </a>
              <a
                href="tel:0862323335"
                className="flex items-center justify-center gap-2 border-2 border-[#f5f5f5] text-[#f5f5f5] text-sm font-semibold uppercase tracking-[0.08em] px-6 py-4 rounded min-h-[52px] transition-all duration-150 hover:border-[#c41e1e] hover:text-[#c41e1e]"
                style={{ fontFamily: "var(--font-body)" }}
                aria-label="Call 086 232 3335"
              >
                <Phone size={16} aria-hidden="true" />
                086 232 3335
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
