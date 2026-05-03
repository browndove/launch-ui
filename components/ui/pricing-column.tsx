import { cva, type VariantProps } from "class-variance-authority";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

const pricingColumnVariants = cva(
  "max-w-container relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-border/60 bg-card/90 p-8 shadow-md backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "glass-1 to-transparent dark:glass-3",
        glow: "glass-2 to-trasparent dark:glass-3 after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] dark:after:bg-foreground/30 after:blur-[72px]",
        "glow-brand":
          "glass-3 ring-brand/25 from-card/100 to-card/100 ring-2 dark:glass-4 after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] after:bg-brand-foreground/70 after:blur-[72px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface PricingColumnProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pricingColumnVariants> {
  name: string;
  icon?: ReactNode;
  description: string;
  /** Use with dollar display; omit when `priceHeadline` is set */
  price?: number;
  /** Replaces the $ amount (e.g. product tier name or “Custom”) */
  priceHeadline?: string;
  /** Optional line under the headline when not using currency mode */
  priceHeadlineDetail?: string;
  originalPrice?: number;
  promotionText?: ReactNode;
  priceNote: string;
  cta: {
    variant: "glow" | "default";
    label: string;
    href: string;
  };
  features: string[];
}

export function PricingColumn({
  name,
  icon,
  description,
  price = 0,
  priceHeadline,
  priceHeadlineDetail,
  originalPrice,
  promotionText,
  priceNote,
  cta,
  features,
  variant,
  className,
  ...props
}: PricingColumnProps) {
  return (
    <div
      className={cn(pricingColumnVariants({ variant, className }))}
      {...props}
    >
      <hr
        className={cn(
          "via-foreground/60 absolute top-0 left-[10%] h-px w-[80%] border-0 bg-linear-to-r from-transparent to-transparent",
          variant === "glow-brand" && "via-brand",
        )}
      />
      <div className="flex flex-col gap-7">
        <header className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            {icon && (
              <div
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-xl p-2.5",
                  variant === "glow-brand"
                    ? "bg-brand/15 text-brand"
                    : "bg-muted text-foreground",
                )}
              >
                {icon}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold tracking-tight">{name}</h2>
              <p className="text-muted-foreground mt-2 max-w-[280px] text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </header>
        <section className="flex flex-col gap-3">
          {originalPrice !== undefined && (
            <div className="flex h-6 items-baseline gap-1">
              <span className="text-muted-foreground text-lg font-medium line-through">
                {originalPrice > 0 && price !== originalPrice
                  ? `$${originalPrice}`
                  : ""}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {priceHeadline ? (
              <div
                className={cn(
                  "border-border/80 bg-muted/50 rounded-xl border px-4 py-3",
                  variant === "glow-brand" && "border-brand/25 bg-brand/5",
                )}
              >
                <p className="text-foreground text-base font-semibold tracking-tight">
                  {priceHeadline}
                </p>
                {priceHeadlineDetail ? (
                  <p className="text-muted-foreground mt-1 text-xs font-medium leading-snug">
                    {priceHeadlineDetail}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="flex items-center gap-3 lg:flex-col lg:items-start xl:flex-row xl:items-center">
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-muted-foreground text-2xl font-bold">
                      $
                    </span>
                    <span className="text-6xl font-bold">{price}</span>
                  </div>
                </div>
                <div className="flex min-h-[40px] flex-col">
                  {price > 0 && (
                    <>
                      <span className="text-sm">one-time payment</span>
                      <span className="text-muted-foreground text-sm">
                        plus local taxes
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {promotionText && (
            <div className="text-brand-foreground h-6 text-sm font-medium">
              {promotionText}
            </div>
          )}
        </section>
        <Button variant={cta.variant} size="lg" asChild>
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
        <p className="text-muted-foreground min-h-[40px] max-w-[280px] text-sm leading-relaxed">
          {priceNote}
        </p>
        <hr className="border-input" />
      </div>
      <div>
        <ul className="flex flex-col gap-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug">
              <CircleCheckBig
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  variant === "glow-brand"
                    ? "text-brand"
                    : "text-muted-foreground",
                )}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { pricingColumnVariants };
