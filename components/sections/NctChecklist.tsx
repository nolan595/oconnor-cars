import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChecklistItem } from "@/components/ui/ChecklistItem";
import { NCT_CHECKLIST } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function NctChecklist() {
  return (
    <section
      id="nct"
      className="bg-[#0a0a0a] py-[60px] md:py-[80px]"
      aria-labelledby="nct-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8 lg:px-12">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-10 md:mb-14">
            <SectionHeading
              id="nct-heading"
              heading="NCT Pre-Check Guide"
              subCopy="Preparing properly means fewer surprises on the day. Run through these ten checks before your test."
              align="left"
            />
          </div>

          <ul role="list" className="flex flex-col divide-y-0">
            {NCT_CHECKLIST.map((item, index) => (
              <ChecklistItem key={item.id} item={item} index={index} />
            ))}
          </ul>

          {/* Callout */}
          <div
            className="mt-8 bg-[#1a1a1a] border-l-4 border-l-[#c41e1e] p-5 rounded-r-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <p className="italic text-[#a0a0a0] text-base leading-relaxed">
              Not sure if your car is ready? We offer a full pre-NCT inspection.
            </p>
            <a
              href="tel:018340938"
              className="inline-flex items-center gap-1.5 text-[#c41e1e] text-sm font-semibold mt-3 transition-opacity duration-150 hover:opacity-80"
              aria-label="Book an inspection — call 01 834 0938"
            >
              Book an inspection
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
