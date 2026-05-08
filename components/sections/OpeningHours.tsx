"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OPENING_HOURS, DAY_LABELS, type DayKey } from "@/lib/constants";

const DAY_ORDER: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function getTodayKey(): DayKey {
  const dayIndex = new Date().getDay(); // 0=Sun, 1=Mon ... 6=Sat
  const map: DayKey[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return map[dayIndex];
}

export function OpeningHours() {
  const [todayKey, setTodayKey] = useState<DayKey | null>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    // Intentional: getTodayKey() relies on Date which differs between server and
    // client, so we must resolve it post-hydration to avoid an SSR mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayKey(getTodayKey());
  }, []);

  return (
    <section
      id="hours"
      className="bg-[#111111] py-[60px] md:py-[80px]"
      aria-labelledby="hours-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8 lg:px-12">
        <div className="max-w-[600px] mx-auto">
          <div className="mb-10 md:mb-14">
            <SectionHeading
              id="hours-heading"
              heading="Opening Hours"
              align="center"
            />
          </div>

          <dl className="flex flex-col" aria-label="Opening hours">
            {DAY_ORDER.map((day, index) => {
              const hours = OPENING_HOURS[day];
              const isToday = day === todayKey;
              const isClosed = hours.open === null;

              return (
                <motion.div
                  key={day}
                  initial={shouldReduce ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0, 0, 0.2, 1],
                  }}
                  className={`flex flex-col border-b border-[#242424] last:border-b-0 transition-colors ${
                    isToday
                      ? "bg-[#1a1a1a] border-l-[3px] border-l-[#c41e1e] px-4 py-3 -mx-4 rounded-r-sm"
                      : "py-3"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <dt
                      className={`text-base font-semibold ${
                        isToday
                          ? "text-[#f5f5f5]"
                          : isClosed
                          ? "text-[#666666]"
                          : "text-[#a0a0a0]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {DAY_LABELS[day]}
                      {isToday && (
                        <span className="ml-2 text-xs text-[#c41e1e] font-semibold uppercase tracking-wide">
                          Today
                        </span>
                      )}
                    </dt>
                    <dd
                      className={`text-base font-medium text-right ${
                        isClosed ? "text-[#666666]" : "text-[#f5f5f5]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {isClosed
                        ? "Closed"
                        : `${hours.open} – ${hours.close}`}
                    </dd>
                  </div>

                  {/* Lunch break sub-row */}
                  {!isClosed && hours.lunch && (
                    <div className="flex items-center justify-between mt-1">
                      <span
                        className="text-xs text-[#666666]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Lunch break
                      </span>
                      <span
                        className="text-xs text-[#666666]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {hours.lunch.start} – {hours.lunch.end}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </dl>

          <p
            className="mt-6 text-sm text-[#666666] text-center"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We recommend calling ahead to confirm availability.
          </p>
        </div>
      </div>
    </section>
  );
}
