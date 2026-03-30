import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GlowCursor() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const x = useSpring(mouseX, { damping: 20, stiffness: 200, mass: 0.5 });
  const y = useSpring(mouseY, { damping: 20, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-40 hidden md:block"
      style={{
        x,
        y,
        background:
          "radial-gradient(circle, rgba(215,25,33,0.045) 0%, transparent 55%)",
      }}
    />
  );
}
