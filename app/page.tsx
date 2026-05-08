import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { NctChecklist } from "@/components/sections/NctChecklist";
import { OpeningHours } from "@/components/sections/OpeningHours";
import { Location } from "@/components/sections/Location";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <NctChecklist />
        <OpeningHours />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
