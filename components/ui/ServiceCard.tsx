"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Wrench,
  Cog,
  Settings2,
  Timer,
  ScanLine,
  Wind,
  Gauge,
  Circle,
  ClipboardCheck,
} from "lucide-react";
import type { Service } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Cog,
  Settings2,
  Timer,
  ScanLine,
  Wind,
  Gauge,
  Circle,
  ClipboardCheck,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const shouldReduce = useReducedMotion();
  const Icon = iconMap[service.icon] ?? Wrench;

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0, 0, 0.2, 1],
      }}
      className="group relative bg-[#1a1a1a] border border-[#242424] rounded-md p-7 flex flex-col gap-4 transition-all duration-200 ease-out hover:bg-[#1e1e1e] hover:border-l-[3px] hover:border-l-[#c41e1e] focus-within:outline-2 focus-within:outline-[#c41e1e]"
    >
      <Icon
        size={28}
        className="text-[#c41e1e] transition-opacity duration-200 group-hover:opacity-90"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2">
        <h3
          className="text-2xl font-bold uppercase tracking-[-0.01em] text-[#f5f5f5]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {service.name}
        </h3>
        <p
          className="text-sm text-[#a0a0a0] leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
