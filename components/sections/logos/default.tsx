import {
  HeartPulseIcon,
  LockKeyholeIcon,
  ShieldCheckIcon,
  ServerIcon,
  ClockIcon,
} from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";

interface LogosProps {
  title?: string;
  badge?: ReactNode | false;
  className?: string;
}

interface TrustItem {
  icon: ReactNode;
  label: string;
  detail?: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: <ShieldCheckIcon className="size-5 stroke-[1.5]" />,
    label: "HIPAA",
    detail: "Compliant",
  },
  {
    icon: <LockKeyholeIcon className="size-5 stroke-[1.5]" />,
    label: "End-to-end",
    detail: "Encrypted",
  },
  {
    icon: <ServerIcon className="size-5 stroke-[1.5]" />,
    label: "Uptime",
    detail: "99.99%",
  },
  {
    icon: <HeartPulseIcon className="size-5 stroke-[1.5]" />,
    label: "Healthcare",
    detail: "Grade",
  },
  {
    icon: <ClockIcon className="size-5 stroke-[1.5]" />,
    label: "24/7",
    detail: "Support",
  },
];

export default function Logos({
  title = "Trusted by hospitals for secure, real-time communication",
  badge = (
    <Badge variant="outline" className="border-brand/30 text-brand">
      Enterprise ready
    </Badge>
  ),
  className,
}: LogosProps) {
  return (
    <Section
      className={cn(
        "border-border/30 border-b bg-[#FAF9F7] py-10 sm:py-14",
        className,
      )}
    >
      <div className="max-w-container mx-auto flex flex-col items-center gap-8 text-center sm:gap-10">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          {badge !== false && badge}
          <h2 className="text-foreground text-balance text-xl font-semibold tracking-tight sm:text-2xl sm:leading-snug md:text-3xl">
            {title}
          </h2>
        </div>
        <div className="grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="border-border/60 bg-background/90 flex items-start gap-3 rounded-2xl border px-4 py-4 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="bg-brand/10 text-brand flex size-10 shrink-0 items-center justify-center rounded-xl">
                {item.icon}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-foreground text-sm font-semibold leading-tight">
                  {item.label}
                </p>
                {item.detail && (
                  <p className="text-muted-foreground mt-0.5 text-xs font-medium">
                    {item.detail}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
