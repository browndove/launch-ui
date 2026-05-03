"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface TilesIllustrationProps {
  className?: string;
}

/**
 * 3D fanned-cards illustration inspired by launchuicomponents.com.
 *
 * Three screenshot cards share the same tilt (rotateY/rotateX) and are fanned
 * out horizontally so each is fully visible. A gentle continuous float
 * animation runs at rest; on hover the fan spreads further apart.
 *
 * Layering (front to back): phone1 (mobile, centered front) → analytics (left)
 * → login (right).
 */
export default function TilesIllustration({ className }: TilesIllustrationProps) {
  return (
    <div
      className={cn(
        "group relative mx-auto w-full max-w-[1200px] [perspective:1800px]",
        className,
      )}
    >
      <div className="relative h-[420px] w-full [transform-style:preserve-3d] sm:h-[520px] md:h-[620px]">
        {/* Back-left: analytics dashboard */}
        <Card
          aspect="landscape"
          floatClass="animate-tiles-float-left"
          className={cn(
            "-left-[6%] top-[14%] w-[68%] aspect-[16/10] z-10 opacity-90",
            "rotate-x-[10deg] rotate-y-[22deg] -translate-x-[4%] translate-z-[-80px]",
            "group-hover:-translate-x-[12%] group-hover:translate-z-[-20px] group-hover:rotate-y-[18deg]",
          )}
        >
          <Image
            src="/analytics.png"
            alt="Helix analytics"
            fill
            sizes="(min-width: 1024px) 600px, 50vw"
            className="object-contain"
            priority
          />
        </Card>

        {/* Back-right: login / dashboard screenshot */}
        <Card
          aspect="landscape"
          floatClass="animate-tiles-float-right"
          className={cn(
            "-right-[6%] top-[18%] w-[68%] aspect-[16/10] z-10 opacity-90",
            "rotate-x-[10deg] rotate-y-[22deg] translate-x-[4%] translate-z-[-80px]",
            "group-hover:translate-x-[12%] group-hover:translate-z-[-20px] group-hover:rotate-y-[26deg]",
          )}
        >
          <Image
            src="/login.png"
            alt="Helix dashboard"
            fill
            sizes="(min-width: 1024px) 600px, 50vw"
            className="object-contain"
            priority
          />
        </Card>

        {/* Front center: mobile screenshot (phone1) */}
        <Card
          aspect="portrait"
          floatClass="animate-tiles-float-center"
          className={cn(
            "left-1/2 top-[4%] -translate-x-1/2 h-[92%] w-auto aspect-[9/19] z-30",
            "rotate-x-[8deg] rotate-y-[20deg] translate-z-[60px]",
            "group-hover:translate-z-[120px] group-hover:rotate-y-[24deg]",
          )}
        >
          <Image
            src="/phone1.png"
            alt="Helix mobile broadcasts"
            fill
            sizes="(min-width: 1024px) 280px, 30vw"
            className="object-contain"
            priority
          />
        </Card>
      </div>
    </div>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  aspect: "landscape" | "portrait";
  floatClass?: string;
}

function Card({ children, className, floatClass }: CardProps) {
  return (
    <div
      className={cn(
        "absolute transition-all duration-700 ease-out [transform-style:preserve-3d] will-change-transform",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-2xl border border-black/5 bg-white/70 shadow-2xl shadow-black/20 ring-1 ring-black/5 backdrop-blur-sm",
          floatClass,
        )}
      >
        {children}
      </div>
    </div>
  );
}
