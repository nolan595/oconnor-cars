"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  preLabel?: string;
  heading: string;
  subCopy?: string;
  align?: "center" | "left";
  id?: string;
}

export function SectionHeading({
  preLabel,
  heading,
  subCopy,
  align = "center",
  id,
}: SectionHeadingProps) {
  const shouldReduce = useReducedMotion();
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      className={`flex flex-col gap-3 ${alignClass}`}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
    >
      {preLabel && (
        <span
          className="text-[#c41e1e] text-xs font-semibold uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {preLabel}
        </span>
      )}
      <h2
        id={id}
        className="text-4xl md:text-5xl font-black uppercase tracking-[-0.02em] leading-none text-[#f5f5f5]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {heading}
      </h2>
      {subCopy && (
        <p
          className="text-base text-[#a0a0a0] max-w-[560px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {subCopy}
        </p>
      )}
    </motion.div>
  );
}
