import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { Bus, Check, Copy, Map } from "lucide-react";
import { destinationOptions, fleet, otherService, vanServices, waLink, type VanServiceId } from "@/lib/site-config";
import { b, useLang, type Bi } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

export type EnquiryTab = "tour" | "van";
export type EnquiryPreset = { tab: EnquiryTab; destination?: string; vehicle?: string; service?: VanServiceId; nonce: number };

type Key = "name"|"contact"|"destination"|"pkg"|"date"|"travellers"|"notes"|"service"|"pickup"|"dropoff"|"time"|"returnDate"|"flight"|"passengers"|"luggage"|"vehicle";
type Form = Partial<Record<Key, string>>;
const emptyTour: Form = { name: "", contact: "", destination: "", pkg: "", date: "", travellers: "", notes: "" };
const emptyVan: Form = { name: "", contact: "", service: "", pickup: "", dropoff: "", date: "", time: "", returnDate: "", flight: "", passengers: "", luggage: "", vehicle: "", notes: "" };

const L: Record<Key, Bi> = {
  name: b("Full Name", "姓名"),
  contact: b("Contact Number", "联系电话"),
  destination: b("Preferred Destination", "目的地"),
  pkg: b("Interested Tour Package (if any)", "感兴趣的旅游配套（如有）"),
  date: b("Travel Date", "出行日期"),
  travellers: b("Number of Travellers", "出行人数"),
  notes: b("Additional Requests", "其他要求"),
  service: b("Service Type", "服务类型"),
  pickup: b("Pickup Location", "上车地点"),
  dropoff: b("Drop-off Location", "下车地点"),
  time: b("Pickup Time", "接载时间"),
  returnDate: b("Return Date (if applicable)", "回程日期（如适用）"),
  flight: b("Flight Number (optional)", "航班号码（可选）"),
  passengers: b("Number of Passengers", "乘客人数"),
  luggage: b("Luggage Details", "行李详情"),
  vehicle: b("Preferred Vehicle (if any)", "偏好车型（如有）"),
};

const required: Record<EnquiryTab, Key[]> = {
  tour: ["name", "contact", "destination"],
  van: ["name", "contact", "service", "pickup", "dropoff", "date"],
};

