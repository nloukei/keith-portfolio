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
    rotate: -1.1,
  },
  {
    period: "2026",
    title: "Full-Stack Developer Intern",
    subtitle: "Internship",
    description:
      "Working as a full-stack intern on a production-level web application. Handling both frontend and backend responsibilities — building UI components, writing API logic, and working with a relational database.",
    tags: ["Laravel", "React", "Tailwind CSS", "MUI", "MySQL"],
    kind: "internship",
    rotate: 0.8,
  },
];

// Hand-drawn sketchy border style for paper cards
const sketchyCard: React.CSSProperties = {
  background: "#ffffff",
  border: "2px solid #2c2b27",
  borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
  boxShadow: "4px 5px 0 rgba(44,43,39,0.10), -1px -1px 0 rgba(44,43,39,0.04)",
};

export default function WorkHistory() {
  return (
    <section id="work" className="relative py-16 md:py-32 px-4 md:px-6">
      <div className="relative max-w-5xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p
            style={{ fontFamily: "Caveat, cursive", fontWeight: 600 }}
            className="text-2xl text-[#D71921]"
          >
            — Work History
          </p>
          {/* Hand-drawn underline */}
          <svg viewBox="0 0 180 10" className="h-2 mt-0.5" style={{ width: "180px" }} fill="none" aria-hidden>
            <path d="M3 5 C 20 1, 40 9, 65 5 S 110 1, 135 5 S 165 9, 177 5"
              stroke="#D71921" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          </svg>
        </motion.div>

        {/* Timeline */}
        <div className="relative md:pl-28 space-y-10">
          {/* Vertical ruled line */}
          <div
            className="hidden md:block absolute left-10 top-0 bottom-0"
            style={{ width: "1.5px", background: "rgba(100,155,215,0.35)" }}
          />

          {roles.map((role, i) => (
            <motion.div
              key={role.period}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="relative"
              style={{ transform: `rotate(${role.rotate}deg)` }}
            >
              {/* Circled date — sits on the ruled line */}
              <div
                className="hidden md:flex absolute items-center justify-center"
                style={{
                  left: "-68px",
                  top: "16px",
                  width: "52px",
                  height: "32px",
                  fontFamily: "Caveat, cursive",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#D71921",
                  border: "1.8px solid #D71921",
                  borderRadius: "50% 45% 55% 50% / 50% 55% 45% 50%",
                  background: "#F7F3EA",
                  textAlign: "center",
                  lineHeight: 1.1,
                }}
              >
                {role.period}
              </div>

              {/* Card */}
              <div className="p-5 md:p-7 group hover:shadow-[6px_8px_0_rgba(215,25,33,0.12)] transition-shadow duration-300" style={sketchyCard}>

                {/* Mobile period */}
                <p
                  style={{ fontFamily: "Caveat, cursive" }}
                  className="md:hidden text-lg text-[#D71921] mb-2"
                >
                  {role.period}
                </p>

                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <h3
                      style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
                      className="text-2xl md:text-3xl text-[#2c2b27] group-hover:text-[#D71921] transition-colors duration-300"
                    >
                      {role.title}
                    </h3>
                    <p style={{ fontFamily: "Caveat, cursive" }} className="text-lg text-[#2c2b27]/50 mt-0.5">
                      {role.subtitle}
                    </p>
                  </div>

                  {/* Kind badge — marker highlight */}
                  <span
                    style={{
                      fontFamily: "Caveat, cursive",
                      fontSize: "16px",
                      background: role.kind === "internship" ? "rgba(215,25,33,0.14)" : "rgba(44,43,39,0.06)",
                      border: role.kind === "internship" ? "1.5px solid rgba(215,25,33,0.35)" : "1.5px solid rgba(44,43,39,0.18)",
                      borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                      color: role.kind === "internship" ? "#D71921" : "#2c2b27",
                      padding: "4px 16px",
                    }}
                    className="shrink-0"
                  >
                    {role.kind}
                  </span>
                </div>

                <p style={{ fontFamily: "Caveat, cursive" }} className="text-xl text-[#2c2b27]/65 mb-4 leading-snug">
                  {role.description}
                </p>

                {/* Tags — marker chips */}
                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "Caveat, cursive",
                        fontSize: "16px",
                        background: "rgba(215,25,33,0.08)",
                        border: "1.5px solid rgba(215,25,33,0.22)",
                        borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                        color: "#2c2b27",
                        padding: "2px 14px",
                      }}
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
