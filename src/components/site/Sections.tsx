import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Bus, Facebook, Plane, Plus, Users, Camera } from "lucide-react";
import { business, images, navLinks, tours, vanServices, waGreeting, waLink, type VanServiceId } from "@/lib/site-config";
import { b, useLang, type Bi } from "@/lib/i18n";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/lib/utils";

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-navy hover:gap-3";
const btnGhostLight =
  "inline-flex items-center justify-center gap-2 rounded-full border border-navy-foreground/50 px-7 py-3.5 text-sm font-medium text-navy-foreground transition-colors hover:bg-navy-foreground hover:text-navy";

/** Chinese supporting line — shown only in English mode to avoid duplication. */
export function ZhLine({ children, light }: { children: ReactNode; light?: boolean }) {
  const { lang } = useLang();
  if (lang === "zh") return null;
  return <p lang="zh-Hans" className={cn("mt-2 font-display text-xl", light ? "text-sun" : "text-primary")}>{children}</p>;
}

export function Hero({ onVan }: { onVan: () => void }) {
  const { t } = useLang();
  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <img src={images.hero} alt="Aerial view of Langkawi's limestone islands and turquoise sea" width={1920} height={1088} loading="eager" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[60%_center]" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-x relative grid items-end gap-12 pb-20 pt-32 md:pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-rise text-sun!">旅游团 · 旅游包车 · 机场接送</p>
          <h1 className="mt-6 animate-rise text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.98] text-navy-foreground! [animation-delay:120ms]">
            {t(b("Your Journey,", "您的旅程，"))}
            <br />
            <em className="font-light">{t(b("Our Passion.", "我们的热忱。"))}</em>
          </h1>
          <p className="mt-6 animate-rise font-display text-xl text-sun [animation-delay:200ms]">{t(b("Explore Together. Travel Comfortably.", "结伴同游，舒适出行。"))}</p>
          <p className="mt-5 max-w-lg animate-rise text-base leading-relaxed text-navy-foreground/85 [animation-delay:240ms] md:text-lg">
            {t(b("From memorable group tours to private van rentals and airport transfers, Hsin Travel & Tours helps you explore Malaysia, Singapore and Thailand.",
              "从难忘的旅游团到包车出行与机场接送，欣旅游陪您畅游马来西亚、新加坡与泰国。"))}
          </p>
          <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:360ms] sm:flex-row">
            <a href="#tours" className={btnPrimary}>{t(b("Explore Our Tours", "浏览旅游行程"))} <ArrowUpRight size={16} /></a>
            <button type="button" onClick={onVan} className={btnGhostLight}><Bus size={16} /> {t(b("Book a Van / Get a Quote", "预订包车 / 获取报价"))}</button>
          </div>
        </div>
        <figure className="relative hidden animate-rise [animation-delay:480ms] lg:col-span-4 lg:col-start-9 lg:block">
          <img src={images.fleetLineup} alt="Hsin Travel's white-and-green passenger vans parked in a row" className="aspect-[4/3] w-full rounded-sm border-[6px] border-ivory object-cover shadow-soft" />
          <figcaption className="absolute -bottom-4 left-6 rounded-full bg-sun px-4 py-2 text-xs font-medium text-navy">{t(b("Tourist van rental & transfers", "旅游包车与接送"))}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Divisions({ onVan }: { onVan: () => void }) {
  const { t } = useLang();
  const panels = [
    { zh: "旅游团 / 旅游观光", label: b("Travel & Tours", "旅游团"), title: b("Discover More With Our Tours", "跟团出游，发现更多"), text: b("Explore organized travel and sightseeing possibilities for memorable journeys with family, friends or fellow travellers.", "与家人、朋友或旅伴一起，探索精彩的旅游团与观光行程。"), cta: b("Explore Travel Tours", "浏览旅游行程"), img: tours[0]!.img, alt: tours[0]!.alt, href: "#tours" },
    { zh: "旅游包车 / 机场接送", label: b("Van Rental & Transport", "包车与交通"), title: b("Travel Comfortably, Together", "一起出发，舒适同行"), text: b("Enquire about tourist van rental, airport transfers and passenger transport arrangements for your journey.", "咨询旅游包车、机场接送及各类载客交通安排。"), cta: b("Explore Van Services", "了解包车服务"), img: images.vanLuggage, alt: "Open white-and-green passenger van with suitcases beside it", href: "#van" },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">{t(b("What We Offer", "我们的服务"))}</p>
          <h2 className="mt-5 text-4xl leading-[1.08] md:text-5xl">{t(b("Two Ways to Explore. ", "两种出游方式，"))}<em>{t(b("One Trusted Travel Partner.", "一个值得信赖的旅行伙伴。"))}</em></h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {panels.map((p, i) => (
            <a key={p.href} href={p.href} onClick={i === 1 ? undefined : undefined} className="reveal group relative block aspect-[4/5] overflow-hidden rounded-sm md:aspect-[5/6]">
              <img src={p.img} alt={p.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
              <span className="absolute inset-0 bg-card-overlay" />
              <span className="absolute left-6 top-6 font-display text-sm italic text-navy-foreground/85">0{i + 1} — {t(p.label)}</span>
              <span className="absolute inset-x-6 bottom-6 md:inset-x-9 md:bottom-9">
                <span lang="zh-Hans" className="text-sm font-medium tracking-[0.15em] text-sun">{p.zh}</span>
                <span className="mt-2 block font-display text-3xl text-navy-foreground md:text-4xl">{t(p.title)}</span>
                <span className="mt-3 block max-w-md text-navy-foreground/85">{t(p.text)}</span>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 text-sm font-medium text-navy transition-colors group-hover:bg-sun">{t(p.cta)} <ArrowUpRight size={16} /></span>
              </span>
            </a>
          ))}
        </div>
        <div className="reveal mt-8 flex justify-center">
          <button type="button" onClick={onVan} className="text-sm font-medium text-primary underline-offset-4 hover:underline">{t(b("Need a quick transport quote? Start a van enquiry →", "需要交通报价？立即咨询包车 →"))}</button>
        </div>
      </div>
    </section>
  );
}

export function Tours({ onSelect }: { onSelect: (destEn: string) => void }) {
  const { t } = useLang();
  return (
    <section id="tours" className="bg-card py-24 md:py-32">
      <div className="container-x">
        <div className="reveal grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">{t(b("Tour Packages", "旅游配套"))}</p>
            <h2 className="mt-5 text-4xl leading-[1.08] md:text-5xl">{t(b("Discover Your Next ", "探索下一段"))}<em>{t(b("Adventure.", "精彩旅程"))}</em></h2>
            <ZhLine>探索下一段精彩旅程</ZhLine>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-muted-foreground">{t(b("Find inspiration across Malaysia, Singapore and Thailand, then ask the team about available tours.", "从马来西亚、新加坡到泰国寻找灵感，再向团队咨询可安排的行程。"))}</p>
            <p className="mt-3 text-xs tracking-[0.18em] text-primary uppercase">{t(b("Destination inspiration · not listed packages", "目的地灵感 · 非正式配套"))}</p>
          </div>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((d, i) => (
            <button key={d.id} type="button" onClick={() => onSelect(d.name.en)} aria-label={`${t(b("Enquire about", "咨询"))} ${t(d.name)}`}
              className="reveal group relative aspect-[4/5] overflow-hidden rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <img src={d.img} alt={d.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
              <span className="absolute inset-0 bg-card-overlay" />
              <span className="absolute left-5 top-5 rounded-full bg-navy/50 px-3 py-1 text-xs text-navy-foreground backdrop-blur">{t(d.country)}</span>
              <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-navy-foreground/15 text-navy-foreground backdrop-blur transition-colors group-hover:bg-sun group-hover:text-navy">
                <ArrowUpRight size={18} />
              </span>
              <span className="absolute inset-x-5 bottom-5 md:inset-x-6 md:bottom-6">
                <span className="text-[0.7rem] font-semibold tracking-[0.2em] text-sun uppercase">{t(d.theme)}</span>
                <span className="mt-1 block font-display text-3xl text-navy-foreground">{t(d.name)}</span>
                <span className="mt-2 block text-sm text-navy-foreground/80">{t(d.text)}</span>
                {d.isPackage && d.duration && <span className="mt-2 block text-xs text-navy-foreground">{t(d.duration)}{d.priceFrom ? ` · ${d.priceFrom}` : ""}</span>}
                <span className="mt-3 block text-xs font-medium text-navy-foreground underline-offset-4 group-hover:underline">{t(b("Enquire about this trip →", "咨询此行程 →"))}</span>
              </span>
              <span className="sr-only">{i + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const serviceIcons: Record<string, typeof Bus> = { rental: Bus, airport: Plane, sightseeing: Camera, group: Users };

export function VanServices({ onSelect }: { onSelect: (s: VanServiceId) => void }) {
  const { t } = useLang();
  return (
    <section id="van" className="bg-mist py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow">{t(b("Van Rental & Transport", "包车与交通"))}</p>
          <h2 className="mt-5 text-4xl leading-[1.08] md:text-5xl">{t(b("Your Ride, ", "舒适出行，"))}<em>{t(b("Your Journey.", "安心旅程。"))}</em></h2>
          <ZhLine>舒适出行，安心旅程</ZhLine>
          <p className="mt-6 leading-relaxed text-muted-foreground">{t(b("Tell us where you're going, how many are travelling and how much luggage you have. Availability and pricing are confirmed when you enquire.", "告诉我们目的地、人数与行李数量。车辆供应与价格将在咨询时确认。"))}</p>
          <img src={images.hyFront} alt="White Hyundai passenger vehicle" loading="lazy" className="mt-10 aspect-[4/3] w-full rounded-sm object-cover shadow-soft" />
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {vanServices.map((s) => {
            const Icon = serviceIcons[s.id] ?? Bus;
            return (
              <li key={s.id} className="reveal flex flex-col rounded-sm bg-card p-7 shadow-soft">
                <Icon size={26} strokeWidth={1.3} className="text-primary" />
                <h3 className="mt-6 text-2xl">{t(s.title)}</h3>
                <ZhLine>{s.title.zh}</ZhLine>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{t(s.text)}</p>
                <button type="button" onClick={() => onSelect(s.id)} className="mt-6 inline-flex items-center gap-2 self-start border-b border-primary pb-1 text-sm font-medium text-primary">
                  {t(b("Enquire", "立即咨询"))} <ArrowUpRight size={15} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const faqs: { q: Bi; a: Bi }[] = [
  { q: b("How can I enquire about a tour package?", "如何咨询旅游配套？"), a: b("Use the Tour Enquiry form on this page. It prepares a message you can send to Hsin Travel & Tours on WhatsApp.", "请使用本页的旅游团咨询表格，系统会生成信息，您可通过 WhatsApp 发送给欣旅游。") },
  { q: b("Can I request a customised travel itinerary?", "可以定制旅游行程吗？"), a: b("You're welcome to describe what you have in mind in your enquiry. The team can let you know what may be arranged.", "欢迎在咨询中说明您的想法，团队会告知可安排的内容。") },
  { q: b("How do I enquire about van rental?", "如何咨询包车服务？"), a: b("Choose the Van Rental / Transfer tab in the enquiry form, add your pickup, drop-off, date and passenger details, then send it on WhatsApp.", "在咨询表格中选择「包车与接送咨询」，填写上下车地点、日期与乘客人数，然后通过 WhatsApp 发送。") },
  { q: b("What details are needed for an airport transfer?", "机场接送需要提供哪些资料？"), a: b("Your pickup and drop-off points, date and time, number of passengers, luggage and — if you have it — your flight number.", "上下车地点、日期与时间、乘客人数、行李数量，以及航班号码（如有）。") },
  { q: b("How many passengers can travel in one vehicle?", "一辆车可以载多少人？"), a: b("It depends on the vehicle and how much luggage you have. Share your group size when you enquire and the team will advise.", "视车型及行李数量而定。咨询时请告知人数，团队会为您建议。") },
  { q: b("Can I enquire about trips to Singapore or Thailand?", "可以咨询新加坡或泰国行程吗？"), a: b("Yes, you can enquire. Specific routes and cross-border arrangements are subject to confirmation.", "可以咨询。具体路线及跨境安排须另行确认。") },
  { q: b("How can I receive a quotation?", "如何获取报价？"), a: b("Send an enquiry with your travel details. Prices are not published on this website and are provided by the team directly.", "请发送附有出行详情的咨询。本网站不公布价格，报价由团队直接提供。") },
];

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <h2 className="reveal text-4xl leading-[1.08] md:col-span-4 md:text-5xl">{t(b("Questions ", "常见"))}<em>{t(b("& Answers", "问题"))}</em></h2>
        <div className="md:col-span-7 md:col-start-6">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q.en} className="border-t border-border last:border-b">
                <h3 className="font-sans text-base">
                  <button id={`faq-btn-${i}`} aria-expanded={isOpen} aria-controls={`faq-panel-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl text-navy transition-colors hover:text-primary md:text-2xl">
                    {t(f.q)}
                    <Plus size={20} className={cn("shrink-0 text-primary transition-transform duration-300", isOpen && "rotate-45")} />
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className={cn("grid transition-[grid-template-rows] duration-400 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden"><p className="max-w-xl pb-7 leading-relaxed text-muted-foreground">{t(f.a)}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t, lang } = useLang();
  return (
    <footer id="contact" className="bg-navy pt-20 pb-10 text-navy-foreground/75">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="inline-block rounded-sm bg-ivory px-5 py-3"><Logo /></span>
          <p className="mt-6 font-display text-xl text-navy-foreground">{business.name}</p>
          <p className="mt-3 max-w-sm leading-relaxed">{t(b("Travel tours, tourist van rental and airport transfers.", "旅游团 · 旅游包车 · 机场接送"))}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow text-sun!">{t(b("Explore", "浏览"))}</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => <li key={l.href}><a href={l.href} className="hover:text-navy-foreground">{t(l.label)}</a></li>)}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="eyebrow text-sun!">{t(b("Contact", "联系"))}</p>
          <address className="mt-5 not-italic leading-relaxed">{business.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
          <a href={business.phoneHref} className="mt-4 block hover:text-navy-foreground">{business.phoneDisplay}</a>
          <a href={waLink(waGreeting(lang))} target="_blank" rel="noopener noreferrer" className="mt-1 block hover:text-navy-foreground">WhatsApp · {business.whatsappContact} · {business.whatsappDisplay}</a>
          <a href={business.facebook} target="_blank" rel="noopener noreferrer" aria-label="Hsin Travel & Tours on Facebook" className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-foreground/30 hover:bg-navy-foreground hover:text-navy">
            <Facebook size={18} />
          </a>
        </div>
      </div>
      <div className="container-x mt-16 flex flex-col gap-3 border-t border-navy-foreground/15 pt-8 text-sm md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {business.name}</p>
        <p>{t(b("Independent website concept. Not an official Hsin Travel & Tours website.", "独立网站概念设计，非欣旅游官方网站。"))}</p>
      </div>
    </footer>
  );
}

export function BackToTop({ show }: { show: boolean }) {
  return (
    <a href="#home" aria-label="Back to top" className={cn("fixed bottom-40 right-5 z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-navy text-navy-foreground shadow-soft transition-all md:bottom-28 md:flex", show ? "opacity-100" : "pointer-events-none opacity-0")}>
      <ArrowDown size={18} className="rotate-180" />
    </a>
  );
}

export function FloatingWhatsApp() {
  const { t, lang } = useLang();
  return (
    <a href={waLink(waGreeting(lang))} target="_blank" rel="noopener noreferrer" aria-label={t(b("Chat with Hsin Travel on WhatsApp", "通过 WhatsApp 联系欣旅游"))}
      className="fixed bottom-[calc(env(safe-area-inset-bottom)_+_6rem)] right-[calc(env(safe-area-inset-right)_+_1.25rem)] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-all hover:bg-navy md:bottom-[calc(env(safe-area-inset-bottom)_+_2rem)]">
      <WhatsAppIcon size={24} />
    </a>
  );
}
