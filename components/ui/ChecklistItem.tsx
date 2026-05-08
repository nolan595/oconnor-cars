"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { NctChecklistItem } from "@/lib/constants";

interface ChecklistItemProps {
  item: NctChecklistItem;
  index: number;
}

export function ChecklistItem({ item, index }: ChecklistItemProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.li
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0, 0, 0.2, 1],
      }}
      className="flex gap-4 py-4 border-b border-[#242424] last:border-b-0"
    >
      <span
        className="text-[#c41e1e] text-lg font-black min-w-[2rem] leading-none mt-0.5"
        style={{ fontFamily: "var(--font-display)" }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-1" style={{ fontFamily: "var(--font-body)" }}>
        <span className="text-base font-semibold text-[#f5f5f5]">{item.label}</span>
        <span className="text-sm text-[#a0a0a0] leading-relaxed">{item.detail}</span>
      </div>
    </motion.li>
  );
}
