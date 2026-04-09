import { useEffect, useRef } from "react";

type DoodleKind = "star" | "circle" | "plus" | "x" | "heart" | "asterisk";

interface Doodle {
  x: number;
  y: number;
  size: number;
  angle: number;
  kind: DoodleKind;
  r: number;
  g: number;
  b: number;
  maxAlpha: number;
  born: number;
  life: number;
}

const KINDS: DoodleKind[] = ["star", "circle", "plus", "x", "heart", "asterisk"];

// Faint pencil grays + occasional pink/purple ink
const PALETTE = [
  { r: 44, g: 43, b: 39, a: 0.09 },
  { r: 44, g: 43, b: 39, a: 0.07 },
  { r: 44, g: 43, b: 39, a: 0.11 },
  { r: 192, g: 38, b: 211, a: 0.18 },
  { r: 147, g: 51, b: 234, a: 0.14 },
  { r: 100, g: 155, b: 215, a: 0.13 },
];

function drawDoodle(
  ctx: CanvasRenderingContext2D,
  kind: DoodleKind,
  size: number
) {
  ctx.beginPath();
  switch (kind) {
    case "star":
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * size, Math.sin(a) * size);
      }
      break;
    case "asterisk":
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * size, Math.sin(a) * size);
      }
      break;
    case "circle":
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      break;
    case "plus":
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      break;
    case "x":
      ctx.moveTo(-size, -size);
      ctx.lineTo(size, size);
      ctx.moveTo(size, -size);
      ctx.lineTo(-size, size);
      break;
    case "heart": {
      const s = size * 0.55;
      ctx.moveTo(0, s * 0.8);
      ctx.bezierCurveTo(-s * 1.8, -s * 0.4, -s * 1.8, -s * 2, 0, -s * 0.8);
      ctx.bezierCurveTo(s * 1.8, -s * 2, s * 1.8, -s * 0.4, 0, s * 0.8);
      break;
    }
  }
  ctx.stroke();
}

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
    let raf = 0;
    let doodles: Doodle[] = [];

    const MAX_DOODLES = 24;
    const LIFE_MS = 9000;
    const FADE_MS = 1800;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnDoodle = (now: number) => {
      if (doodles.length >= MAX_DOODLES) return;
      const p = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      doodles.push({
        x: 24 + Math.random() * (w - 48),
        y: 24 + Math.random() * (h - 48),
        size: 5 + Math.random() * 11,
        angle: Math.random() * Math.PI * 2,
        kind: KINDS[Math.floor(Math.random() * KINDS.length)],
        r: p.r,
        g: p.g,
        b: p.b,
        maxAlpha: p.a,
        born: now,
        life: LIFE_MS * (0.6 + Math.random() * 0.7),
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      if (doodles.length < MAX_DOODLES && Math.random() < 0.01) {
        spawnDoodle(t);
      }

      doodles = doodles.filter((d) => {
        const age = t - d.born;
        if (age > d.life) return false;

        let fadeRatio = 1;
        if (age < FADE_MS) fadeRatio = age / FADE_MS;
        else if (age > d.life - FADE_MS) fadeRatio = (d.life - age) / FADE_MS;

        const alpha = d.maxAlpha * fadeRatio;

        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.angle);
        ctx.strokeStyle = `rgba(${d.r},${d.g},${d.b},${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        drawDoodle(ctx, d.kind, d.size);
        ctx.restore();
        return true;
      });

      raf = requestAnimationFrame(draw);
    };

    resize();

    // Seed doodles at staggered ages so the page doesn't start empty
    const now = performance.now();
    for (let i = 0; i < 14; i++) {
      spawnDoodle(now - Math.random() * LIFE_MS * 0.75);
    }

    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
