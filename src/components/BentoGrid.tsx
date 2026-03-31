import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import vertiGrowImg from "../assets/VertiGrow.png";
import vertiGrowImg2 from "../assets/VertiGrow2.png";
import verticalAppImg from "../assets/verticalapp.jpg";
import verticalAppImg2 from "../assets/verticalapp2.jpg";
import aaccupImg from "../assets/aaccup.png";
import aaccupImg2 from "../assets/aaccup2.png";

// VertiGrowPreview
// - Renders a small "screenshot preview" panel inside a tile
// - Clicking it opens a full-screen modal (ported to `document.body` so it can't be clipped by tile overflow)
// - Prev/Next buttons and keyboard arrows switch between images
function VertiGrowPreview({
  images,
  caption,
  objectFit = "cover",
}: {
  images: Array<{ src: string; alt: string }>;
  caption: string;
  objectFit?: "cover" | "contain";
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const active = images[index];

  // Switch preview image
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  // Keyboard controls for the modal: Escape closes, arrows change the image
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % images.length);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, images.length]);

  return (
    <>
      {/* Preview card shown inside the Bento grid tile */}
      <div
        role="button"
        tabIndex={0}
        className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/50 bg-black/[0.02] cursor-zoom-in"
        onClick={(e) => {
          // This preview sits inside a clickable <a> tile; prevent navigation
          // and only open the lightbox modal.
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            // Prevent spacebar from scrolling the page (common when inside <a>).
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }
        }}
        aria-label="Open full image"
      >
        {/* Animated screenshot swapping */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={active.src}
            src={active.src}
            alt={active.alt}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute inset-0 w-full h-full ${
              objectFit === "contain" ? "object-contain object-center" : "object-cover object-center"
            }`}
            loading="lazy"
          />
        </AnimatePresence>

        {/* Dot grain overlay (keeps it consistent with your Nothing theme) */}
        <div
          className="absolute inset-0 opacity-40 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />

        {/* Top-left "Preview" label */}
        <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D71921]" />
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-black/60">
            Preview
          </span>
        </div>

        {/* Caption text */}
        <div className="absolute bottom-3 left-4 right-4 z-20">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/35">
            {caption}
          </div>
        </div>

        {/* Prev/Next buttons inside the preview */}
        <div className="absolute top-3 right-3 z-30 flex gap-2">
          <motion.button
            type="button"
            onClick={(e) => {
              // Prevent anchor navigation from the surrounding tile.
              e.preventDefault();
              e.stopPropagation();
              prev();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-black/55 backdrop-blur px-3 py-2 border border-white/15 text-white/90 font-mono text-[10px] tracking-[0.15em] hover:bg-black/80 hover:border-[#D71921]/40 transition-colors duration-200"
            aria-label="Previous image"
          >
            Prev
          </motion.button>
          <motion.button
            type="button"
            onClick={(e) => {
              // Prevent anchor navigation from the surrounding tile.
              e.preventDefault();
              e.stopPropagation();
              next();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-black/55 backdrop-blur px-3 py-2 border border-white/15 text-white/90 font-mono text-[10px] tracking-[0.15em] hover:bg-black/80 hover:border-[#D71921]/40 transition-colors duration-200"
            aria-label="Next image"
          >
            Next
          </motion.button>
        </div>
      </div>

      {/* Full-screen modal rendered in a Portal to avoid being clipped by tile overflow */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center p-6"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={active.src}
                      src={active.src}
                      alt={active.alt}
                      className="max-w-[98vw] max-h-[92vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    />
                  </AnimatePresence>

                  {/* Close + navigation controls for the modal */}
                  <div className="absolute top-4 right-4">
                    <motion.button
                      type="button"
                      onClick={() => setOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-full bg-white/10 backdrop-blur px-4 py-2 border border-white/15 text-white/90 font-mono text-[11px] tracking-[0.15em] hover:border-[#D71921]/50 transition-colors duration-200"
                    >
                      Close ✕
                    </motion.button>
                  </div>

                  <div className="absolute left-4 right-4 bottom-4 flex justify-between">
                    <motion.button
                      type="button"
                      onClick={() => prev()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-full bg-white/10 backdrop-blur px-4 py-2 border border-white/15 text-white/90 font-mono text-[11px] tracking-[0.15em] hover:border-[#D71921]/50 transition-colors duration-200"
                    >
                      ← Prev
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => next()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-full bg-white/10 backdrop-blur px-4 py-2 border border-white/15 text-white/90 font-mono text-[11px] tracking-[0.15em] hover:border-[#D71921]/50 transition-colors duration-200"
                    >
                      Next →
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

type Skill = { label: string; icon: string | null };

// Tech stack categories rendered as icon tiles inside the "Tech Stack" Bento tile.
// Icons are pulled from Simple Icons CDN; we style them to start monochrome and
// show brand color on hover.
const skillCategories: { title: string; skills: Skill[] }[] = [
  {
    title: "Front-End",
    skills: [
      { label: "React",       icon: "https://cdn.simpleicons.org/react" },
      { label: "Astro",       icon: "https://cdn.simpleicons.org/astro" },
      { label: "JavaScript", icon: "https://cdn.simpleicons.org/javascript" },
      { label: "Vue.js",      icon: "https://cdn.simpleicons.org/vuedotjs" },
      { label: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
      { label: "Tailwind",    icon: "https://cdn.simpleicons.org/tailwindcss" },
      { label: "Bootstrap",   icon: "https://cdn.simpleicons.org/bootstrap" },
      { label: "HTML5",       icon: "https://cdn.simpleicons.org/html5" },
      { label: "CSS3",        icon: "https://cdn.simpleicons.org/css" },
    ],
  },
  {
    title: "Back-End",
    skills: [
      { label: "Laravel",     icon: "https://cdn.simpleicons.org/laravel" },
      { label: "PHP",         icon: "https://cdn.simpleicons.org/php" },
      { label: "Node.js",     icon: "https://cdn.simpleicons.org/nodedotjs" },
      { label: "Express",     icon: "https://cdn.simpleicons.org/express" },
      { label: "Java",        icon: "https://cdn.simpleicons.org/openjdk" },
      { label: "C",           icon: "https://cdn.simpleicons.org/c" },
    ],
  },
  {
    title: "Database",
    skills: [
      { label: "MySQL",       icon: "https://cdn.simpleicons.org/mysql" },
      { label: "MongoDB",     icon: "https://cdn.simpleicons.org/mongodb" },
      { label: "Firebase",    icon: "https://cdn.simpleicons.org/firebase" },
    ],
  },
  {
    title: "Mobile",
    skills: [
      { label: "Android",     icon: "https://cdn.simpleicons.org/android" },
      { label: "Firebase",    icon: "https://cdn.simpleicons.org/firebase" },
    ],
  },
  {
    title: "Design",
    skills: [
      { label: "Figma",       icon: "https://cdn.simpleicons.org/figma" },
    ],
  },
  {
    title: "Infra",
    skills: [
      { label: "GitHub",      icon: "https://cdn.simpleicons.org/github" },
      { label: "Cisco",       icon: "https://cdn.simpleicons.org/cisco" },
      { label: "Linux",       icon: "https://cdn.simpleicons.org/linux" },
    ],
  },
];

// Each project may have an optional `href` to a dedicated project page.
// If `href` is set, clicking the tile navigates to that page.
const projects = [
  
  {
    title: "Vertical Farming Monitoring System",
    description:
      "Real-time multi-layer farm dashboard with fuzzy-logic watering, IoT sensor integration, and admin thresholds.",
    previewKind: "vertigrow",
    tags: ["Laravel", "PHP", "MongoDB", "IoT", "Firebase"],
    // Trailing slash avoids 404s on some static hosts (e.g. GitHub Pages)
    href: "/projects/vertigrow/",
  },
  {
    title: "Multi-tenant Task Tracker",
    description:
      "Task tracking and file management used by multiple AACCUP departments to organize documents and monitor task progress.",
    tags: ["Laravel", "PHP", "Multi-tenant"],
    previewKind: "aaccup",
    href: "/projects/aaccup-task-tracker/",
  },
  {
    title: "Training & Seminar Management",
    description:
      "MERN stack event management for BukSU personnel with MongoDB, RESTful APIs, and role-based user management.",
    tags: ["React", "Node.js", "MongoDB", "REST API"],
    href: null,
    github: "https://github.com/Fibii44/20241_T145_UNIVERSITY-TRAINING-AND-SEMINAR-MANAGEMENT-SYSTEM",
  },
  {
    title: "Vertical Farming Monitor App",
    description:
      "Android companion app using Firebase for real-time data synchronization and push notifications.",
    tags: ["Android", "Firebase", "Real-time"],
    previewKind: "vertigrow-app",
    href: "/projects/vertigrow-app/",
  },
  {
    title: "UI/UX Design Portfolio",
    description:
      "Mobile and web application interfaces in Figma, focused on clean layouts and consistent design systems.",
    tags: ["Figma", "UI/UX", "Design Systems"],
    href: null,
  },
  {
    title: "2D Adventure Game",
    description:
      "Java-based 2D game inspired by Animal Crossing with character movement, NPC interactions, and environment navigation.",
    tags: ["Java", "Game Dev", "2D Graphics"],
    href: null,
  },
];

const competitions = [
  "NASA Space Apps Challenge 2024",
  "ASEAN Green Entrepreneurship Hackathon 2025",
  "Philippine Startup Challenge 2025 — DICT",
  "Regional Hack4Gov 2025 — DICT Region X",
];

const certifications = [
  "DOST-SEI JLSS Scholar",
  "Cisco Networking Academy — CCNA 1-3",
  "Scholar's Leadership Camp Participant",
  "BukSU Computer Society Mentor — 2024",
  "BukSU Academic Mentoring Unit",
  "Consistent Recipient of Academic Honors",
];

function Tile({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-48px 0px -48px 0px", amount: 0.15 }}
      transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.8, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-2xl p-px h-full ${className}`}
    >
      {/* Outer border — faint normally, red glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-black/[0.08] group-hover:border-[#D71921]/30 transition-colors duration-300" />

      {/* Glassmorphism content layer */}
      <div className="relative h-full rounded-[15px] border border-black/[0.08] bg-white/70 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 group-hover:border-[#D71921]/20 group-hover:shadow-[0_8px_32px_rgba(215,25,33,0.07)] overflow-hidden">

        {/* Red spotlight trailing the cursor */}
        <div
          className="absolute inset-0 rounded-[15px] pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(240px circle at ${spot.x}% ${spot.y}%, rgba(215,25,33,0.07), transparent 65%)`,
          }}
        />

        {children}
      </div>
    </motion.div>
  );
}

