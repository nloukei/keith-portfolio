import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import booksEif from "../assets/books/books-eif.png";
import booksSubtleArt from "../assets/books/books-subtle-art.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
  hidden: {},
};

const chips = ["Coffee", "Long walks", "Indie games","Competetive FPS games"];

const laptopSpecs = [
  { label: "Processor", value: "Intel Core i5-14500HX" },
  { label: "Memory", value: "24 GB DDR5 · 5600 MHz" },
  { label: "Graphics", value: "NVIDIA GeForce RTX 4050" },
] as const;

interface PersonalHomeProps {
  imageSrc: string;
  videoSrc?: string;
  valorantVideoSrc?: string;
}

/** Casual “personal” landing — Nothing-style: mono labels, red dot, glass panels. */
export default function PersonalHome({ imageSrc, videoSrc, valorantVideoSrc }: PersonalHomeProps) {
  const [activeGame, setActiveGame] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [slideOffset, setSlideOffset] = useState(0);

  const games = [
    videoSrc && {
      key: "marvel",
      title: "Marvel Rivals",
      tag: "Hero Shooter",
      description:
        "The chaos and confusion mid-fight is exactly what I find joy in. It makes me laugh, clears my head, and gives me a reason to run it back with friends. One of those games where you forget everything else.",
      src: videoSrc,
    },
    valorantVideoSrc && {
      key: "valorant",
      title: "Valorant",
      tag: "Tactical FPS",
      description:
        "This is also one of my main competitive games. This game is also chaotic while also need to think strategically to the decisions I make. It also taught me how to stay calm under pressure and perform when it matters.",
      src: valorantVideoSrc,
    },
  ].filter(Boolean) as { key: string; title: string; tag: string; description: string; src: string }[];

  useEffect(() => {
    const update = () => {
      if (!carouselRef.current) return;
      setSlideOffset(carouselRef.current.offsetWidth * 0.88 + 12);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-7rem)] px-4 pb-16 md:px-8">
      <motion.section
        id="home"
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex max-w-3xl flex-col gap-10 pt-16 md:pt-24"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#D71921]" />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/45">
            Personal · Off the clock
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
          <div className="mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-full border border-black/[0.1] md:mx-0 md:h-40 md:w-40">
            <img
              src={imageSrc}
              alt=""
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
              Hey again, I&apos;m Keith
            </h1>
            <p className="text-base leading-relaxed text-black/60 md:text-lg">
              This side of the site is lighter on resume bullets and heavier on the human stuff: what I
              enjoy, what I do, and the little things that keep me curious. The professional mode
              is still one tap away.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-black/[0.08] bg-white/70 p-6 backdrop-blur-xl md:p-8"
        >
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#D71921]">
            Currently into
          </p>
          <ul className="space-y-3 text-black/65">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D71921]" />
              Reading books.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D71921]" />
              Watching YouTube tech reviews on the latest phones, laptops, gaming PCs, PC builds, and peripherals.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D71921]" />
              Playing competitive FPS games.
            </li>
          </ul>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-black/[0.08] bg-white/70 p-6 backdrop-blur-xl md:p-8"
        >
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#D71921]">
            Daily driver
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-black">
            Predator Helios Neo 16 <span className="text-black/45 font-normal">· 2024</span>
          </h3>
          
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {laptopSpecs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl border border-black/[0.08] bg-black/[0.02] px-4 py-3.5 transition-colors duration-200 hover:border-[#D71921]/25"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/35">
                  {spec.label}
                </p>
                <p className="mt-1.5 text-sm font-medium leading-snug text-black/85">{spec.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {games.length > 0 && (
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-black/[0.08] bg-white/70 backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 md:p-8 pb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D71921]">
                  Favorite Games
                </p>
                {/* Dot navigation */}
                <div className="flex items-center gap-2">
                  {games.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveGame(i)}
                      className={`rounded-full transition-all duration-200 ${
                        i === activeGame
                          ? "w-4 h-1.5 bg-[#D71921]"
                          : "w-1.5 h-1.5 bg-black/20 hover:bg-black/35"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Animated game info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGame}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-lg font-semibold tracking-tight text-black">
                      {games[activeGame].title}
                    </h3>
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-black/35 border border-black/[0.08] rounded-full px-2 py-0.5">
                      {games[activeGame].tag}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-black/55">
                    {games[activeGame].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Video slider */}
            <div ref={carouselRef} className="relative overflow-hidden">
              <motion.div
                className="flex gap-3"
                animate={{ x: -activeGame * slideOffset }}
                transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.85 }}
                style={{ willChange: "transform" }}
              >
                {games.map((game, i) => (
                  <div
                    key={game.key}
                    className="w-[88%] shrink-0 aspect-video cursor-pointer"
                    onClick={() => setActiveGame(i)}
                  >
                    <video
                      src={game.src}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Right peek fade — hints there's a next video */}
              {activeGame < games.length - 1 && (
                <div className="pointer-events-none absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-white/95 via-white/60 to-transparent" />
              )}
              {/* Left peek fade */}
              {activeGame > 0 && (
                <div className="pointer-events-none absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-white/95 via-white/60 to-transparent" />
              )}
            </div>

            {/* Bottom nav */}
            <div className="px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => setActiveGame((g) => Math.max(0, g - 1))}
                disabled={activeGame === 0}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 disabled:opacity-25 hover:text-[#D71921] transition-colors duration-200"
              >
                ← Prev
              </button>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-black/30">
                {activeGame + 1} / {games.length}
              </span>
              <button
                onClick={() => setActiveGame((g) => Math.min(games.length - 1, g + 1))}
                disabled={activeGame === games.length - 1}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 disabled:opacity-25 hover:text-[#D71921] transition-colors duration-200"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {/* Favorite Books */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-black/[0.08] bg-white/70 p-6 backdrop-blur-xl md:p-8"
        >
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#D71921]">
            Favorite Books
          </p>
          <p className="mb-5 text-sm leading-relaxed text-black/55">
          These books showed me that harsh truths are actually a good thing. 
          They gave me hope that I can still achieve my goals without the constant pressure to be perfect. 
          I’ve realized that being normal is okay, and I'm focusing on small, incremental changes every day.
          I stopped scrolling endlessly through social media because of the realization came from these books, and everyday I am trying to be better.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                src: booksSubtleArt.src,
                title: "The Subtle Art of Not Giving a F*ck",
                year: "Mark Manson",
              },
              {
                src: booksEif.src,
                title: "Everything Is F*cked",
                year: "Mark Manson",
              },
            ].map((book) => (
              <motion.div
                key={book.title}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col gap-3"
              >
                <div className="overflow-hidden rounded-xl border border-black/[0.07] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                  <img
                    src={book.src}
                    alt={book.title}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium leading-snug text-black/80">
                    {book.title}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] tracking-[0.15em] uppercase text-black/35">
                    {book.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Photography */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-black/[0.08] bg-white/70 p-6 backdrop-blur-xl md:p-8"
        >
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#D71921]">
            Photography
          </p>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-semibold tracking-tight text-black">
              Shot on Samsung Galaxy S24
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-black/55">
            I enjoy capturing everyday moments. Whether architecture, street scenes, nature, and anything with interesting light. 
            No fancy gear, just a phone and an eye for what looks good. Still learning composition, but I find it meditative.
          </p>

          {/* Placeholder grid */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl border border-dashed border-black/[0.10] bg-black/[0.02] flex flex-col items-center justify-center gap-1.5"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-5 h-5 text-black/20">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-black/30 text-center">
            Photos Coming Soon
          </p>
        </motion.div>

        <motion.div variants={fadeUp} id="interests" className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/35">
            Quick vibes
          </p>
          <div className="flex flex-wrap gap-2">
            {chips.map((label) => (
              <span
                key={label}
                className="rounded-full border border-black/[0.08] bg-black/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-black/55"
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
