import { Hero } from "@/components/sections/Hero";
import { WhyMatters } from "@/components/sections/WhyMatters";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { Team } from "@/components/sections/Team";
import { About } from "@/components/sections/About";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyMatters />
      <Projects />
      <Services />
      <Process />
      <Faq />
      <Team />
      <About />
      <CtaBand />
      <Contact />
    </>
  );
}
