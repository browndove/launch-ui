import { FaApple } from "react-icons/fa";
import { SiGoogleplay } from "react-icons/si";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function StoreDownloadBadges({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3.5 sm:gap-4",
        className,
      )}
    >
      <a
        href={siteConfig.links.appStore}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Helix on the App Store"
        className={cn(
          "group relative inline-flex h-[52px] min-w-[158px] items-center gap-3.5 overflow-hidden rounded-full px-5",
          "bg-[#000000] text-white",
          "shadow-[0_10px_40px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/12",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:shadow-[0_18px_50px_-14px_rgba(0,0,0,0.75)] hover:ring-white/22",
          "focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none",
        )}
      >
        <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/[0.14] via-transparent to-transparent opacity-80" />
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="absolute inset-0 bg-linear-to-t from-white/5 to-transparent" />
        </span>
        <FaApple
          className="relative size-[30px] shrink-0 text-white"
          aria-hidden
        />
        <span className="relative flex flex-col items-start justify-center leading-none">
          <span className="text-[10px] font-medium tracking-wide text-white/75">
            Download on the
          </span>
          <span className="mt-1 text-[17px] font-semibold tracking-tight">
            App Store
          </span>
        </span>
      </a>

      <a
        href={siteConfig.links.playStore}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Helix on Google Play"
        className={cn(
          "group relative inline-flex h-[52px] min-w-[168px] items-center gap-3.5 overflow-hidden rounded-full px-5",
          "border border-zinc-200/90 bg-white text-zinc-900",
          "shadow-[0_10px_36px_-14px_rgba(15,23,42,0.28)] ring-1 ring-black/4",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_18px_48px_-16px_rgba(15,23,42,0.38)] hover:ring-brand/15",
          "dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-white/10 dark:hover:border-brand/35",
          "focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none",
        )}
      >
        <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand/6 via-transparent to-sky-500/6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span
          className={cn(
            "relative flex size-10 shrink-0 items-center justify-center rounded-xl",
            "bg-white shadow-inner shadow-black/6",
            "ring-1 ring-black/6 dark:bg-zinc-900 dark:ring-white/10",
          )}
        >
          <SiGoogleplay
            className="size-[26px] text-[#00A968] dark:text-[#34E0A1]"
            aria-hidden
          />
        </span>
        <span className="relative flex flex-col items-start justify-center leading-none">
          <span className="text-[10px] font-semibold tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-400">
            Get it on
          </span>
          <span className="mt-1 text-[17px] font-bold tracking-tight text-zinc-900 dark:text-white">
            Google Play
          </span>
        </span>
      </a>
    </div>
  );
}
