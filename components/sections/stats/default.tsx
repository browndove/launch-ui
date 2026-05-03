import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Section } from "../../ui/section";

interface StatItemProps {
  label?: string;
  value: string | number;
  suffix?: string;
  description?: string;
}

interface StatsProps {
  items?: StatItemProps[] | false;
  className?: string;
  id?: string;
}

export default function Stats({
  items = [
    {
      label: "trusted by",
      value: siteConfig.stats.careSites,
      suffix: "+",
      description: "hospitals and clinics nationwide",
    },
    {
      label: "over",
      value: siteConfig.stats.alertsMonthlyMillions,
      suffix: "M+",
      description: "secure alerts & escalations routed monthly",
    },
    {
      label: "median",
      value: siteConfig.stats.medianEscalationSeconds,
      suffix: "s",
      description: "to escalate time-sensitive events",
    },
    {
      label: "up to",
      value: siteConfig.stats.uptimePercent,
      suffix: "%",
      description: "uptime on core messaging infrastructure",
    },
  ],
  className,
  id = "analytics",
}: StatsProps) {
  return (
    <Section id={id} className={cn("scroll-mt-24", className)}>
      <div className="container mx-auto max-w-[960px]">
        {items !== false && items.length > 0 && (
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-3 text-left"
              >
                {item.label && (
                  <div className="text-muted-foreground text-sm font-semibold">
                    {item.label}
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <div className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-4xl font-medium text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)] transition-all duration-300 sm:text-5xl md:text-6xl">
                    {item.value}
                  </div>
                  {item.suffix && (
                    <div className="text-brand text-2xl font-semibold">
                      {item.suffix}
                    </div>
                  )}
                </div>
                {item.description && (
                  <div className="text-muted-foreground text-sm font-semibold text-pretty">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
