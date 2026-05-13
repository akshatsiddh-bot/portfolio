import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Akshat Siddh" },
      { name: "description", content: "A Software Developer's practice, timeline, and stack." },
      { property: "og:title", content: "About — Akshat Siddh" },
      { property: "og:description", content: "A Software Developer's practice, timeline, and stack." },
    ],
  }),
  component: About,
});

const timeline = [
  {
    year: "2026",
    role: "Full-Stack Developer",
    note: "Building real-world web applications and contributing to software development projects.",
  },

  {
    year: "2025",
    role: "Frontend Developer",
    note: "Focused on React, responsive UI design, and modern frontend development practices.",
  },

  {
    year: "2025",
    role: "Smart India Hackathon Participant",
    note: "Worked on an Alumni Association Platform focused on networking, events, and career opportunities.",
  },

  {
    year: "2024",
    role: "Backend & Database Learning",
    note: "Explored Node.js, Express, MongoDB, and MySQL while building full-stack projects.",
  },

  {
    year: "2023",
    role: "Started Programming Journey",
    note: "Began learning programming fundamentals, web development, and problem solving.",
  },
];

const stack = {
  Languages: [
    "C",
    "C++",
    "JavaScript",
    "Python",
    "HTML",
    "CSS",
    "SQL",
  ],

  Frontend: [
    "React",
    "Tailwind CSS",
    "Framer Motion",
    "Vite",
  ],

  Backend: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
  ],

  Tools: [
    "Git",
    "GitHub",
    "VS Code",
    "Postman",
  ],
};

function About() {
  return (
  <div className="container-edit pt-24 md:pt-32 pb-32">

    {/* Hero Section */}
    <Reveal>
      <p className="eyebrow">
        Software Development · Since 2025
      </p>

      <h1 className="mt-6 fluid-display font-display text-balance max-w-[16ch]">
        Building modern digital experiences with{" "}
        <em className="text-accent not-italic">
          clean and scalable solutions.
        </em>
      </h1>
    </Reveal>

    {/* About */}
    <div className="mt-20 grid gap-16 md:grid-cols-12">

      <Reveal className="md:col-span-7 md:col-start-2">

        <div className="prose-edit">

          <p>
            I'm a Software Developer focused on creating responsive,
            user-friendly, and performance-driven web applications.
            I enjoy building interfaces that combine clean design,
            smooth interaction, and practical functionality.
          </p>

          <p>
            My work primarily revolves around full-stack development,
            modern frontend technologies, backend systems, and scalable
            application architecture. I value simplicity, consistency,
            and maintainable code.
          </p>

          <h2>
            What I Focus On
          </h2>

          <p>
            Developing modern web applications, building intuitive user
            experiences, integrating backend services, and creating
            scalable solutions using contemporary development tools
            and frameworks.
          </p>

        </div>
      </Reveal>
    </div>

    {/* Timeline */}
<section className="mt-32 border-t border-hairline pt-16">

  <Reveal>
    <p className="eyebrow">
      Timeline
    </p>

    <h2 className="mt-4 fluid-h2 font-display text-balance max-w-[20ch]">
      Learning by building projects and writing code consistently.
    </h2>
  </Reveal>

  <ul className="mt-14 divide-y divide-hairline border-y border-hairline">

    {timeline.map((t, i) => (
      <Reveal
        key={t.year}
        delay={0.05 * i}
      >
        <li className="grid grid-cols-12 gap-4 py-7 items-baseline transition-colors hover:bg-surface/30 -mx-4 md:-mx-6 px-4 md:px-6 rounded-lg">

          {/* Year */}
          <span className="col-span-2 md:col-span-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            {t.year}
          </span>

          {/* Role */}
          <span className="col-span-10 md:col-span-5 font-display text-xl md:text-2xl text-balance">
            {t.role}
          </span>

          {/* Description */}
          <span className="col-span-12 md:col-span-6 text-ink-dim text-pretty leading-relaxed">
            {t.note}
          </span>

        </li>
      </Reveal>
    ))}
  </ul>
</section>

    {/* Stack */}
    <section className="mt-32 border-t border-hairline pt-16">

  {/* Section Heading */}
  <Reveal>
    <p className="eyebrow">
      Skills & Technologies
    </p>

    <h2 className="mt-4 fluid-h2 font-display text-balance max-w-[20ch]">
      Tools and technologies I use to build modern web applications.
    </h2>
  </Reveal>

  {/* Stack Grid */}
  <div className="mt-14 grid gap-12 md:grid-cols-4">

    {Object.entries(stack).map(([k, v], i) => (
      <Reveal
        key={k}
        delay={0.06 * i}
      >

        {/* Category */}
        <p className="eyebrow mb-5">
          {k}
        </p>

        {/* Skills */}
        <ul className="space-y-3">

          {v.map((s) => (
            <li
              key={s}
              className="text-ink-dim transition-colors hover:text-accent"
            >
              {s}
            </li>
          ))}

        </ul>

      </Reveal>
    ))}

  </div>
</section>

  </div>
);
}
