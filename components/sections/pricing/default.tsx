import { Building2, Hospital, Users } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { PricingColumn, PricingColumnProps } from "../../ui/pricing-column";
import { Section } from "../../ui/section";

interface EngagementPathsProps {
  title?: string | false;
  description?: string | false;
  plans?: PricingColumnProps[] | false;
  className?: string;
  id?: string;
}

/** Deployment paths for Helix (reuses card layout; not a public price list). */
function EngagementPaths({
  title = "Choose how you deploy Helix",
  description =
    "Three engagement paths—each with clear deliverables and support. No public price list; we scope every deployment with your clinical and IT stakeholders.",
  plans = [
    {
      name: "Pilot",
      icon: <Hospital className="size-5" />,
      description:
        "Prove speed and alignment in one unit, campus, or service line before you expand.",
      priceHeadline: "90-day pilot",
      priceHeadlineDetail: "Scoped rollout · outcomes-first",
      priceNote:
        "Typical 90-day engagement. Scope depends on seats, channels, and integrations—we quote after discovery.",
      cta: {
        variant: "glow",
        label: "Start a pilot",
        href: siteConfig.getStartedUrl,
      },
      features: [
        "Core secure messaging, alerts, and escalations",
        "Champion training and hands-on rollout support",
        "Defined success metrics and weekly checkpoints",
        "Path to expand scope when outcomes land",
      ],
      variant: "default",
    },
    {
      name: "Organization",
      icon: <Building2 className="size-5" />,
      description:
        "Standardize Helix across hospitals and clinics with shared governance and coordination.",
      priceHeadline: "Multi-site rollout",
      priceHeadlineDetail: "Governance · adoption · SLAs",
      priceNote:
        "Annual agreements with onboarding, adoption plays, and named customer success.",
      cta: {
        variant: "default",
        label: "Talk to sales",
        href: siteConfig.links.email,
      },
      features: [
        "Cross-site routing, directories, and escalation policies",
        "Role-based access with audit-friendly exports",
        "Executive rollout reviews and change leadership assets",
        "SLA-backed support for production workloads",
      ],
      variant: "glow-brand",
    },
    {
      name: "Enterprise",
      icon: <Users className="size-5" />,
      description:
        "Large health systems needing custom integrations, identity at scale, and joint steering.",
      priceHeadline: "Tailored program",
      priceHeadlineDetail: "Integrations · identity · procurement",
      priceNote:
        "Volume economics, integration workshops, and alignment with security & compliance.",
      cta: {
        variant: "default",
        label: "Contact enterprise",
        href: `${siteConfig.links.email}?subject=Helix%20Enterprise%20inquiry`,
      },
      features: [
        "Enterprise SSO / SCIM patterns and advanced IAM",
        "Deep EHR, paging, and operations integrations",
        "Dedicated solutions and technical architects",
        "Procurement, BAA, and governance support",
      ],
      variant: "glow",
    },
  ],
  className = "",
  id = "deployment",
}: EngagementPathsProps) {
  return (
    <Section
      id={id}
      className={cn(
        "border-border/40 bg-muted/20 border-y",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:gap-16">
        {(title || description) && (
          <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">
            {title && (
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-md text-muted-foreground max-w-[600px] font-medium sm:text-xl">
                {description}
              </p>
            )}
          </div>
        )}
        {plans !== false && plans.length > 0 && (
          <div className="max-w-container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PricingColumn
                key={plan.name}
                name={plan.name}
                icon={plan.icon}
                description={plan.description}
                price={plan.price}
                priceHeadline={plan.priceHeadline}
                priceHeadlineDetail={plan.priceHeadlineDetail}
                originalPrice={plan.originalPrice}
                promotionText={plan.promotionText}
                priceNote={plan.priceNote}
                cta={plan.cta}
                features={plan.features}
                variant={plan.variant}
                className={plan.className}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

export default EngagementPaths;
