import { motion } from "framer-motion";

const roles = [
  {
    period: "2024 – 2025",
    title: "Freelance Frontend Developer",
    subtitle: "Student Project Collaborator",
    description:
      "Built websites for non-IT students who needed a frontend developer for their school projects — tourism sites, personal portfolios, and similar work. Focused on clean layouts and fast delivery.",
    tags: ["HTML", "CSS", "React"],
    kind: "freelance",
  },
  {
    period: "2026",
    title: "Full-Stack Developer Intern",
    subtitle: "Internship",
    description:
      "Working as a full-stack intern on a production-level web application. Handling both frontend and backend responsibilities — building UI components, writing API logic, and working with a relational database.",
    tags: ["Laravel", "React", "Tailwind CSS", "MUI", "MySQL"],
    kind: "internship",
  },
];

export default function WorkHistory() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-6">
      {/* Dot grid */}
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
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D71921] mb-10"
        >
          Work History
        </motion.p>

        {/* Timeline */}
        <div className="relative md:pl-24 space-y-10">
          {/* Vertical rail */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-black/10" />

          {roles.map((role, i) => (
            <motion.div
              key={role.period}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              className="relative"
            >
              {/* Timeline date + centered dot (same pattern as Albums) */}
              <span className="hidden md:block absolute left-[-6rem] top-[0.45rem] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#D71921] shadow-[0_0_0_4px_rgba(215,25,33,0.12)]" />
              <div className="hidden md:block absolute -left-[18rem] top-[6px] w-[11rem]">
                <span className="block w-full text-right font-mono text-[10px] tracking-[0.2em] uppercase text-black/50 whitespace-nowrap">
                  {role.period}
                </span>
              </div>

              {/* Card */}
              <div className="rounded-2xl border border-black/[0.10] bg-white/70 backdrop-blur-xl p-5 md:p-6 group hover:border-[#D71921]/20 hover:shadow-[0_8px_32px_rgba(215,25,33,0.07)] transition-all duration-300">
                {/* Mobile period label */}
                <p className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 mb-2">
                  {role.period}
                </p>

                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-black group-hover:text-[#D71921] transition-colors duration-300">
                      {role.title}
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 mt-0.5">
                      {role.subtitle}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.15em] uppercase ${
                      role.kind === "internship"
                        ? "bg-[#D71921]/[0.07] text-[#D71921] border border-[#D71921]/20"
                        : "bg-black/[0.04] text-black/45 border border-black/[0.08]"
                    }`}
                  >
                    {role.kind}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-black/60 mb-4">
                  {role.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wider uppercase bg-black/[0.04] text-black/40 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
