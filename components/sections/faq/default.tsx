import Link from "next/link";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItemProps[] | false;
  className?: string;
  id?: string;
}

export default function FAQ({
  title = "Questions and Answers",
  items = [
    {
      question:
        "Why not just use pagers, SMS, or consumer chat apps for critical updates?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
            Those channels break down when accountability, routing, and context
            matter. Messages get lost in threads, there&apos;s no clean escalation
            path, and consumer tools weren&apos;t built for PHI or clinical
            workflows.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
            Helix is built for secure, traceable communication—so the right people
            see the right signal at the right time, without hunting through noise.
          </p>
        </>
      ),
    },
    {
      question: "How does Helix handle escalations when seconds matter?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[600px]">
            Alerts can be routed by role, team, and severity, with one-tap
            escalation instead of copy-pasting updates into new chats or calls.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[600px]">
            The goal is fewer handoffs, faster acknowledgment, and a clear trail
            of who was notified and when—so critical moments don&apos;t depend on
            whoever happened to be looking at their phone.
          </p>
        </>
      ),
    },
    {
      question:
        "How is Helix designed around privacy, security, and audit expectations?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Helix is architected with healthcare-grade expectations in mind:
            encryption in transit, tight access controls, and workflows that
            support auditability—not &quot;best effort&quot; consumer privacy.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
            Every organization has its own compliance review process; we work with
            your security and legal teams on questionnaires, BAAs where
            applicable, and evidence your auditors actually ask for.
          </p>
        </>
      ),
    },
    {
      question: "Can Helix connect to our EHR, paging, and hospital systems?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Yes—that&apos;s the point. Helix is meant to sit alongside what you
            already run: EHR events, on-call schedules, identity systems, and
            existing notification paths.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Integrations are scoped to your environment so alerts and context flow
            in without turning Helix into another siloed inbox.
          </p>
        </>
      ),
    },
    {
      question: "What does rollout look like for a unit or health system?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[580px]">
          Most teams start with a focused pilot—one service line or
          campus—define escalation rules and roles, then expand once workflows
          feel reliable. We help with training materials, success metrics, and a
          phased plan so adoption doesn&apos;t depend on a big-bang go-live.
        </p>
      ),
    },
    {
      question: "How do we explore Helix for our organization?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Start with a conversation about your environments, integrations, and
            outcomes—then we&apos;ll align on a demo or pilot that fits how your
            teams actually work.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Reach out anytime at{" "}
            <a
              href={siteConfig.links.email}
              className="text-foreground underline underline-offset-2"
            >
              {siteConfig.links.email.replace("mailto:", "")}
            </a>{" "}
            or via{" "}
            <Link href={siteConfig.getStartedUrl} className="text-foreground underline">
              Get started
            </Link>
            {" "}
            on{" "}
            <Link href={siteConfig.url} className="text-foreground underline">
              our site
            </Link>
            .
          </p>
        </>
      ),
    },
  ],
  className,
  id = "faq",
}: FAQProps) {
  return (
    <Section id={id} className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-8">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[800px]">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
