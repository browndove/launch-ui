"use client";

import React, { useRef, useEffect, useCallback } from "react";

/* ───────── Radar Sweep Animation ───────── */
/* Matches the "Fits right into your stack" card from Launch UI reference */

export default function Nodes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const logoRef = useRef<HTMLImageElement | null>(null);

  const SWEEP_DURATION = 5000; // one full rotation

  useEffect(() => {
    const img = new Image();
    img.src = "/helix-logo.png";
    img.onload = () => {
      logoRef.current = img;
    };
  }, []);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = (time - startTimeRef.current) % SWEEP_DURATION;
    const progress = elapsed / SWEEP_DURATION;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Radar center positioned at bottom-center (like the reference)
    const cx = w * 0.5;
    const cy = h * 0.78;
    const maxR = Math.min(w, h) * 0.65;
    const numRings = 4;
    const ringSpacing = maxR / numRings;

    // ── Concentric ring outlines ──
    for (let i = 1; i <= numRings; i++) {
      const r = ringSpacing * i;
      ctx.strokeStyle = `rgba(37, 99, 235, ${0.35 - i * 0.04})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // ── 8-spoke crosshair lines ──
    const spokeAngles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4];
    for (const angle of spokeAngles) {
      ctx.strokeStyle = "rgba(37, 99, 235, 0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.lineTo(cx - Math.cos(angle) * maxR, cy - Math.sin(angle) * maxR);
      ctx.stroke();
    }

    // ── Animated cone sweep (wedge) ──
    const sweepAngle = progress * Math.PI * 2 - Math.PI / 2;
    const coneWidth = 1.3; // radians — width of the cone

    // Gradient fill for the cone
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, maxR, sweepAngle - coneWidth, sweepAngle, false);
    ctx.closePath();
    ctx.clip();

    const coneGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    coneGrad.addColorStop(0, "rgba(37, 99, 235, 0.28)");
    coneGrad.addColorStop(0.4, "rgba(37, 99, 235, 0.16)");
    coneGrad.addColorStop(0.75, "rgba(37, 99, 235, 0.08)");
    coneGrad.addColorStop(1, "rgba(37, 99, 235, 0.02)");
    ctx.fillStyle = coneGrad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // Secondary softer gradient layer for the trailing half of the cone
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, maxR, sweepAngle - coneWidth, sweepAngle - coneWidth * 0.4, false);
    ctx.closePath();
    ctx.clip();
    const trailGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    trailGrad.addColorStop(0, "rgba(37, 99, 235, 0.06)");
    trailGrad.addColorStop(1, "rgba(37, 99, 235, 0)");
    ctx.fillStyle = trailGrad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // Leading edge of sweep
    ctx.strokeStyle = "rgba(37, 99, 235, 0.2)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + Math.cos(sweepAngle) * maxR,
      cy + Math.sin(sweepAngle) * maxR
    );
    ctx.stroke();

    // ── Blip icons ──
    // These are small icon-like shapes at fixed positions on the radar
    const blips = [
      { angle: -2.3, dist: 0.52, type: "lines" as const },
      { angle: -0.5, dist: 0.68, type: "gear" as const },
      { angle: 0.8, dist: 0.88, type: "bolt" as const },
    ];

    for (const blip of blips) {
      const bx = cx + Math.cos(blip.angle) * maxR * blip.dist;
      const by = cy + Math.sin(blip.angle) * maxR * blip.dist;

      // Pulse opacity based on sweep proximity
      const blipNormAngle =
        ((blip.angle + Math.PI / 2) / (Math.PI * 2) + 1) % 1;
      const diff = ((progress - blipNormAngle) % 1 + 1) % 1;
      const blipOpacity = diff < 0.3 ? 0.7 + (1 - diff / 0.3) * 0.3 : 0.35;

      // Glow
      const glowR = 14;
      const glow = ctx.createRadialGradient(bx, by, 0, bx, by, glowR);
      glow.addColorStop(0, `rgba(37, 99, 235, ${blipOpacity * 0.25})`);
      glow.addColorStop(1, "rgba(37, 99, 235, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(bx, by, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Icon shapes
      ctx.save();
      ctx.translate(bx, by);
      ctx.globalAlpha = blipOpacity;

      if (blip.type === "lines") {
        // Two horizontal lines (≈ icon)
        ctx.strokeStyle = "rgba(37, 99, 235, 0.9)";
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-4, -2);
        ctx.lineTo(4, -2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-4, 2);
        ctx.lineTo(4, 2);
        ctx.stroke();
      } else if (blip.type === "gear") {
        // Small asterisk/gear
        ctx.strokeStyle = "rgba(37, 99, 235, 0.7)";
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        for (let a = 0; a < 6; a++) {
          const ga = (a / 6) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(ga) * 4, Math.sin(ga) * 4);
          ctx.stroke();
        }
      } else if (blip.type === "bolt") {
        // Small lightning bolt / slash
        ctx.strokeStyle = "rgba(37, 99, 235, 0.7)";
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(-2, -4);
        ctx.lineTo(1, 0);
        ctx.lineTo(-1, 1);
        ctx.lineTo(2, 5);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // ── Center circle with logo ──
    const centerR = 24;

    // Glow behind center
    const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, centerR * 3);
    centerGlow.addColorStop(0, "rgba(37, 99, 235, 0.12)");
    centerGlow.addColorStop(1, "rgba(37, 99, 235, 0)");
    ctx.fillStyle = centerGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, centerR * 3, 0, Math.PI * 2);
    ctx.fill();

    // Filled circle
    const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, centerR);
    cGrad.addColorStop(0, "rgba(219, 234, 254, 1)");
    cGrad.addColorStop(1, "rgba(191, 219, 254, 0.95)");
    ctx.fillStyle = cGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
    ctx.fill();

    // Border
    ctx.strokeStyle = "rgba(37, 99, 235, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
    ctx.stroke();

    // Draw the Helix logo in the center (or fallback shield)
    if (logoRef.current) {
      ctx.save();
      // Use the logo as a mask via compositing
      ctx.beginPath();
      ctx.arc(cx, cy, centerR - 4, 0, Math.PI * 2);
      ctx.clip();

      // Draw blue-tinted logo
      ctx.globalAlpha = 0.85;
      ctx.drawImage(
        logoRef.current,
        cx - 10,
        cy - 10,
        20,
        20
      );
      ctx.restore();
    } else {
      // Fallback: shield with checkmark
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = "rgba(37, 99, 235, 0.75)";
      ctx.beginPath();
      ctx.moveTo(0, -9);
      ctx.bezierCurveTo(5, -9, 8, -6, 8, -2);
      ctx.bezierCurveTo(8, 3, 4, 7, 0, 10);
      ctx.bezierCurveTo(-4, 7, -8, 3, -8, -2);
      ctx.bezierCurveTo(-8, -6, -5, -9, 0, -9);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(-3, 0);
      ctx.lineTo(-1, 3);
      ctx.lineTo(4, -3);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore(); // undo dpr scaling

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Resize canvas with HiDPI support
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const syncSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    syncSize();
    const observer = new ResizeObserver(syncSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Auto-start animation
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "300px" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ display: "block" }}
      />
    </div>
  );
}
