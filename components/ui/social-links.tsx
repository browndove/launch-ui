import { FaLinkedinIn } from "react-icons/fa";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const items = [
  {
    key: "x",
    href: siteConfig.links.social.x,
    label: "Helix on X",
    Icon: SiX,
  },
  {
    key: "linkedin",
    href: siteConfig.links.social.linkedin,
    label: "Helix on LinkedIn",
    Icon: FaLinkedinIn,
  },
  {
    key: "facebook",
    href: siteConfig.links.social.facebook,
    label: "Helix on Facebook",
    Icon: SiFacebook,
  },
  {
    key: "instagram",
    href: siteConfig.links.social.instagram,
    label: "Helix on Instagram",
    Icon: SiInstagram,
  },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            "flex size-11 items-center justify-center rounded-xl border border-border/70 bg-muted/40 text-foreground/90",
            "shadow-sm transition-all duration-300",
            "hover:-translate-y-0.5 hover:border-brand/45 hover:bg-brand/10 hover:text-brand hover:shadow-md",
            "focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none",
          )}
        >
          <Icon className="size-[18px]" aria-hidden />
        </a>
      ))}
    </div>
  );
}
