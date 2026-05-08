import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section
      id="services"
      className="bg-[#111111] py-[60px] md:py-[80px]"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8 lg:px-12">
        <div className="mb-12 md:mb-16">
          <SectionHeading
            id="services-heading"
            heading="Our Services"
            subCopy="Full mechanical services for all makes and models, with specialist expertise in Volkswagen and Audi."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
