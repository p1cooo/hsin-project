import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { fleet, type Vehicle } from "@/lib/site-config";
import { b, useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ZhLine } from "./Sections";

export function Fleet({ onEnquire }: { onEnquire: (vehicleId: string) => void }) {
  const { t } = useLang();
  const [active, setActive] = useState<Vehicle | null>(null);

  return (
    <section id="fleet" className="bg-card py-24 md:py-32">
      <div className="container-x">
        <div className="reveal grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">{t(b("Our Fleet", "我们的车队"))}</p>
            <h2 className="mt-5 text-4xl leading-[1.08] md:text-5xl">{t(b("Explore Our ", "探索我们的"))}<em>{t(b("Fleet.", "车队"))}</em></h2>
            <ZhLine>探索我们的车队</ZhLine>
          </div>
          <p className="leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9">
            {t(b("See the vehicles and travel options behind your journey. Tap a vehicle to view its photos.", "了解为您旅程服务的车辆。点击车辆即可查看更多照片。"))}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {fleet.map((v) => (
            <button key={v.id} type="button" onClick={() => setActive(v)} className="reveal group text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <span className="relative block aspect-[4/3] overflow-hidden rounded-sm">
                <img src={v.photos[0]!.src} alt={t(v.photos[0]!.alt)} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy/70 px-3 py-1.5 text-xs text-navy-foreground backdrop-blur">
                  <Images size={14} /> {v.photos.length} {t(b("photos", "张照片"))}
                </span>
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-navy-foreground/20 text-navy-foreground backdrop-blur transition-colors group-hover:bg-sun group-hover:text-navy">
                  <ArrowUpRight size={18} />
                </span>
              </span>
              <span className="mt-5 block font-display text-2xl text-navy">{t(v.name)}</span>
              <span className="mt-2 block max-w-lg leading-relaxed text-muted-foreground">{t(v.description)}</span>
            </button>
          ))}
        </div>
        <p className="reveal mt-10 text-xs text-muted-foreground">{t(b("Photos from Hsin Travel's public Facebook posts. Vehicle availability, seating and luggage capacity are confirmed on enquiry.", "照片来自欣旅游的公开 Facebook 帖子。车辆供应、座位及行李容量以咨询确认为准。"))}</p>
      </div>
      {active && <VehicleModal v={active} onClose={() => setActive(null)} onEnquire={() => { onEnquire(active.id); setActive(null); }} />}
    </section>
  );
}

function VehicleModal({ v, onClose, onEnquire }: { v: Vehicle; onClose: () => void; onEnquire: () => void }) {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const n = v.photos.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tbc = t(b("To be confirmed on enquiry", "咨询时确认"));
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="veh-title" className="fixed inset-0 z-[70] flex items-end justify-center bg-navy/80 backdrop-blur-sm md:items-center md:p-6" onClick={onClose}>
      <div className="max-h-[94dvh] w-full max-w-5xl overflow-auto rounded-t-sm bg-ivory md:rounded-sm" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-navy">
          <img src={v.photos[i]!.src} alt={t(v.photos[i]!.alt)} className="mx-auto aspect-[4/3] max-h-[60dvh] w-full object-contain" />
          <button autoFocus onClick={onClose} aria-label={t(b("Close", "关闭"))} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-navy"><X size={20} /></button>
          {n > 1 && (
            <>
              <button onClick={() => go(-1)} aria-label={t(b("Previous photo", "上一张"))} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 text-navy"><ChevronLeft size={20} /></button>
              <button onClick={() => go(1)} aria-label={t(b("Next photo", "下一张"))} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 text-navy"><ChevronRight size={20} /></button>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-navy/70 px-3 py-1 text-xs text-navy-foreground">{i + 1} / {n}</span>
            </>
          )}
        </div>
        {n > 1 && (
          <div className="flex gap-2 overflow-x-auto px-6 pt-4 md:px-10">
            {v.photos.map((p, j) => (
              <button key={p.src} onClick={() => setI(j)} aria-label={t(p.alt)} aria-current={i === j} className={cn("h-16 w-20 shrink-0 overflow-hidden rounded-sm border-2 transition-opacity", i === j ? "border-primary" : "border-transparent opacity-60 hover:opacity-100")}>
                <img src={p.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
        <div className="grid gap-8 p-6 md:grid-cols-12 md:p-10">
          <div className="md:col-span-7">
            <h3 id="veh-title" className="text-3xl">{t(v.name)}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t(v.description)}</p>
          </div>
          <div className="md:col-span-5">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-border pb-3"><dt className="text-muted-foreground">{t(b("Passengers", "乘客人数"))}</dt><dd className="text-right text-navy">{v.passengers ? t(v.passengers) : tbc}</dd></div>
              <div className="flex justify-between gap-4 border-b border-border pb-3"><dt className="text-muted-foreground">{t(b("Luggage", "行李"))}</dt><dd className="text-right text-navy">{v.luggage ? t(v.luggage) : tbc}</dd></div>
            </dl>
            <button onClick={onEnquire} className="mt-6 w-full rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground hover:bg-navy">
              {t(b("Enquire About This Vehicle", "咨询此车辆"))}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
