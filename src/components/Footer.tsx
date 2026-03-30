import { motion } from "framer-motion";

const links = [
  {
    label: "Email",
    href: "mailto:2201103742@student.buksu.edu.ph",
  },
  {
    label: "GitHub",
    href: "https://github.com/nloukei",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/keith-einlou-pogoy-b5b7b939a/",
  },
];

export default function Footer() {
  return (
    <footer className="py-16 md:py-24 px-6 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12"
      >
        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            Let's connect<span className="text-[#D71921]">.</span>
          </h3>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/30 mt-3">
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
              className="font-mono text-sm text-white/50 hover:text-[#D71921] transition-colors duration-200"
            >
              {link.label}
              <span className="inline-block ml-1.5 text-[10px] opacity-50">↗</span>
            </a>
          ))}
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-white/10">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20">
          © 2026 Keith Einlou Pogoy
        </p>
      </div>
    </footer>
  );
}
