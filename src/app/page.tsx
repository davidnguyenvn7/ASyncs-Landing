import { DemoProvider } from "@/components/demo/demo-provider";
import { RevealEffects } from "@/components/reveal-effects";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { LogoWall } from "@/components/sections/logo-wall";
import { Platform } from "@/components/sections/platform";
import { EduDiff } from "@/components/sections/edu-diff";
import { Industries } from "@/components/sections/industries";
import { Dashboard } from "@/components/sections/dashboard";
import { Journey } from "@/components/sections/journey";
import { Testimonials } from "@/components/sections/testimonials";
import { Impact } from "@/components/sections/impact";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <DemoProvider>
      <RevealEffects />
      <Header />
      <main id="top">
        <Hero />
        <LogoWall />
        <Platform />
        <EduDiff />
        <Industries />
        <Dashboard />
        <Journey />
        <Testimonials />
        <Impact />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </DemoProvider>
  );
}
