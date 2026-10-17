import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { BackToTop, Divisions, Faq, FloatingWhatsApp, Footer, Hero, Tours, VanServices } from "@/components/site/Sections";
import { Fleet } from "@/components/site/Fleet";
import { Enquiry, type EnquiryPreset } from "@/components/site/Enquiry";
import { LangProvider } from "@/lib/i18n";
import type { VanServiceId } from "@/lib/site-config";
import { useReveal } from "@/hooks/use-reveal";

const title = "Hsin Travel & Tours | Tours, Van Rental & Airport Transfers";
const description =
  "Group tours, tourist van rental and airport transfers across Malaysia, Singapore and Thailand with Hsin Travel & Tours, Kuala Lumpur.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LangProvider>
      <Index />
    </LangProvider>
  ),
});

function Index() {
  const [preset, setPreset] = useState<EnquiryPreset | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 800);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const go = (p: Omit<EnquiryPreset, "nonce">) => {
    setPreset({ ...p, nonce: Date.now() });
    setTimeout(() => document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" }), 30);
  };
  const onVan = () => go({ tab: "van" });

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-card focus:px-4 focus:py-2">Skip to content</a>
      <Header />
      <main id="main">
        <Hero onVan={onVan} />
        <Divisions onVan={onVan} />
        <Tours onSelect={(destination) => go({ tab: "tour", destination })} />
        <VanServices onSelect={(service: VanServiceId) => go({ tab: "van", service })} />
        <Fleet onEnquire={(vehicle) => go({ tab: "van", vehicle })} />
        <Enquiry preset={preset} />
        <Faq />
      </main>
      <Footer />
      <BackToTop show={scrolled} />
      <FloatingWhatsApp />
    </>
  );
}
