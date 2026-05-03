import { type VariantProps } from "class-variance-authority";
import { ArrowRightIcon } from "lucide-react";
import { MdBiotech } from "react-icons/md";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Badge } from "../../ui/badge";
import { Button, buttonVariants } from "../../ui/button";
import Glow from "../../ui/glow";
import { Section } from "../../ui/section";
import TilesIllustration from "../../ui/tiles-illustration";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface HeroProps {
  title?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

export default function Hero({
  title = "Built for the moments medicine cannot afford to miss",
  description = "Secure messaging, real-time alerts, and instant escalations built for the speed healthcare demands.",
  mockup = <TilesIllustration />,
  badge = (
    <Badge variant="outline" className="animate-appear">
      <span className="text-muted-foreground">
        Helix is now live!
      </span>
      <a href={siteConfig.getStartedUrl} className="flex items-center gap-1">
        Get started
        <ArrowRightIcon className="size-3" />
      </a>
    </Badge>
  ),
  buttons = [
    {
      href: siteConfig.getStartedUrl,
      text: "Get Started",
      variant: "default",
    },
    {
      href: siteConfig.links.github,
      text: "Request Demo",
      variant: "glow",
      icon: <MdBiotech className="mr-2 size-4 text-blue-600" />,
    },
  ],
  className,
}: HeroProps) {
  return (
    <Section
      className={cn(
        "fade-bottom relative overflow-hidden bg-[#FAF9F7] pt-6 pb-0 sm:pt-10 sm:pb-0 md:pt-14 md:pb-0",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-430px] left-1/2 z-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full border border-blue-300/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-410px] left-1/2 z-0 h-[860px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.38)_0%,rgba(147,197,253,0.22)_35%,rgba(147,197,253,0.08)_55%,rgba(147,197,253,0)_75%)] blur-2xl"
      />
      <div className="max-w-container mx-auto flex flex-col gap-12 pt-8 sm:gap-24 sm:pt-10 md:pt-12">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {badge !== false && badge}
          <h1 className="animate-appear from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            {title}
          </h1>
          <p className="text-md animate-appear text-muted-foreground relative z-10 max-w-[740px] font-medium text-balance opacity-0 delay-100 sm:text-xl">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <div className="animate-appear relative z-10 flex justify-center gap-4 opacity-0 delay-300">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="lg"
                  asChild
                >
                  <a href={button.href}>
                    {button.icon}
                    {button.text}
                    {button.iconRight}
                  </a>
                </Button>
              ))}
            </div>
          )}
          {mockup !== false && (
            <div className="animate-appear relative w-full pt-12 opacity-0 delay-700">
              {mockup}
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000"
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
