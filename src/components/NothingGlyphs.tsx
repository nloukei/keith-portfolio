import { useEffect, useRef } from "react";

type Pulse = { x: number; y: number; start: number };

const DOT_SPACING = 50; // CSS px
const DOT_SIZE = 3; // CSS px

const BASE_DOT_ALPHA = 0.13; // on white bg
const RED = { r: 215, g: 25, b: 33 };

const PULSE_LIFETIME_MS = 1500;
const PULSE_THICKNESS = 26;
const PULSE_SPEED = 520; // px/s
const CURSOR_PULSE_THROTTLE_MS = 900;

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export default function NothingGlyphs() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    let w = 0;
    let h = 0;

    let dots: Array<{ x: number; y: number; mask: number }> = [];
    let pulses: Pulse[] = [];
    let lastCursorPulse = 0;

    let raf = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const centerX = w / 2;
      const centerY = h * 0.35;
      const maxDist = Math.min(w, h) * 0.8;

      const startX = DOT_SPACING / 2;
      const startY = DOT_SPACING / 2;
      const cols = Math.ceil((w - startX) / DOT_SPACING);
      const rows = Math.ceil((h - startY) / DOT_SPACING);

      dots = [];
      for (let ix = 0; ix <= cols; ix++) {
        const x = startX + ix * DOT_SPACING;
        for (let iy = 0; iy <= rows; iy++) {
          const y = startY + iy * DOT_SPACING;
          const dist = Math.hypot(x - centerX, y - centerY);
          const mask = clamp01(1 - (dist * dist) / (maxDist * maxDist));
          dots.push({ x, y, mask });
        }
      }
    };

    const addPulse = (x: number, y: number) => {
      pulses.push({ x, y, start: performance.now() });
      if (pulses.length > 3) pulses = pulses.slice(-3);
    };

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastCursorPulse < CURSOR_PULSE_THROTTLE_MS) return;
      lastCursorPulse = now;
      addPulse(e.clientX, e.clientY);
    };

    const centerY = () => h * 0.35;

    resize();
    addPulse(w / 2, centerY());

    const interval = window.setInterval(() => {
      const jitterX = (Math.random() - 0.5) * 140;
      const jitterY = (Math.random() - 0.5) * 140;
      addPulse(w / 2 + jitterX, centerY() + jitterY);
    }, 4200);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      pulses = pulses.filter((p) => t - p.start < PULSE_LIFETIME_MS);

      for (const d of dots) {
        const alpha = BASE_DOT_ALPHA * d.mask;

        let intensity = 0;
        for (const p of pulses) {
          const ageMs = t - p.start;
          const age01 = clamp01(ageMs / PULSE_LIFETIME_MS);
          const radius = (ageMs / 1000) * PULSE_SPEED;
          const dist = Math.hypot(d.x - p.x, d.y - p.y);
          const band = Math.abs(dist - radius);
          if (band < PULSE_THICKNESS * 1.25) {
            const bandN = band / PULSE_THICKNESS;
            const wave = Math.exp(-bandN * bandN);
            const fade = 1 - age01;
            intensity = Math.max(intensity, wave * fade);
          }
        }

        if (intensity > 0.001) {
          const pulseAlpha = intensity * d.mask * 0.9;
          const finalAlpha = Math.max(alpha, pulseAlpha);
          const size = (DOT_SIZE + intensity * 0.85) * (0.65 + 0.35 * d.mask);
          ctx.fillStyle = `rgba(${RED.r},${RED.g},${RED.b},${finalAlpha.toFixed(3)})`;
          ctx.fillRect(d.x - size / 2, d.y - size / 2, size, size);
        } else {
          if (alpha < 0.01) continue;
          const size = DOT_SIZE * (0.55 + 0.45 * d.mask);
          ctx.fillStyle = `rgba(0,0,0,${alpha.toFixed(3)})`;
          ctx.fillRect(d.x - size / 2, d.y - size / 2, size, size);
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}