const fieldCls = "mt-2 w-full rounded-sm border border-input bg-card px-4 py-3.5 text-base text-ink placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function Enquiry({ preset }: { preset: EnquiryPreset | null }) {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<EnquiryTab>("tour");
  const [forms, setForms] = useState<Record<EnquiryTab, Form>>({ tour: emptyTour, van: emptyVan });
  const [errors, setErrors] = useState<Partial<Record<Key, boolean>>>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const lastWhatsAppOpen = useRef(0);
  const form = forms[tab];

  useEffect(() => {
    if (!preset) return;
    setTab(preset.tab);
    setPreviewOpen(false);
    setErrors({});
    setForms((f) => ({
      ...f,
      tour: preset.destination ? { ...f.tour, destination: preset.destination } : f.tour,
      van: { ...f.van, ...(preset.service ? { service: preset.service } : {}), ...(preset.vehicle ? { vehicle: preset.vehicle } : {}) },
    }));
  }, [preset]);

  const set = (k: Key) => (e: { target: { value: string } }) => {
    setForms((f) => ({ ...f, [tab]: { ...f[tab], [k]: e.target.value } }));
    setPreviewOpen(false);
    if (errors[k]) setErrors((er) => ({ ...er, [k]: false }));
  };

  const serviceLabel = (id = "") => [...vanServices, otherService].find((s) => s.id === id)?.title;
  const vehicleLabel = (id = "") => fleet.find((v) => v.id === id)?.name;
  const destLabel = (en = "") => destinationOptions.find((d) => d.en === en);
  const fieldLabel = (k: Key) => k === "date" && tab === "van" ? t(b("Pickup Date", "接载日期")) : t(L[k]);

  const buildMessage = () => {
    const lines: string[] = [];
    const add = (k: Key, v?: string) => { if (v?.trim()) lines.push(`${fieldLabel(k)}: ${v.trim()}`); };
    lines.push(t(b("Hello Hsin Travel! 👋", "你好，欣旅游！👋")), "");
    lines.push(tab === "tour"
      ? t(b("I would like to enquire about a travel tour.", "我想咨询旅游行程。"))
      : t(b("I would like to enquire about your van rental / transportation service.", "我想咨询包车或接送服务。")), "");
    lines.push(tab === "tour" ? t(b("*Tour Enquiry Details*", "*旅游咨询详情*")) : t(b("*Van Rental Enquiry Details*", "*包车与接送咨询详情*")), "");
    add("name", form.name);
    add("contact", form.contact);
    if (tab === "tour") {
      const d = destLabel(form.destination);
      add("destination", d ? t(d) : form.destination);
      add("pkg", form.pkg);
      add("date", form.date);
      add("travellers", form.travellers);
    } else {
      const s = serviceLabel(form.service);
      add("service", s ? t(s) : form.service);
      add("pickup", form.pickup);
      add("dropoff", form.dropoff);
      add("date", form.date);
      add("time", form.time);
      add("returnDate", form.returnDate);
      if (form.service === "airport") add("flight", form.flight);
      add("passengers", form.passengers);
      add("luggage", form.luggage);
      const v = vehicleLabel(form.vehicle);
      add("vehicle", v ? t(v) : "");
    }
    if (form.notes?.trim()) lines.push(`${t(L.notes)}: ${form.notes.trim()}`);
    lines.push("", tab === "tour"
      ? t(b("Could you please provide more information and a quotation?", "请提供更多资料及报价，谢谢！"))
      : t(b("Could you please confirm availability and provide a quotation?", "请确认是否有车并提供报价，谢谢！")));
    if (lang === "en") lines.push("", "Thank you!");
    return lines.join("\n");
  };

  const message = previewOpen ? buildMessage() : null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<Key, boolean>> = {};
    required[tab].forEach((k) => { if (!form[k]?.trim()) er[k] = true; });
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) { document.getElementById(`f-${first}`)?.focus(); return; }
    setPreviewOpen(true);
    setCopied(false);
    setTimeout(() => previewRef.current?.focus(), 50);
  };

  const copy = async () => {
    if (!message) return;
    try { await navigator.clipboard.writeText(message); } catch {
      const ta = document.createElement("textarea");
      ta.value = message; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  const openWhatsApp = (event: MouseEvent<HTMLAnchorElement>) => {
    const now = Date.now();
    if (now - lastWhatsAppOpen.current < 1500) event.preventDefault();
    else lastWhatsAppOpen.current = now;
  };

  const req = (k: Key) => required[tab].includes(k);
  const Label = ({ k }: { k: Key }) => (
    <label htmlFor={`f-${k}`} className="text-sm font-medium text-navy">{fieldLabel(k)} {req(k) && <span className="text-primary">*</span>}</label>
  );
  const Err = ({ k }: { k: Key }) => errors[k] ? <p id={`e-${k}`} className="mt-2 text-sm text-destructive">{t(b("This field is required.", "此栏为必填项。"))}</p> : null;
  const props = (k: Key) => ({
    id: `f-${k}`, value: form[k] ?? "", onChange: set(k),
    "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined,
    className: cn(fieldCls, errors[k] && "border-destructive"),
  });
  const F = ({ k, full, type = "text", ph }: { k: Key; full?: boolean; type?: string; ph?: Bi | undefined }) => (
    <div className={cn(full && "md:col-span-2")}>
      <Label k={k} />
      <input type={type} min={type === "number" ? 1 : undefined} {...props(k)} placeholder={ph ? t(ph) : undefined} />
      <Err k={k} />
    </div>
  );

  const tabs: { id: EnquiryTab; label: Bi; icon: typeof Map }[] = [
    { id: "tour", label: b("Tour Enquiry", "旅游团咨询"), icon: Map },
    { id: "van", label: b("Van Rental / Transfer", "包车与接送咨询"), icon: Bus },
  ];

  return (
    <section id="enquiry" className="bg-mist py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="reveal lg:col-span-4">
          <p className="eyebrow">{t(b("Let's Get Started", "开始咨询"))}</p>
          <h2 className="mt-5 text-4xl leading-[1.08] md:text-5xl">{t(b("Plan Your Trip or ", "规划旅程，"))}<em>{t(b("Book a Ride.", "预订用车。"))}</em></h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">{t(b("Choose an enquiry type, fill in your details, then send the prepared message to Hsin Travel & Tours on WhatsApp.", "选择咨询类型并填写资料，然后通过 WhatsApp 将整理好的信息发送给欣旅游。"))}</p>
          <ol className="mt-10 space-y-3 text-sm text-ink">
            <li><span className="font-display text-primary">1.</span> {t(b("Fill in your details", "填写您的资料"))}</li>
            <li><span className="font-display text-primary">2.</span> {t(b("Review your prepared message", "确认整理好的信息"))}</li>
            <li><span className="font-display text-primary">3.</span> {t(b("Send it on WhatsApp", "通过 WhatsApp 发送"))}</li>
          </ol>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div role="tablist" aria-label={t(b("Enquiry type", "咨询类型"))} className="reveal mb-4 grid grid-cols-2 gap-2 rounded-full bg-card p-1.5 shadow-soft">
            {tabs.map((x) => (
              <button key={x.id} role="tab" type="button" aria-selected={tab === x.id} onClick={() => { setTab(x.id); setErrors({}); setPreviewOpen(false); }}
                className={cn("flex items-center justify-center gap-2 rounded-full px-3 py-3 text-sm font-medium transition-colors", tab === x.id ? "bg-primary text-primary-foreground" : "text-navy hover:bg-mist")}>
                <x.icon size={16} /> {t(x.label)}
              </button>
            ))}
          </div>
          <form noValidate onSubmit={submit} className="reveal rounded-sm bg-card p-6 shadow-soft md:p-10">
            <div className="grid gap-6 md:grid-cols-2">
              {F({ k: "name", full: true })}
              {F({ k: "contact", type: "tel", ph: b("e.g. +60 12-345 6789", "例如 +60 12-345 6789") })}
              {tab === "tour" ? (
                <>
                  <div>
                    {Label({ k: "destination" })}
                    <select {...props("destination")} className={cn(props("destination").className, "appearance-none")}>
                      <option value="">{t(b("Select a destination", "请选择目的地"))}</option>
                      {destinationOptions.map((d) => <option key={d.en} value={d.en}>{t(d)}</option>)}
                    </select>
                    {Err({ k: "destination" })}
                  </div>
                  {F({ k: "pkg", full: true, ph: b("Optional", "可选") })}
                  {F({ k: "date", type: "date" })}
                  {F({ k: "travellers", type: "number", ph: b("e.g. 4", "例如 4") })}
                </>
              ) : (
                <>
                  <div>
                    {Label({ k: "service" })}
                    <select {...props("service")} className={cn(props("service").className, "appearance-none")}>
                      <option value="">{t(b("Select a service", "请选择服务"))}</option>
                      {[...vanServices, otherService].map((s) => <option key={s.id} value={s.id}>{t(s.title)}</option>)}
                    </select>
                    {Err({ k: "service" })}
                  </div>
                  {form.service === "airport" && F({ k: "flight", full: true, ph: b("e.g. MH123", "例如 MH123") })}
                  {F({ k: "pickup", ph: form.service === "airport" ? b("e.g. KLIA Terminal 1", "例如 KLIA 第一航站楼") : undefined })}
                  {F({ k: "dropoff" })}
                  {F({ k: "date", type: "date" })}
                  {F({ k: "time", type: "time" })}
                  {F({ k: "returnDate", type: "date" })}
                  {F({ k: "passengers", type: "number", ph: b("e.g. 8", "例如 8") })}
                  {F({ k: "luggage", full: true, ph: b("e.g. 6 large suitcases", "例如 6 个大行李箱") })}
                  <div className="md:col-span-2">
                    {Label({ k: "vehicle" })}
                    <select {...props("vehicle")} className={cn(props("vehicle").className, "appearance-none")}>
                      <option value="">{t(b("No preference", "无偏好"))}</option>
                      {fleet.map((v) => <option key={v.id} value={v.id}>{t(v.name)}</option>)}
                    </select>
                  </div>
                </>
              )}
              <div className="md:col-span-2">
                {Label({ k: "notes" })}
                <textarea rows={4} {...props("notes")} placeholder={t(b("Anything else we should know", "其他需要说明的事项"))} />
              </div>
            </div>
            <button type="submit" className="mt-8 w-full rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy md:w-auto md:px-10">
              {t(b("Review WhatsApp Enquiry", "确认 WhatsApp 咨询信息"))}
            </button>
          </form>

          {message && (
            <div ref={previewRef} tabIndex={-1} className="mt-6 rounded-sm border border-primary/30 bg-card p-6 outline-none md:p-10" aria-labelledby="preview-title">
              <h3 id="preview-title" className="text-2xl">{t(b("Review your enquiry", "请确认您的咨询信息"))}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(b("This message has not been sent yet. Continue to WhatsApp and press send there to deliver it.", "此信息尚未发送。请前往 WhatsApp 并在那里按下发送。"))}
              </p>
              <pre className="mt-6 max-h-80 overflow-auto rounded-sm bg-ivory p-5 font-sans text-sm leading-relaxed whitespace-pre-wrap text-ink">{message}</pre>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={waLink(message)} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:bg-navy">
                  <WhatsAppIcon size={16} /> {t(b("Send Enquiry via WhatsApp", "通过 WhatsApp 发送咨询"))}
                </a>
                <button type="button" onClick={copy} className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/30 px-7 py-3.5 text-sm font-medium text-navy hover:bg-navy hover:text-navy-foreground">
                  {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? t(b("Copied", "已复制")) : t(b("Copy Enquiry", "复制信息"))}
                </button>
              </div>
            </div>
          )}
          <div role="status" aria-live="polite" className={cn("fixed inset-x-4 bottom-6 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-sm bg-navy px-5 py-4 text-sm text-navy-foreground shadow-soft transition-all", copied ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0")}>
            {copied && <><Check size={18} className="text-sun" /> {t(b("Enquiry copied to your clipboard.", "咨询信息已复制。"))}</>}
          </div>
        </div>
      </div>
    </section>
  );
}
