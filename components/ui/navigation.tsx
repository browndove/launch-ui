"use client";

import Link from "next/link";
import * as React from "react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import LaunchUI from "../logos/launch-ui";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

interface ComponentItem {
  title: string;
  href: string;
  description: string;
}

interface MenuItem {
  title: string;
  href?: string;
  isLink?: boolean;
  content?: ReactNode;
}

interface NavigationProps {
  menuItems?: MenuItem[];
  components?: ComponentItem[];
  logo?: ReactNode;
  logoTitle?: string;
  logoDescription?: string;
  logoHref?: string;
  introItems?: {
    title: string;
    href: string;
    description: string;
  }[];
}

export default function Navigation({
  menuItems = [
    {
      title: "Product",
      content: "default",
    },
    {
      title: "Capabilities",
      content: "components",
    },
    {
      title: "Get started",
      isLink: true,
      href: siteConfig.getStartedUrl,
    },
  ],
  components = [
    {
      title: "Secure messaging",
      href: "/#capabilities",
      description:
        "Encrypted, traceable threads built for clinical workflows—not consumer chat.",
    },
    {
      title: "Real-time alerts",
      href: "/#capabilities",
      description:
        "Route critical updates to the right roles the moment they matter.",
    },
    {
      title: "Instant escalations",
      href: "/#capabilities",
      description:
        "Escalate with clear ownership when seconds count.",
    },
    {
      title: "Privacy by design",
      href: "/#capabilities",
      description:
        "Controls and audit expectations aligned with how healthcare handles PHI.",
    },
    {
      title: "Works everywhere",
      href: "/#capabilities",
      description:
        "Responsive across floors, desktops, and on-call devices.",
    },
    {
      title: "Stack integrations",
      href: "/#capabilities",
      description:
        "Connect EHR events, paging, and identity without another silo.",
    },
  ],
  logo = <LaunchUI />,
  logoTitle = "Helix",
  logoDescription =
    "Clinical communication for speed and accountability—secure messaging, real-time alerts, and escalations when every second counts.",
  logoHref = siteConfig.url,
  introItems = [
    {
      title: "Helix app",
      href: siteConfig.apps.helix,
      description:
        "Clinical messaging and alerts for frontline teams—aligned across roles, users, and facilities.",
    },
    {
      title: "Admin Panel",
      href: siteConfig.apps.admin,
      description:
        "Govern users, roles, routing, and hospital operations from a single control surface.",
    },
    {
      title: "Analytics dashboard",
      href: siteConfig.apps.analytics,
      description:
        "Operational visibility into alerts, escalations, and adoption across sites and service lines.",
    },
  ],
}: NavigationProps) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.isLink ? (
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href={item.href || ""}>{item.title}</Link>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.content === "default" ? (
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="from-muted/30 to-muted/10 flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                            href={logoHref}
                          >
                            {logo}
                            <div className="mt-4 mb-2 text-lg font-medium">
                              {logoTitle}
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              {logoDescription}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {introItems.map((intro, i) => (
                        <ListItem key={i} href={intro.href} title={intro.title}>
                          {intro.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : item.content === "components" ? (
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : (
                    item.content
                  )}
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentProps<"a"> & { title: string }) {
  const isExternal =
    typeof href === "string" && /^https?:\/\//i.test(href);
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          data-slot="list-item"
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
