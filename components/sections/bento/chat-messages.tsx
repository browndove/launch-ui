"use client";

import React, { useEffect, useState, useCallback } from "react";

/* ───────── Floating Chat Messages Animation ───────── */

interface Message {
  id: number;
  text: string;
  sender: "left" | "right";
  avatar: string;
  color: string;
}

const MESSAGES: Message[] = [
  { id: 1, text: "Patient in Room 204 needs urgent review", sender: "left", avatar: "Dr", color: "#2563eb" },
  { id: 2, text: "On my way — pulling up the chart now", sender: "right", avatar: "RN", color: "#7c3aed" },
  { id: 3, text: "Labs are back, vitals look stable 👍", sender: "left", avatar: "Dr", color: "#2563eb" },
  { id: 4, text: "Great, I'll update the care plan", sender: "right", avatar: "RN", color: "#7c3aed" },
  { id: 5, text: "Shift handoff at 7pm — notes ready?", sender: "left", avatar: "Dr", color: "#2563eb" },
];

const STAGGER_DELAY = 700; // ms between messages
const CYCLE_PAUSE = 2200; // ms to hold all visible before reset
const FADE_OUT_DURATION = 500; // ms for fade-out

export default function ChatMessages() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  const runCycle = useCallback(() => {
    setPhase("in");
    setVisibleCount(0);

    // Stagger in each message
    MESSAGES.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCount((prev) => Math.max(prev, i + 1));
      }, (i + 1) * STAGGER_DELAY);
    });

    // Hold phase
    const holdStart = (MESSAGES.length + 1) * STAGGER_DELAY;
    setTimeout(() => setPhase("hold"), holdStart);

    // Fade out phase
    setTimeout(() => {
      setPhase("out");
    }, holdStart + CYCLE_PAUSE);

    // Restart
    setTimeout(() => {
      runCycle();
    }, holdStart + CYCLE_PAUSE + FADE_OUT_DURATION + 300);
  }, []);

  useEffect(() => {
    runCycle();
    // Cleanup not strictly needed since cycle is self-terminating,
    // but we guard with a flag in production
  }, [runCycle]);

  return (
    <div
      className="flex flex-col gap-2 px-1 pb-2 pt-3"
      style={{
        minHeight: 190,
        opacity: phase === "out" ? 0 : 1,
        transition: `opacity ${FADE_OUT_DURATION}ms ease-in-out`,
      }}
    >
      {MESSAGES.map((msg, i) => {
        const isVisible = i < visibleCount;
        const delayMs = 40 * i;

        return (
          <div
            key={msg.id}
            className="flex items-end gap-2"
            style={{
              flexDirection: msg.sender === "right" ? "row-reverse" : "row",
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateY(0) scale(1)"
                : "translateY(16px) scale(0.95)",
              filter: isVisible ? "blur(0)" : "blur(2px)",
              transition: `opacity 0.45s cubic-bezier(0.22,1,0.36,1) ${delayMs}ms, 
                           transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delayMs}ms,
                           filter 0.4s ease-out ${delayMs}ms`,
            }}
          >
            {/* Avatar */}
            <div
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
              style={{
                background: msg.sender === "left" ? "#dbeafe" : "#ede9fe",
                color: msg.color,
              }}
            >
              {msg.avatar}
            </div>

            {/* Bubble */}
            <div
              className="max-w-[78%] rounded-2xl px-3.5 py-2 text-[12px] leading-[1.55] font-medium"
              style={{
                background: msg.sender === "right" ? "#2563eb" : "#f3f4f6",
                color: msg.sender === "right" ? "#fff" : "#1f2937",
                borderBottomRightRadius: msg.sender === "right" ? 6 : 18,
                borderBottomLeftRadius: msg.sender === "left" ? 6 : 18,
                boxShadow:
                  msg.sender === "right"
                    ? "0 2px 8px rgba(37, 99, 235, 0.2)"
                    : "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              {msg.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
