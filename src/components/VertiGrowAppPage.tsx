import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import verticalAppImg from "../assets/verticalapp.jpg";
import verticalAppImg2 from "../assets/verticalapp2.jpg";

interface Props {}

const lightboxVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: { src: string; alt: string }[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const active = images[index];

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
      variants={lightboxVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={active.src}
            src={active.src}
            alt={active.alt}
            className="max-w-[96vw] max-h-[88vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          />
        </AnimatePresence>

        <div className="absolute top-4 right-4">
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-white/10 backdrop-blur px-4 py-2 border border-white/15 text-white/90 font-mono text-[11px] tracking-[0.15em] hover:border-[#D71921]/50 transition-colors"
          >
            Close ✕
          </motion.button>
        </div>

        <div className="absolute left-4 right-4 bottom-4 flex justify-between">
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prev();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-white/10 backdrop-blur px-4 py-2 border border-white/15 text-white/90 font-mono text-[11px] tracking-[0.15em] hover:border-[#D71921]/50 transition-colors"
          >
            ← Prev
          </motion.button>
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              next();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-white/10 backdrop-blur px-4 py-2 border border-white/15 text-white/90 font-mono text-[11px] tracking-[0.15em] hover:border-[#D71921]/50 transition-colors"
          >
            Next →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export default function VertiGrowAppPage(_props: Props) {
  const githubHref = "https://github.com/Fibii44/VertiGrow-App-Showcase";

  const images = useMemo(
    () => [
      { src: verticalAppImg.src, alt: "VertiGrow App screenshot 1" },
      { src: verticalAppImg2.src, alt: "VertiGrow App screenshot 2" },
    ],
    [],
  );

  const features = useMemo(
    () => [
      "Real-time sensor monitoring (temperature, humidity, soil moisture per layer, light intensity, water level)",
      "Multi-layer vertical farm dashboard",
      "Fuzzy logic-based automatic watering control",
      "Manual pump control via web interface",
      "Sensor data logging and history graphs",
      "Alerts for low soil moisture and low water level",
      "Energy-efficient operation using solar power",
      "Admin access for system configuration and threshold management",
    ],
    [],
  );

  const techStack = useMemo(
    () => [
      { category: "Mobile Development", items: ["Android Studio", "Firebase"] },
      { category: "Mobile Frameworks", items: ["Android SDK", "Java"] },
      { category: "Databases", items: ["Firebase"] },
      { category: "IoT & Hardware", items: ["ESP32", "Solar"] },
    ],
    [],
  );

  const techIconMap: Record<string, string | null> = {
    // Mapped ones will show Simple Icons (monochrome). Unmapped fall back to red dot.
    "Android Studio": null,
    "Android SDK": "https://cdn.simpleicons.org/android",
    Kotlin: "https://cdn.simpleicons.org/kotlin",
    Java: "https://cdn.simpleicons.org/openjdk",
    Firebase: "https://cdn.simpleicons.org/firebase",
    ESP32: null,
    Solar: null,
  };

  const members = useMemo(
    () => [
      { name: "Feby Angela Felices", github: "https://github.com/Fibii44" },
      { name: "Keith Einlou Pogoy", github: "https://github.com/nloukei" },
      { name: "James Joshua Yosores", github: "https://github.com/Yosores04" },
      { name: "Sern Ponce", github: "https://github.com/Ponceeee" },
    ],
    [],
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
    hidden: {},
  };

  const [previewIndex, setPreviewIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);

  const openLightbox = (i: number) => {
    setLightboxStart(i);
    setLightboxOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA]">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 px-6 md:px-10 pt-8"
      >
        <a
          href="/#overview"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-black/40 hover:text-[#D71921] transition-colors duration-200"
        >
          ← Back to Overview
        </a>
      </motion.div>

      <motion.main
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-12 space-y-16"
      >
        {/* Header */}
        <motion.section variants={fadeUp} className="space-y-4">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D71921]">Project · Mobile / IoT</p>
          <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight">
            Vertical Farming<br />
            Monitoring App
          </h1>
          <p className="text-black/55 text-lg leading-relaxed max-w-2xl">
            A mobile companion app that streams sensor updates in real time, helping operators monitor the
            vertical farm and stay on top of alerts from anywhere.
          </p>

          <motion.a
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, boxShadow: "0 16px 40px rgba(215,25,33,0.18)" }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 mt-2 rounded-xl bg-black text-white px-6 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-[#D71921] transition-colors duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View on GitHub ↗
          </motion.a>
        </motion.section>

        {/* Screenshot Preview */}
        <motion.section variants={fadeUp} className="space-y-4">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D71921]">Screenshots</p>

          <div
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-black/[0.07] bg-white shadow-sm cursor-zoom-in"
            onClick={() => openLightbox(previewIndex)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={images[previewIndex].src}
                src={images[previewIndex].src}
                alt={images[previewIndex].alt}
                className="absolute inset-0 w-full h-full object-contain object-center"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                loading="lazy"
              />
            </AnimatePresence>

            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            />

            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur px-3 py-1.5">
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/70">Click to expand</span>
            </div>
          </div>

          <div className="flex gap-3">
            {images.map((img, i) => (
              <motion.button
                key={img.src}
                type="button"
                onClick={() => setPreviewIndex(i)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`relative w-28 aspect-video rounded-xl overflow-hidden border transition-colors duration-200 ${
                  previewIndex === i
                    ? "border-[#D71921]/60 shadow-[0_4px_20px_rgba(215,25,33,0.15)]"
                    : "border-black/[0.07] opacity-60 hover:opacity-90"
                }`}
                aria-label={`Preview screenshot ${i + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain object-center"
                  loading="lazy"
                />
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Key Features */}
        <motion.section variants={fadeUp} className="space-y-5">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D71921]">Key Features</p>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] mt-2 shrink-0" />
                <span className="text-sm text-black/65 leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Tech Stack */}
        <motion.section variants={fadeUp} className="space-y-5">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D71921]">Tech Stack</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {techStack.map((cat) => (
              <div key={cat.category} className="rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl p-5">
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-black/30 mb-3">{cat.category}</p>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-xl bg-black/[0.04] border border-black/[0.06] flex items-center justify-center shrink-0">
                        {techIconMap[item] ? (
                          <img
                            src={techIconMap[item] as string}
                            alt={item}
                            className="w-4 h-4 grayscale"
                            loading="lazy"
                          />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#D71921]" />
                        )}
                      </span>
                      <span className="font-mono text-xs text-black/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section variants={fadeUp} className="space-y-5">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D71921]">Project Members</p>
          <div className="flex flex-wrap gap-3">
            {members.map((m) => (
              <motion.a
                key={m.name}
                href={m.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, borderColor: "rgba(215,25,33,0.35)" }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5 rounded-xl border border-black/[0.08] bg-white/70 backdrop-blur px-4 py-2.5 text-black/65 hover:text-black transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 opacity-50">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span className="font-mono text-[11px] tracking-[0.1em]">{m.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.section>
      </motion.main>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            startIndex={lightboxStart}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

