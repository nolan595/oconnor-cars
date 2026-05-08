"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  index?: number;
}

export function ContactCard({ icon, label, children, index = 0 }: ContactCardProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0, 0, 0.2, 1],
      }}
      className="flex flex-col items-center gap-4 bg-[#1a1a1a] border border-[#242424] rounded-md p-6 text-center transition-all duration-200 ease-out hover:border-[#c41e1e]"
    >
      <div className="text-[#c41e1e]" aria-hidden="true">
        {icon}
      </div>
      <h3
        className="text-xl font-bold uppercase tracking-wider text-[#a0a0a0]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {label}
      </h3>
      <div
        className="text-base font-medium text-[#f5f5f5] flex flex-col gap-1"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
