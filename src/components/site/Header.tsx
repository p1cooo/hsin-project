import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, waGreeting, waLink } from "@/lib/site-config";
import { useLang } from "@/lib/i18n";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/lib/utils";

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="flex rounded-full border border-navy/20 p-0.5 text-xs font-medium">
      {(["en", "zh"] as const).map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}
          className={cn("rounded-full px-3 py-1.5 transition-colors", lang === l ? "bg-navy text-navy-foreground" : "text-navy hover:text-primary")}>
          {l === "en" ? "EN" : "中文"}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const enquire = t({ en: "Enquire Now", zh: "立即咨询" });
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 bg-ivory/95 backdrop-blur transition-all duration-300", scrolled ? "border-b border-border shadow-soft" : "border-b border-transparent")}>
      <div className="container-x flex h-18 items-center justify-between gap-4 py-3 xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <a href="#home" aria-label="Hsin Travel — back to top" className="shrink-0 xl:justify-self-start"><Logo /></a>
        <nav aria-label="Main" className="hidden items-center gap-6 whitespace-nowrap xl:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="group relative text-sm font-medium text-navy transition-colors hover:text-primary">
              {t(l.label)}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3 xl:justify-self-end">
          <div className="hidden sm:block"><LangToggle /></div>
          <a href="#enquiry" className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy md:inline-flex">{enquire}</a>
          <button className="flex h-11 w-11 items-center justify-center rounded-full text-navy xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4.5rem)] overflow-auto border-t border-border bg-ivory xl:hidden">
          <nav aria-label="Mobile" className="container-x flex flex-col pt-6 pb-10">
            <div className="mb-4 sm:hidden"><LangToggle /></div>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-border py-4 font-display text-2xl text-navy">{t(l.label)}</a>
            ))}
            <a href="#enquiry" onClick={() => setOpen(false)} className="mt-8 rounded-full bg-primary py-4 text-center font-medium text-primary-foreground">{enquire}</a>
            <a href={waLink(waGreeting(lang))} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-full border border-navy/30 py-4 font-medium text-navy"><WhatsAppIcon size={18} /> WhatsApp</a>
          </nav>
        </div>
      )}
    </header>
  );
}
