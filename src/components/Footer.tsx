import { motion } from "framer-motion";

const links = [
  { label: "Email", href: "mailto:2201103742@student.buksu.edu.ph" },
  { label: "GitHub", href: "https://github.com/nloukei" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/keith-einlou-pogoy-b5b7b939a/" },
];

export default function Footer() {
  return (
    <footer id="contact" className="py-16 md:py-24 px-6 text-white" style={{ background: "#1a0808" }}>
      {/* Decorative ruled lines at top — like notebook cover */}
      <div
        className="max-w-4xl mx-auto mb-12 h-px opacity-20"
        style={{ background: "repeating-linear-gradient(to right, #D71921 0, #D71921 8px, transparent 8px, transparent 16px)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12"
      >
        <div>
          {/* Doodle star */}
          <span aria-hidden className="text-[#D71921] opacity-60 text-3xl">★</span>
          <h3
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
            className="text-4xl md:text-5xl mt-1"
          >
            Let&apos;s connect<span className="text-[#D71921]">.</span>
          </h3>
          {/* Squiggle underline */}
          <svg viewBox="0 0 220 12" className="h-3 mt-1" style={{ width: "220px" }} fill="none" aria-hidden>
            <path
              d="M4 6 C 22 1, 44 11, 66 6 S 106 1, 128 6 S 168 11, 190 6 S 212 1, 218 6"
              stroke="#D71921" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"
            />
          </svg>
          <p style={{ fontFamily: "Caveat, cursive" }} className="text-xl text-white/35 mt-4">
            Open to internship opportunities
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 hover:text-[#D71921] transition-colors duration-200"
              style={{ fontFamily: "Caveat, cursive", fontSize: "22px" }}
            >
              {link.label}
              <span className="inline-block ml-1.5 text-sm opacity-50">↗</span>
            </a>
          ))}
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-white/10">
        <p style={{ fontFamily: "Caveat, cursive" }} className="text-lg text-white/20">
          © 2026 Keith Einlou Pogoy
        </p>
        <p style={{ fontFamily: "Caveat, cursive" }} className="mt-2 text-lg text-white/25">
          Built with Astro, TypeScript, React, Tailwind CSS &amp; Vite
        </p>
      </div>
    </footer>
  );
}
