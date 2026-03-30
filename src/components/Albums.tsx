import { motion } from "framer-motion";

import nasa1 from "../assets/nasaphoto1.jpg";
import nasa2 from "../assets/nasaphoto2.jpg";
import nasa3 from "../assets/nasaphoto3.jpg";
import nasa4 from "../assets/nasaphoto4.jpg";
import slc1 from "../assets/slc/SLC1.jpg";
import slc2 from "../assets/slc/SLC2.jpg";
import slc3 from "../assets/slc/SLC3.jpg";
import slc4 from "../assets/slc/SLC4.jpg";
import slc5 from "../assets/slc/SLC5.jpg";

const nasaImages = [nasa1, nasa2, nasa3, nasa4];

const slcImages = [slc1, slc2, slc3, slc4, slc5];

const otherAlbums = [
  {
    title: "ASEAN Green Entrepreneurship Hackathon",
    subtitle: "Regional Finalist · 2025",
    status: "Photos coming soon",
  },
  {
    title: "Philippine Startup Challenge",
    subtitle: "National Pitching · 2025",
    status: "Photos coming soon",
  },
  {
    title: "Hack4Gov",
    subtitle: "DICT Region X · 2025",
    status: "Photos coming soon",
  },
];

export default function Albums() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-16">
        <header>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D71921]">
            Albums
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-black">
            NASA Space Apps Challenge
          </h2>
          <p className="mt-2 text-sm text-black/60 max-w-xl">
            Moments from NASA International Space Apps Challenge in Valencia
            City – team photos, stage snapshots, and the community that shaped
            your hackathon journey.
          </p>

          <p className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-black/40">
            Credits: DevCon Bukidnon
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {nasaImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                translateY: -4,
                boxShadow: "0 24px 60px rgba(0,0,0,0.24)",
              }}
              className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 backdrop-blur-xl"
            >
              <img
                src={src.src}
                alt="NASA Space Apps moment"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Scholar's Leadership Camp ── */}
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D71921]">
                Album
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-black">
                Scholar&apos;s Leadership Camp
              </h2>
              <p className="mt-2 text-sm text-black/60 max-w-xl">
                Moments from leadership training, workshops, and the friendships that
                turned into long-lasting teams.
              </p>

              <p className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-black/40">
                Credits: Northern Mindanao Association of DOST-SEI Scholars (NMADS)
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2 rounded-full border border-black/10 bg-white/60 backdrop-blur px-4 py-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#D71921]" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/55">
                2025 · Photos Collection
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {slcImages.map((src, i) => {
              const spans = i === 0 ? "lg:col-span-2" : "";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.02,
                    translateY: -4,
                  }}
                  className={`relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 backdrop-blur-xl ${spans}`}
                >
                  <img
                    src={src.src}
                    alt={`Scholar's Leadership Camp photo ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Nothing-style corner accent */}
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute top-0 left-0 w-full h-full rounded-2xl border border-transparent border-t-[#D71921]/30 border-l-[#D71921]/30"
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute bottom-0 right-0 w-full h-full rounded-2xl border border-transparent border-b-[#D71921]/30 border-r-[#D71921]/30"
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  {/* Index label */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D71921]" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <section className="space-y-6">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-black/40">
            Other Competitions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherAlbums.map((album, i) => (
              <motion.div
                key={album.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D71921] mb-2">
                    Album
                  </p>
                  <h3 className="text-sm font-semibold text-black leading-snug">
                    {album.title}
                  </h3>
                  <p className="mt-1 text-xs text-black/55">{album.subtitle}</p>
                </div>
                <p className="mt-4 font-mono text-[10px] tracking-[0.18em] uppercase text-black/35">
                  {album.status}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

