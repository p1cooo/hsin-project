import { business } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2 leading-none", className)}>
      <img
        src={business.logoSrc}
        alt=""
        width={180}
        height={180}
        className="h-11 w-11 shrink-0 object-contain"
      />
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display text-xl italic",
            light ? "text-navy-foreground" : "text-primary",
          )}
        >
          Hsin Travel
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em]",
            light ? "text-sun" : "text-navy/60",
          )}
        >
          & Tours
        </span>
      </span>
    </span>
  );
}
