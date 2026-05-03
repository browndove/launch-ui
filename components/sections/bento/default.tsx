import React, { ReactNode } from "react";

import { cn } from "@/lib/utils";
import Nodes from "./nodes-canvas";
import BeamAnimation from "./beam-animation";
import Globe from "./globe-canvas";
import ChatMessages from "./chat-messages";

interface BentoProps {
  className?: string;
}

export default function Bento({ className }: BentoProps) {
  return (
    <section
      id="helix-app"
      className={cn("w-full scroll-mt-24 py-12 sm:py-16", className)}
      style={{ background: "#f1f0ee" }}
    >
      <div className="mx-auto w-full max-w-[1180px] px-6">
        <div className="grid grid-cols-12 gap-3">
          {/* Row 1 — narrow | wide */}
          <Card className="group col-span-12 md:col-span-5">
            <CardText
              title="User-Friendly Design"
              description="Clean, intuitive interfaces built for healthcare professionals. Every element is thoughtfully designed to be reliable, accessible, and a pleasure to use."
            />
            <Visual>
              <PhoneMockup />
            </Visual>
          </Card>

          <Card className="col-span-12 md:col-span-7">
            <ArrowButton />
            <CardText
              title="Made for fast Communication"
              description="Instant secure messaging for hospital teams. Get critical updates and coordinate care seamlessly across roles, users and facilities with real-time delivery."
            />
            <div className="relative flex flex-1 items-center justify-center pt-6">
              <BeamAnimation />
            </div>
          </Card>

          {/* Row 2 — wide | narrow */}
          <Card className="col-span-12 md:col-span-7">
            <CardText
              title="Enterprise-Grade Security"
              description="Your messages are always private and protected. HIPAA compliant with strong security so sensitive patient information stays safe."
            />
            <Visual>
              <Nodes />
            </Visual>
          </Card>

          <Card className="col-span-12 md:col-span-5">
            <CardText
              title="Reliable Communication"
              description="Messages delivered instantly across roles, users and facilities. Built on resilient infrastructure so your team stays connected when it matters most."
            />
            <Visual>
              <Globe />
            </Visual>
          </Card>

          {/* Row 3 — narrow | wide */}
          <Card
            id="admin-panel"
            className="col-span-12 scroll-mt-24 md:col-span-5"
          >
            <CardText
              title="Admin Control Panel"
              description="Powerful admin dashboard to set permissions, manage team access, and oversee all hospital operations in one place."
            />
            <Visual>
              <BarChart />
            </Visual>
          </Card>

          <Card className="col-span-12 md:col-span-7">
            <CardText
              title="Built for Teams"
              description="Seamless messaging built for fast-moving hospital teams. Coordinate care seamlessly across roles, users and facilities with real-time conversations."
            />
            <Visual>
              <ChatMessages />
            </Visual>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ───────── primitives ───────── */

function Card({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <article
      id={id}
      className={cn(
        "relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl bg-white p-8",
        className,
      )}
    >
      {children}
    </article>
  );
}

function CardText({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h3
        className="mb-2 text-[20px] font-semibold tracking-tight"
        style={{ color: "#0f0f0f" }}
      >
        {title}
      </h3>
      <p
        className="m-0 line-clamp-3 text-[14px] leading-[1.6]"
        style={{ color: "#888" }}
      >
        {description}
      </p>
    </>
  );
}

function Visual({ children }: { children: ReactNode }) {
  return <div className="relative mt-auto pt-6">{children}</div>;
}

function ArrowButton() {
  return (
    <button
      type="button"
      aria-label="Open"
      className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full text-[14px] leading-none"
      style={{ border: "1px solid #e0d8d0", color: "#888", background: "transparent" }}
    >
      ↗
    </button>
  );
}

/* ───────── card 1 — phone mockup ───────── */

function PhoneMockup() {
  return (
    <div
      className="relative mx-auto -mb-[60px] h-[300px] w-[360px] max-w-full overflow-hidden rounded-t-[28px] bg-white p-3 pb-0 transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-14"
      style={{ border: "1px solid #eee", borderBottom: "none" }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-t-[20px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/phone2.png"
          alt="Helix mobile app"
          className="absolute left-0 top-0 w-full"
          style={{ height: "auto" }}
        />
      </div>
    </div>
  );
}


/* ───────── card 3 — editor ───────── */

function Editor() {
  return (
    <div
      className="-mx-2 -mb-14 rounded-[10px] px-4 pb-4 pt-3.5"
      style={{
        background: "#1a1a1a",
        fontFamily: '"SF Mono", Menlo, Consolas, monospace',
        fontSize: 12.5,
        lineHeight: 1.7,
      }}
      aria-hidden
    >
      <div className="flex gap-1.5 pb-3">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
      </div>
      <pre className="m-0 overflow-hidden whitespace-pre" style={{ color: "#d6d6d6" }}>
        <span style={{ color: "#6e6e6e", fontStyle: "italic" }}>{`// security.ts`}</span>
        {"\n"}
        <span style={{ color: "#2563eb" }}>import</span>{" "}
        <span style={{ color: "#9a9a9a" }}>{"{"}</span> encrypt{" "}
        <span style={{ color: "#9a9a9a" }}>{"}"}</span>{" "}
        <span style={{ color: "#2563eb" }}>from</span>{" "}
        <span style={{ color: "#6cb6a3" }}>{`"crypto-js"`}</span>
        <span style={{ color: "#9a9a9a" }}>;</span>
        {"\n\n"}
        <span style={{ color: "#2563eb" }}>export function</span>{" "}
        <span style={{ color: "#e3b341" }}>secureMessage</span>
        <span style={{ color: "#9a9a9a" }}>(</span>msg
        <span style={{ color: "#9a9a9a" }}>)</span>{" "}
        <span style={{ color: "#9a9a9a" }}>{"{"}</span>
        {"\n  "}
        <span style={{ color: "#2563eb" }}>return</span>{" "}
        <span style={{ color: "#e3b341" }}>encrypt</span>
        <span style={{ color: "#9a9a9a" }}>(</span>msg
        <span style={{ color: "#9a9a9a" }}>,</span>{" "}
        <span style={{ color: "#6cb6a3" }}>{`"HIPAA-256"`}</span>
        <span style={{ color: "#9a9a9a" }}>);</span>
        {"\n"}
        <span style={{ color: "#9a9a9a" }}>{"}"}</span>
      </pre>
    </div>
  );
}

/* ───────── card 4 — performance ───────── */

function Performance() {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[13px] font-medium" style={{ color: "#888" }}>
        Performance
      </span>
      <span
        className="text-[56px] font-bold leading-none tracking-[-0.02em]"
        style={{ color: "#0f0f0f" }}
      >
        98
        <sup
          className="ml-1 align-super text-[18px] font-semibold"
          style={{ color: "#888" }}
        >
          /100
        </sup>
      </span>
      <div
        className="h-3 overflow-hidden rounded-full"
        style={{ background: "#e8eef6" }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: "95%", background: "#2563eb" }}
        />
      </div>
    </div>
  );
}

/* ───────── card 5 — bar chart ───────── */

function BarChart() {
  const bars = [
    { h: 35, hi: false },
    { h: 55, hi: false },
    { h: 45, hi: false },
    { h: 95, hi: true },
    { h: 70, hi: false },
    { h: 50, hi: false },
  ];
  return (
    <div className="flex h-[140px] items-end justify-between gap-2.5 px-1" aria-hidden>
      {bars.map((b, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md"
          style={{
            height: `${b.h}%`,
            background: b.hi ? "#2563eb" : "#d0d8e0",
          }}
        />
      ))}
    </div>
  );
}

/* ───────── card 6 — controls ───────── */

function Controls() {
  return (
    <div className="flex items-center justify-around gap-6 px-2 pb-2 pt-7">
      <ControlItem label="Toggle">
        <span
          className="relative block h-7 w-12 rounded-full"
          style={{ background: "#2563eb" }}
        >
          <span
            className="absolute right-[3px] top-[3px] h-[22px] w-[22px] rounded-full bg-white"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
          />
        </span>
      </ControlItem>

      <ControlItem label="Checkbox">
        <span
          className="relative block h-[26px] w-[26px] rounded-md"
          style={{ background: "#2563eb" }}
        >
          <span
            className="absolute"
            style={{
              left: 7,
              top: 3,
              width: 8,
              height: 14,
              borderRight: "2.5px solid #fff",
              borderBottom: "2.5px solid #fff",
              transform: "rotate(45deg)",
            }}
          />
        </span>
      </ControlItem>

      <ControlItem label="Radio">
        <span
          className="relative block h-[26px] w-[26px] rounded-full bg-white"
          style={{ border: "2px solid #2563eb" }}
        >
          <span
            className="absolute rounded-full"
            style={{ inset: 4, background: "#2563eb" }}
          />
        </span>
      </ControlItem>
    </div>
  );
}

function ControlItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      {children}
      <span className="text-[12px] font-medium" style={{ color: "#888" }}>
        {label}
      </span>
    </div>
  );
}
