import LandingNav from "@/components/LandingNav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ReportPreview from "@/components/ReportPreview";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <LandingNav />
      <Hero />
      <Features />
      <ReportPreview />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}