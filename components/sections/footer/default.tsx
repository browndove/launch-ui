import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn, externalLinkProps } from "@/lib/utils";

import LaunchUI from "../../logos/launch-ui";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";
import { ModeToggle } from "../../ui/mode-toggle";
import { SocialLinks } from "../../ui/social-links";
import { StoreDownloadBadges } from "../../ui/store-download-badges";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = <LaunchUI />,
  name = "Helix",
  columns = [
    {
      title: "Product",
      links: [
        { text: "Helix app", href: siteConfig.apps.helix },
        { text: "Admin Panel", href: siteConfig.apps.admin },
        { text: "Analytics dashboard", href: siteConfig.apps.analytics },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: siteConfig.url },
        { text: "Careers", href: siteConfig.url },
        { text: "Blog", href: siteConfig.url },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "Email us", href: siteConfig.links.email },
        { text: "Get started", href: siteConfig.getStartedUrl },
      ],
    },
  ],
  copyright = "© 2026 Helix. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: siteConfig.url },
    { text: "Terms of Service", href: siteConfig.url },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer className="pb-8 pt-10 sm:pt-12">
          <FooterContent className="grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">
            <FooterColumn className="flex flex-col gap-5 border-border/40 border-b pb-8 lg:col-span-6 lg:border-0 lg:pb-0">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                {logo}
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
              <p className="text-muted-foreground mx-auto max-w-md text-center text-sm leading-relaxed sm:mx-0 sm:text-left">
                Secure alerts and clinical messaging when every second counts—on
                iOS, Android, and web.
              </p>
              <SocialLinks className="justify-center gap-2.5 sm:justify-start" />
              <div className="flex flex-col gap-2.5 pt-1 text-center sm:text-left">
                <span className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
                  Get the app
                </span>
                <StoreDownloadBadges className="justify-center sm:justify-start" />
              </div>
            </FooterColumn>

            <div className="col-span-full grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-6 lg:grid-cols-6 lg:gap-6">
              {columns.map((column, index) => (
                <FooterColumn
                  key={column.title}
                  className={cn(
                    "gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4 shadow-sm sm:p-5",
                    "lg:col-span-2 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none",
                    index === 2 && "col-span-2",
                  )}
                >
                  <h3 className="text-foreground text-[13px] font-semibold tracking-wide uppercase sm:text-xs lg:text-base lg:normal-case">
                    {column.title}
                  </h3>
                  <nav className="flex flex-col gap-0.5 sm:gap-1">
                    {column.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground active:text-foreground -mx-1 rounded-md px-1 py-2 text-sm transition-colors sm:py-2.5 lg:py-1"
                        {...externalLinkProps(link.href)}
                      >
                        {link.text}
                      </a>
                    ))}
                  </nav>
                </FooterColumn>
              ))}
            </div>
          </FooterContent>
          <FooterBottom className="mt-10 flex-col gap-6 text-center sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
            <div className="text-muted-foreground order-2 text-[13px] leading-snug sm:order-1">
              {copyright}
            </div>
            <div className="order-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:order-2 sm:justify-end">
              {policies.map((policy, index) => (
                <a
                  key={index}
                  href={policy.href}
                  className="hover:text-foreground inline-flex min-h-10 items-center px-1 py-2 text-sm underline-offset-4 transition-colors hover:underline"
                >
                  {policy.text}
                </a>
              ))}
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