// Small red monospace label used at the top of most tiles
function Label({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D71921] mb-4">
      {children}
    </p>
  );
}

// Small pill tag used for project tech labels
function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-wider uppercase bg-black/[0.04] text-black/40 px-2.5 py-1 rounded-full">
      {children}
    </span>
  );
}

// BentoGrid
// - Layouts all the content tiles in a responsive grid
// - Includes dot-grid background + hover-glow tiles + the special VertiGrow preview tile
export default function BentoGrid() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-6">
      {/* Dot grid behind glass tiles */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D71921] mb-10"
        >
          Overview
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {/* ── About ── */}
          <Tile className="md:col-span-2 lg:col-span-2" delay={0}>
            <Label>About</Label>
            <p className="text-lg md:text-xl leading-relaxed text-black/70 font-light">
             I do software development specializing in web applications as a full-stack developer. 
             I’m a DOST-SEI Scholar and a final-year IT student. I build 
             full-stack web apps, focusing on making sure everything runs efficiently. 
             I specialize using Laravel as my backend framework and various frontend frameworks and libraries.
            </p>
            <div className="mt-6">
              <a
                href="/personal/"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] uppercase text-[#D71921] hover:gap-2.5 transition-all duration-200"
                aria-label="Know more about me on personal page"
              >
                Know More About Me
                <span>→</span>
              </a>
            </div>
          </Tile>

          {/* ── Education ── */}
          <Tile delay={0.05}>
            <Label>Education</Label>
            <h3 className="text-lg font-semibold text-black">
              BS Information Technology
            </h3>
            <p className="text-black/50 text-sm mt-1">
              Bukidnon State University
            </p>
            <p className="text-black/35 text-sm mt-0.5">
              4th Year &middot; Aug 2022 – Present
            </p>
          </Tile>

          {/* ── Tech Stack ── */}
          <Tile delay={0.1}>
            <Label>Tech Stack</Label>
            <div className="space-y-5">
              {skillCategories.map((cat) => (
                <div key={cat.title}>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/25 mb-2.5">
                    {cat.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <motion.div
                        key={s.label}
                        whileHover={{ scale: 1.12, y: -2 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        title={s.label}
                        className="group/icon flex flex-col items-center gap-1 cursor-default"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#D71921]/[0.04] border border-[#D71921]/20 flex items-center justify-center transition-colors duration-200">
                          {s.icon ? (
                            <img
                              src={s.icon}
                              alt={s.label}
                              className="w-5 h-5 transition-all duration-300"
                              loading="lazy"
                            />
                          ) : (
                            <span className="font-mono text-[10px] font-bold text-black/40">
                              {s.label.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[9px] tracking-wide text-black/60 leading-none">
                          {s.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Tile>

          {/* ── All Projects (clickable summary cards) ── */}
          {/* Project 01 is featured (2-col span); rest are single tiles.
              Cards with an `href` navigate to a dedicated project page. */}
          {projects.map((project, i) => {
            const isFirst = i === 0;
            const inner = (
              <>
                {/* "Projects" label only on the first tile */}
                {isFirst && <Label>Projects</Label>}
                <span className="font-mono text-[10px] text-black/20">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Inline preview only for the two VertiGrow-family projects */}
                {project.previewKind === "vertigrow" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-3 mb-4"
                  >
                    <VertiGrowPreview
                      images={[
                        { src: vertiGrowImg.src, alt: "VertiGrow preview 1" },
                        { src: vertiGrowImg2.src, alt: "VertiGrow preview 2" },
                      ]}
                      caption="Vertical Farming Monitoring System"
                    />
                  </motion.div>
                )}

                {project.previewKind === "vertigrow-app" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-3 mb-4"
                  >
                    <VertiGrowPreview
                      images={[
                        { src: verticalAppImg.src, alt: "VertiGrow App preview 1" },
                        { src: verticalAppImg2.src, alt: "VertiGrow App preview 2" },
                      ]}
                      caption="Vertical Farming Monitoring App"
                      objectFit="contain"
                    />
                  </motion.div>
                )}

                {project.previewKind === "aaccup" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-3 mb-4"
                  >
                    <VertiGrowPreview
                      images={[
                        { src: aaccupImg.src, alt: "AACCUP preview 1" },
                        { src: aaccupImg2.src, alt: "AACCUP preview 2" },
                      ]}
                      caption="Multi-tenant Task Tracker"
                    />
                  </motion.div>
                )}

                <h3 className="text-base font-semibold mt-2 mb-2 text-black group-hover:text-[#D71921] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-black/55 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                {/* "View Details" link shown only if a project page exists */}
                {project.href && (
                  <div className="mt-5">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] uppercase text-[#D71921] group-hover:gap-2.5 transition-all duration-200">
                      View Details
                      <span>→</span>
                    </span>
                  </div>
                )}

                {/* GitHub link shown when no dedicated page but a repo exists */}
                {"github" in project && project.github && !project.href && (
                  <div className="mt-5">
                    <a
                      href={project.github as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] uppercase text-[#D71921] hover:gap-2.5 transition-all duration-200"
                    >
                      View on GitHub
                      <span>→</span>
                    </a>
                  </div>
                )}
              </>
            );

            // Wrap in an <a> if the project has a dedicated page, otherwise a plain Tile
            return project.href ? (
              <Tile
                key={project.title}
                delay={0.05 * i}
                className={isFirst ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <a
                  href={project.href}
                  className="flex flex-col h-full no-underline"
                  aria-label={`View ${project.title} details`}
                >
                  {inner}
                </a>
              </Tile>
            ) : (
              <Tile
                key={project.title}
                delay={0.05 * i}
                className={isFirst ? "md:col-span-2 lg:col-span-2" : ""}
              >
                {inner}
              </Tile>
            );
          })}

          {/* ── Competitions ── */}
          <Tile delay={0}>
            <Label>Competitions</Label>
            <ul className="space-y-3">
              {competitions.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] mt-1.5 shrink-0" />
                  <span className="text-sm text-black/65 leading-relaxed">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </Tile>

          {/* ── Certifications ── */}
          <Tile className="md:col-span-2 lg:col-span-2" delay={0.05}>
            <Label>Awards &amp; Certifications</Label>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {certifications.map((c) => (
                <div key={c} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] mt-1.5 shrink-0" />
                  <span className="text-sm text-black/65 leading-relaxed">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
