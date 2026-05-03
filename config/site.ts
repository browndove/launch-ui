export const siteConfig = {
  name: "Helix",
  url: "https://helixhealth.com",
  getStartedUrl: "https://helixhealth.com/get-started",
  ogImage: "https://helixhealth.com/og.jpg",
  description:
    "Landing page components built with React, Shadcn/ui and Tailwind that will make your website feel premium.",
  apps: {
    /** In-product Helix experience on this marketing site */
    helix: "/#helix-app",
    admin: "https://admin.helixhealth.app/",
    analytics: "https://analytics.helixhealth.app/login?from=%2F",
  },
  links: {
    twitter: "https://twitter.com/helixhealth",
    github: "https://github.com/helix-health",
    email: "mailto:hello@helixhealth.com",
    appStore: "https://apps.apple.com/app/helix/id000000000",
    playStore:
      "https://play.google.com/store/apps/details?id=com.helixhealth.app",
    social: {
      x: "https://twitter.com/helixhealth",
      linkedin: "https://www.linkedin.com/company/helixhealth",
      facebook: "https://www.facebook.com/helixhealth",
      instagram: "https://www.instagram.com/helixhealth",
    },
  },
  pricing: {
    pro: "https://helixhealth.com/pricing",
    team: "https://helixhealth.com/pricing",
  },
  stats: {
    /** Shown in logos strip badge */
    updated: "May 2026",
    /** Social-proof metrics for the stats grid */
    careSites: 120,
    alertsMonthlyMillions: 4.2,
    medianEscalationSeconds: 45,
    uptimePercent: 99.99,
  },
};

export type SiteConfig = typeof siteConfig;
