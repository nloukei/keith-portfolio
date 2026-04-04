import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
  hidden: {},
};

const chips = ["Coffee", "Long walks", "Indie games","Competetive FPS games", "Hackathons"];

interface PersonalHomeProps {
  imageSrc: string;
  videoSrc?: string;
}

/** Casual “personal” landing — Nothing-style: mono labels, red dot, glass panels. */
export default function PersonalHome({ imageSrc, videoSrc }: PersonalHomeProps) {
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
              enjoy, how I recharge, and the little things that keep me curious. The professional mode
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
              Building small tools that make day-to-day work feel less chaotic.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D71921]" />
              Learning how to ship faster without shipping sloppily.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D71921]" />
              Anything that mixes hardware curiosity with a clean UI.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D71921]" />
              Watching YouTube tech reviews on the latest phones, laptops, gaming PCs, PC builds, and peripherals - I find it fascinating.
            </li>
          </ul>
        </motion.div>

        {videoSrc && (
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-black/[0.08] bg-white/70 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-6 md:p-8 pb-0 md:pb-0">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#D71921]">
                Favorite Game
              </p>
              <h3 className="text-lg font-semibold tracking-tight text-black">
                Marvel Rivals
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/55">
                  What I'm playing right now to clear my head. A bit of gaming helps with the stress and keeps my mood balanced between problems.
              </p>
            </div>
            <div className="mt-4">
              <video
                src={videoSrc}
                className="w-full aspect-video object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </motion.div>
        )}

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
