"use client";

import React, { ReactNode, useRef, useEffect, useCallback } from "react";

/* ───────── Beam Animation ───────── */

export default function BeamAnimation() {
  const centerRings = [110, 170, 240, 320];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const CYCLE_DURATION = 2800;
  const MAX_R = 95;

  const easeInOut = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animate = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (!startTimeRef.current) startTimeRef.current = time;

      const elapsed = (time - startTimeRef.current) % CYCLE_DURATION;
      const progress = elapsed / CYCLE_DURATION;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const nodeX = [canvas.width * 0.15, canvas.width / 2, canvas.width * 0.85];

      let beamX = nodeX[0];
      let beamR = 6;
      let offset = 0;
      let phaseOpacity = 1;

      if (progress < 0.05) {
        const p = progress / 0.05;
        beamX = nodeX[0];
        beamR = 6;
        phaseOpacity = p;
      } else if (progress < 0.45) {
        const p = (progress - 0.05) / 0.4;
        const e = easeInOut(p);
        beamX = nodeX[0] + (nodeX[1] - nodeX[0]) * e;
        beamR = 6 + (MAX_R - 6) * e;
        offset = -18 * (1 - p);
      } else if (progress < 0.58) {
        beamX = nodeX[1];
        beamR = MAX_R;
        offset = 0;
      } else if (progress < 0.94) {
        const p = (progress - 0.58) / 0.36;
        const e = easeInOut(p);
        beamX = nodeX[1] + (nodeX[2] - nodeX[1]) * e;
        beamR = MAX_R - (MAX_R - 6) * e;
        offset = 22 * p;
      } else {
        const p = (progress - 0.94) / 0.06;
        beamX = nodeX[2];
        beamR = 6;
        phaseOpacity = 1 - p;
      }

      const actualX = beamX + offset;
      const scaleY = Math.max(0.06, beamR / MAX_R);

      const haloR = beamR * 1.4;
      ctx.save();
      ctx.translate(actualX, centerY);
      ctx.scale(1, scaleY);
      const haloGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, haloR);
      haloGrad.addColorStop(0, `rgba(37,99,235,${0.38 * phaseOpacity})`);
      haloGrad.addColorStop(1, "rgba(37,99,235,0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(0, 0, haloR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const coreR = beamR * 0.7;
      ctx.save();
      ctx.translate(actualX, centerY);
      ctx.scale(1, scaleY);
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR);
      coreGrad.addColorStop(0, `rgba(225,235,255,${phaseOpacity})`);
      coreGrad.addColorStop(0.5, `rgba(37,99,235,${0.35 * phaseOpacity})`);
      coreGrad.addColorStop(1, "rgba(37,99,235,0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, coreR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const syncSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    syncSize();
    const observer = new ResizeObserver(syncSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[320px] w-full items-center justify-center gap-40 px-2"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />

      <div
        className="pointer-events-none absolute left-0 right-0 top-1/2 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, #e6dfd7 15%, #e6dfd7 85%, transparent 100%)",
        }}
      />

      <SideNode>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
          <path d="m7 16.5-4.74-2.85" />
          <path d="m7 16.5 5-3" />
          <path d="M7 16.5v5.17" />
          <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
          <path d="m17 16.5-5-3" />
          <path d="m17 16.5 4.74-2.85" />
          <path d="M17 16.5v5.17" />
          <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
          <path d="M12 8 7.26 5.15" />
          <path d="m12 8 4.74-2.85" />
          <path d="M12 13.5V8" />
        </svg>
      </SideNode>

      <div className="relative z-10 flex items-center justify-center">
        {centerRings.map((size, i) => (
          <span
            key={size}
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              width: size,
              height: size,
              border: "1px solid #93c5fd",
              opacity: 0.7 - i * 0.14,
              maskImage:
                "radial-gradient(circle, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          />
        ))}
        <div
          className="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-full"
          style={{
            background: "#dbeafe",
            border: "1px solid #93c5fd",
            boxShadow: "0 8px 28px rgba(37, 99, 235, 0.22)",
          }}
        >
          <span
            aria-hidden
            className="block h-7 w-7"
            style={{
              backgroundColor: "#2563eb",
              WebkitMaskImage: "url(/helix-logo.png)",
              maskImage: "url(/helix-logo.png)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        </div>
      </div>

      <SideNode>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      </SideNode>
    </div>
  );
}

function SideNode({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 flex items-center justify-center">
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{ width: 110, height: 110, border: "1px solid #ece5dc", opacity: 0.7 }}
      />
      <div
        className="relative z-10 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white"
        style={{ border: "1px solid #e0d8d0", color: "#b8ad9e" }}
      >
        {children}
      </div>
    </div>
  );
}
