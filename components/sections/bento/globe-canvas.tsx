"use client";

import React, { useRef, useEffect, useCallback } from "react";

/* ───────── 3D Wireframe Globe with Orbital Rings ───────── */

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const ORBIT_DURATION = 7000;

  // Globe parameters
  const SPHERE_RADIUS = 200;
  const TILT_X = 0.3;
  const ROLL_Z = 0.55;
  const NUM_LAT = 14;
  const NUM_LON = 18;
  const SEGMENTS = 80;

  // Ring parameters (two orbital rings forming an X)
  const rings = [
    { cx: 300, cy: 220, rx: 275, ry: 85, angle: -0.9 },
    { cx: 310, cy: 240, rx: 250, ry: 95, angle: 0.2 },
  ];

  // Project 3D point to 2D with depth
  const project = useCallback(
    (
      x: number,
      y: number,
      z: number,
      sphereCx: number,
      sphereCy: number
    ): [number, number, number] => {
      // Rotate around X axis
      const y1 = y * Math.cos(TILT_X) - z * Math.sin(TILT_X);
      const z1 = y * Math.sin(TILT_X) + z * Math.cos(TILT_X);
      // Rotate around Z axis
      const x2 = x * Math.cos(ROLL_Z) - y1 * Math.sin(ROLL_Z);
      const y2 = x * Math.sin(ROLL_Z) + y1 * Math.cos(ROLL_Z);
      return [sphereCx + x2, sphereCy + y2, z1];
    },
    []
  );

  const animate = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = (time - startTimeRef.current) % ORBIT_DURATION;
      const t = elapsed / ORBIT_DURATION;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const sphereCx = w * 0.55;
      const sphereCy = h * 0.95;
      const scale = Math.min(w / 660, h / 560) * 1.55;

      ctx.save();
      ctx.translate(
        sphereCx - 330 * scale + (w * 0.5 - sphereCx),
        sphereCy - 280 * scale + (h * 0.5 - sphereCy)
      );
      ctx.scale(scale, scale);

      const sCx = 330;
      const sCy = 280;
      const R = SPHERE_RADIUS;

      // ── 1. Draw orbital rings (behind the globe) ──
      for (const ring of rings) {
        ctx.strokeStyle = "rgba(30, 64, 175, 0.55)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let i = 0; i <= 360; i++) {
          const a = (i * Math.PI) / 180;
          const px =
            ring.rx * Math.cos(a) * Math.cos(ring.angle) -
            ring.ry * Math.sin(a) * Math.sin(ring.angle) +
            ring.cx;
          const py =
            ring.rx * Math.cos(a) * Math.sin(ring.angle) +
            ring.ry * Math.sin(a) * Math.cos(ring.angle) +
            ring.cy;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // ── 2. Draw wireframe globe ──
      // Latitude rings
      for (let lat = 0; lat < NUM_LAT; lat++) {
        const phi = ((lat + 1) / (NUM_LAT + 1)) * Math.PI;
        for (let seg = 0; seg < SEGMENTS; seg++) {
          const theta1 = (seg / SEGMENTS) * Math.PI * 2;
          const theta2 = ((seg + 1) / SEGMENTS) * Math.PI * 2;

          const x1 = R * Math.sin(phi) * Math.cos(theta1);
          const y1s = R * Math.sin(phi) * Math.sin(theta1);
          const z1 = R * Math.cos(phi);

          const x2 = R * Math.sin(phi) * Math.cos(theta2);
          const y2s = R * Math.sin(phi) * Math.sin(theta2);
          const z2 = R * Math.cos(phi);

          const [px1, py1, dz1] = project(x1, y1s, z1, sCx, sCy);
          const [px2, py2, dz2] = project(x2, y2s, z2, sCx, sCy);

          const depth = (dz1 + dz2) / 2;
          const nd = (depth / R + 1) / 2;
          const alpha = 0.03 + nd * 0.62;
          const lw = 0.35 + nd * 0.8;

          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = lw;
          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.lineTo(px2, py2);
          ctx.stroke();
        }
      }

      // Longitude lines
      for (let lon = 0; lon < NUM_LON; lon++) {
        const theta = (lon / NUM_LON) * Math.PI * 2;
        for (let seg = 0; seg < SEGMENTS; seg++) {
          const phi1 = (seg / SEGMENTS) * Math.PI;
          const phi2 = ((seg + 1) / SEGMENTS) * Math.PI;

          const x1 = R * Math.sin(phi1) * Math.cos(theta);
          const y1s = R * Math.sin(phi1) * Math.sin(theta);
          const z1 = R * Math.cos(phi1);

          const x2 = R * Math.sin(phi2) * Math.cos(theta);
          const y2s = R * Math.sin(phi2) * Math.sin(theta);
          const z2 = R * Math.cos(phi2);

          const [px1, py1, dz1] = project(x1, y1s, z1, sCx, sCy);
          const [px2, py2, dz2] = project(x2, y2s, z2, sCx, sCy);

          const depth = (dz1 + dz2) / 2;
          const nd = (depth / R + 1) / 2;
          const alpha = 0.03 + nd * 0.62;
          const lw = 0.35 + nd * 0.8;

          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = lw;
          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.lineTo(px2, py2);
          ctx.stroke();
        }
      }

      // ── 3. Draw orbiting dot on Ring 1 ──
      const ring = rings[0];
      const dotAngle = t * Math.PI * 2;
      const dotX =
        ring.rx * Math.cos(dotAngle) * Math.cos(ring.angle) -
        ring.ry * Math.sin(dotAngle) * Math.sin(ring.angle) +
        ring.cx;
      const dotY =
        ring.rx * Math.cos(dotAngle) * Math.sin(ring.angle) +
        ring.ry * Math.sin(dotAngle) * Math.cos(ring.angle) +
        ring.cy;

      // Soft glow
      const glow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 11);
      glow.addColorStop(0, "rgba(59, 130, 246, 0.75)");
      glow.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 11, 0, Math.PI * 2);
      ctx.fill();

      // Solid core
      ctx.fillStyle = "rgba(37, 99, 235, 1)";
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // undo scale transform
      ctx.restore(); // undo dpr scaling

      animationRef.current = requestAnimationFrame(animate);
    },
    [project, rings]
  );

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
      style={{ height: "280px" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ display: "block" }}
      />
    </div>
  );
}
