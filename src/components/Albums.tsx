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
import asean1 from "../assets/asean1.jpg";
import asean2 from "../assets/asean2.png";
import asean3 from "../assets/asean3.png";
import asean4 from "../assets/asean4.png";
import hack4gov1 from "../assets/hack4gov1.jpg";
import hack4gov2 from "../assets/hack4gov2.jpg";
import hack4gov3 from "../assets/hack4gov3.jpg";
import hack4gov4 from "../assets/hack4gov4.jpg";

const nasaImages = [nasa1, nasa2, nasa3, nasa4];

const slcImages = [slc1, slc2, slc3, slc4, slc5];

const aseanImages = [asean1, asean2, asean3, asean4];

const hack4govImages = [hack4gov1, hack4gov2, hack4gov3, hack4gov4];

const otherAlbums = [
  {
    title: "Philippine Startup Challenge",
    subtitle: "National Pitching · 2025",
    status: "Photos coming soon",
  },
];

export default function Albums() {
  return (
    <section className="relative py-16 md:py-32 px-4 md:px-6">

      <div className="relative max-w-6xl mx-auto space-y-16">
        {/* Section heading */}
        <div className="mb-4">
          <p style={{ fontFamily: "Caveat, cursive", fontWeight: 600 }} className="text-2xl text-[#D71921]">
            — Albums
          </p>
          <svg viewBox="0 0 140 10" className="h-2 mt-0.5" style={{ width: "140px" }} fill="none" aria-hidden>
            <path d="M3 5 C 15 1, 32 9, 52 5 S 88 1, 108 5 S 132 9, 137 5"
              stroke="#D71921" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          </svg>
        </div>

        <section id="albums" className="relative space-y-6 md:pl-24">
          <div className="hidden md:block absolute left-0 top-0 bottom-0" style={{ width: "1.5px", background: "rgba(100,155,215,0.35)" }} />
          <span className="hidden md:block absolute left-0 top-[0.45rem] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#D71921] shadow-[0_0_0_4px_rgba(215,25,33,0.12)]" />
          <div className="hidden md:block absolute -left-[7.5rem] top-[-2px]">
            <span className="text-lg text-[#2c2b27]/50 whitespace-nowrap" style={{ fontFamily: "Caveat, cursive" }}>
              October 2024
            </span>
          </div>

          {/* Mobile date pill */}
          <div className="flex md:hidden items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71921]" />
            <span className="text-lg text-[#2c2b27]/50" style={{ fontFamily: "Caveat, cursive" }}>October 2024</span>
          </div>

          <header>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D71921]">
            Albums
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl text-[#2c2b27]" style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}>
            NASA Space Apps Challenge
          </h2>
          <p className="mt-2 text-xl text-[#2c2b27]/60 max-w-xl" style={{ fontFamily: "Caveat, cursive" }}>
            Moments from NASA International Space Apps Challenge in Valencia
            City – team photos, stage snapshots, and the community that shaped
            your hackathon journey.
          </p>

          <p className="mt-2 text-lg text-[#2c2b27]/45" style={{ fontFamily: "Caveat, cursive" }}>
            Credits: DevCon Bukidnon
          </p>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-5 md:p-6" style={{ background: "#FFF9A0", border: "1.5px solid #e6d200", borderRadius: "4px 14px 14px 4px", boxShadow: "3px 4px 0 rgba(44,43,39,0.10)", transform: "rotate(-0.5deg)" }}
          >
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D71921] mb-3">
              What I Learned
            </p>
            <p className="text-xl leading-snug text-[#2c2b27]/65" style={{ fontFamily: "Caveat, cursive" }}>
              My first college hackathon. Learned to adapt and cooperate with a new
              team I did not know before. This experience was a big step in improving
              my communication and how I handle group projects. We only placed in the
              top 10, but the experience and the fun we had were worth more than the
              rank. It was a solid start to my journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {nasaImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false }}
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
                className="relative overflow-hidden" style={{ background: "#fff", border: "2px solid #2c2b27", padding: "8px 8px 48px 8px", boxShadow: "3px 5px 0 rgba(44,43,39,0.12), -1px -1px 0 rgba(44,43,39,0.05)" }}
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
        </section>

        {/* ── Scholar's Leadership Camp ── */}
        <section className="relative space-y-6 md:pl-24">
          <div className="hidden md:block absolute left-0 top-0 bottom-0" style={{ width: "1.5px", background: "rgba(100,155,215,0.35)" }} />
          <span className="hidden md:block absolute left-0 top-[0.45rem] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#D71921] shadow-[0_0_0_4px_rgba(215,25,33,0.12)]" />
          <div className="hidden md:block absolute -left-[7.5rem] top-[-2px]">
            <span className="text-lg text-[#2c2b27]/50 whitespace-nowrap" style={{ fontFamily: "Caveat, cursive" }}>
              November 2024
            </span>
          </div>

          {/* Mobile date pill */}
          <div className="flex md:hidden items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71921]" />
            <span className="text-lg text-[#2c2b27]/50" style={{ fontFamily: "Caveat, cursive" }}>November 2024</span>
          </div>

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D71921]">
                Album
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl text-[#2c2b27]" style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}>
                Scholar&apos;s Leadership Camp
              </h2>
              <p className="mt-2 text-xl text-[#2c2b27]/60 max-w-xl" style={{ fontFamily: "Caveat, cursive" }}>
                Moments from leadership training, workshops, and the friendships that
                turned into long-lasting teams.
              </p>

              <p className="mt-2 text-lg text-[#2c2b27]/45" style={{ fontFamily: "Caveat, cursive" }}>
                Credits: Northern Mindanao Association of DOST-SEI Scholars (NMADS)
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-5 md:p-6" style={{ background: "#FFF9A0", border: "1.5px solid #e6d200", borderRadius: "4px 14px 14px 4px", boxShadow: "3px 4px 0 rgba(44,43,39,0.10)", transform: "rotate(-0.5deg)" }}
          >
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D71921] mb-3">
              What I Learned
            </p>
            <p className="text-xl leading-snug text-[#2c2b27]/65" style={{ fontFamily: "Caveat, cursive" }}>
              Through the DOST-SEI Scholar's Leadership Camp, I discovered that leadership is not about
              individual perfection, but about the courage to step forward. I learned that an
              effective leader doesn&apos;t need to master every skill, but must excel in fostering
              open communication to ensure the team&apos;s synergy and well-being. This experience
              also taught me the value of professional transience, understanding that while team
              members may come and go, the bonds formed through shared challenges are what truly
              drive a project&apos;s success. We weren&apos;t defined by being &apos;the best,&apos; but by the
              memorable journey of friendship and collective effort that we shared.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
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
                  viewport={{ once: false }}
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

        {/* ── ASEAN Green Entrepreneurship Hackathon ── */}
        <section className="relative space-y-6 md:pl-24">
          <div className="hidden md:block absolute left-0 top-0 bottom-0" style={{ width: "1.5px", background: "rgba(100,155,215,0.35)" }} />
          <span className="hidden md:block absolute left-0 top-[0.45rem] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#D71921] shadow-[0_0_0_4px_rgba(215,25,33,0.12)]" />
          <div className="hidden md:block absolute -left-[7.5rem] top-[-2px]">
            <span className="text-lg text-[#2c2b27]/50 whitespace-nowrap" style={{ fontFamily: "Caveat, cursive" }}>
              July 2025
            </span>
          </div>

          {/* Mobile date pill */}
          <div className="flex md:hidden items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71921]" />
            <span className="text-lg text-[#2c2b27]/50" style={{ fontFamily: "Caveat, cursive" }}>July 2025</span>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D71921]">
              Album
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl text-[#2c2b27]" style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}>
              ASEAN Green Entrepreneurship Hackathon
            </h2>
            <p className="mt-2 text-xl text-[#2c2b27]/60 max-w-xl" style={{ fontFamily: "Caveat, cursive" }}>
              Regional Finalist representing BukSU Team 3. We pitched EcoQuest,
              a mobile app combining gamification, AR tree identification, and
              GPS-enabled recycling tracking to engage Filipino youth in
              environmental action.
            </p>
            <p className="mt-2 text-lg text-[#2c2b27]/45" style={{ fontFamily: "Caveat, cursive" }}>
              Passage to ASEAN (P2A) · BukSU Team 3
            </p>
          </div>

          {/* EcoQuest project card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-5 md:p-6" style={{ background: "#FFF9A0", border: "1.5px solid #e6d200", borderRadius: "4px 14px 14px 4px", boxShadow: "3px 4px 0 rgba(44,43,39,0.10)", transform: "rotate(-0.5deg)" }}
          >
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D71921] mb-3">
              The Project — EcoQuest
            </p>
            <p className="text-sm md:text-base leading-relaxed text-black/65 mb-4">
              EcoQuest is a mobile app that makes environmental action as fun as playing your
              favorite game. It integrates AR tree identification, eco mini-games, GPS-tracked
              recycling stations, and an EcoPoints reward system where points convert to
              real vouchers and brand rewards. Sustained by corporate CSR partnerships, a
              freemium model, and a recyclables marketplace.
            </p>
            
          </motion.div>

          {/* Photo grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {aseanImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" }}
                whileHover={{ scale: 1.02, translateY: -4, boxShadow: "0 24px 60px rgba(0,0,0,0.24)" }}
                className="relative overflow-hidden" style={{ background: "#fff", border: "2px solid #2c2b27", padding: "8px 8px 48px 8px", boxShadow: "3px 5px 0 rgba(44,43,39,0.12), -1px -1px 0 rgba(44,43,39,0.05)" }}
              >
                <img
                  src={src.src}
                  alt={`ASEAN Green Entrepreneurship Hackathon — EcoQuest ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D71921]" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Hack4Gov ── */}
        <section className="relative space-y-6 md:pl-24">
          <div className="hidden md:block absolute left-0 top-0 bottom-0" style={{ width: "1.5px", background: "rgba(100,155,215,0.35)" }} />
          <span className="hidden md:block absolute left-0 top-[0.45rem] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#D71921] shadow-[0_0_0_4px_rgba(215,25,33,0.12)]" />
          <div className="hidden md:block absolute -left-[7.5rem] top-[-2px]">
            <span className="text-lg text-[#2c2b27]/50 whitespace-nowrap" style={{ fontFamily: "Caveat, cursive" }}>
              November 2025
            </span>
          </div>

          {/* Mobile date pill */}
          <div className="flex md:hidden items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71921]" />
            <span className="text-lg text-[#2c2b27]/50" style={{ fontFamily: "Caveat, cursive" }}>November 2025</span>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D71921]">
              Album
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl text-[#2c2b27]" style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}>
              Regional Hack4Gov
            </h2>
            <p className="mt-2 text-xl text-[#2c2b27]/60 max-w-xl" style={{ fontFamily: "Caveat, cursive" }}>
            Joined the Hack4Gov hackathon in Region X. 
            We competed in a PicoCTF-style format, racing to earn the highest points by solving technical challenges. 
            It was a great way to test our skills while focusing on how tech can better serve the public.
            </p>
            <p className="mt-2 text-lg text-[#2c2b27]/45" style={{ fontFamily: "Caveat, cursive" }}>
              DICT Region X · 2025
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {hack4govImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" }}
                whileHover={{ scale: 1.02, translateY: -4, boxShadow: "0 24px 60px rgba(0,0,0,0.24)" }}
                className="relative overflow-hidden" style={{ background: "#fff", border: "2px solid #2c2b27", padding: "8px 8px 48px 8px", boxShadow: "3px 5px 0 rgba(44,43,39,0.12), -1px -1px 0 rgba(44,43,39,0.05)" }}
              >
                <img
                  src={src.src}
                  alt={`Hack4Gov Region X photo ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D71921]" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            ))}
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
                viewport={{ once: false }}
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

