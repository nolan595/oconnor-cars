"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Navigation2, MapPin, Phone, Mail } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BUSINESS_INFO } from "@/lib/constants";

export function Location() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="location"
      className="bg-[#0a0a0a] py-[60px] md:py-[80px]"
      aria-labelledby="location-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8 lg:px-12">
        <div className="mb-10 md:mb-14">
          <SectionHeading
            id="location-heading"
            heading="Find Us"
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Address card */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
            className="bg-[#1a1a1a] border border-[#242424] rounded-md p-8 flex flex-col gap-6"
          >
            <div>
              <h3
                className="text-2xl font-bold uppercase tracking-[-0.01em] text-[#f5f5f5] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {BUSINESS_INFO.name}
              </h3>
              <address
                className="not-italic flex flex-col gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#c41e1e] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div className="text-[#a0a0a0] text-base leading-relaxed">
                    <span className="block">{BUSINESS_INFO.address.street}</span>
                    <span className="block">{BUSINESS_INFO.address.area}</span>
                    <span className="block">{BUSINESS_INFO.address.city}</span>
                    <span className="block">{BUSINESS_INFO.address.eircode}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <Phone size={16} className="text-[#c41e1e] flex-shrink-0" aria-hidden="true" />
                  <div className="flex flex-col gap-0.5">
                    <a
                      href={`tel:${BUSINESS_INFO.phone.landline.replace(/\s/g, "")}`}
                      className="text-[#a0a0a0] text-base hover:text-[#c41e1e] transition-colors duration-150"
                      aria-label={`Call ${BUSINESS_INFO.phone.landline}`}
                    >
                      {BUSINESS_INFO.phone.landline}
                    </a>
                    <a
                      href={`tel:${BUSINESS_INFO.phone.mobile.replace(/\s/g, "")}`}
                      className="text-[#a0a0a0] text-base hover:text-[#c41e1e] transition-colors duration-150"
                      aria-label={`Call ${BUSINESS_INFO.phone.mobile}`}
                    >
                      {BUSINESS_INFO.phone.mobile}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#c41e1e] flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-[#a0a0a0] text-base hover:text-[#c41e1e] transition-colors duration-150"
                    aria-label={`Email ${BUSINESS_INFO.email}`}
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </address>
            </div>

            <a
              href={BUSINESS_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-[#f5f5f5] text-[#f5f5f5] text-sm font-semibold uppercase tracking-[0.08em] px-5 py-3 rounded min-h-[48px] transition-all duration-150 ease-in-out hover:border-[#c41e1e] hover:text-[#c41e1e] self-start"
              style={{ fontFamily: "var(--font-body)" }}
              aria-label="Get directions to O'Connor Cars on Google Maps"
            >
              <Navigation2 size={15} aria-hidden="true" />
              Get Directions
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0, 0, 0.2, 1] }}
            className="overflow-hidden rounded-md border border-[#242424] aspect-[4/3] md:aspect-[16/9]"
          >
            <iframe
              src={BUSINESS_INFO.address.googleMapsEmbedUrl}
              title="O'Connor Cars location map"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
