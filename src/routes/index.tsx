import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Galaxy from "../components/Galaxy";
import { Reveal, StaggerWords } from "../components/Reveal";
import { articles } from "../data/articles";
import { projects } from "../data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akshat Siddh — Software Developer & Writer" },
      { name: "description", content: " Software Developer building calm, considered software. Essays, case studies, and a small body of work." },
      { property: "og:title", content: "Akshat Siddh — Software Developer & Writer" },
      { property: "og:description", content: "Calm, considered software. Essays and a small body of work." },
    ],
  }),
  component: Home,
});

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] overflow-hidden grain vignette">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <Galaxy />
      </motion.div>
      {/* lighting overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,oklch(0.78_0.10_230/0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-background" />

      <div className="relative h-full container-edit flex flex-col justify-end pb-20 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="eyebrow"
        >
          2026 · Software Engineer
        </motion.p>
        <h1 className="mt-6 fluid-display font-display text-balance max-w-[18ch]">
  <StaggerWords text="Building modern software," />
  <br />
  <em className="text-accent not-italic">
    <StaggerWords text="with clarity and purpose." />
  </em>
</h1>
        <Reveal delay={0.7} className="mt-10 max-w-xl">
          <p className="text-ink-dim text-lg leading-relaxed">
            I'm a software developer focused on building clean, functional, and user-focused web applications. I enjoy creating scalable products with thoughtful design and solid engineering principles.
          </p>
        </Reveal>
        <Reveal delay={0.9} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-full bg-foreground text-background font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-accent transition-colors"
          >
            Projects            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            to="/contact"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim hover:text-ink link-underline"
          >
            Open To Work
          </Link>
        </Reveal>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-6 right-6 md:right-10 flex flex-col items-center gap-2 text-ink-faint"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase [writing-mode:vertical-rl]">Scroll</span>
          <span className="block w-px h-12 bg-gradient-to-b from-ink-faint to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}




function SelectedWork() {
  return (
    <section className="relative py-32 md:py-40 border-t border-hairline">
      <div className="container-edit">

        {/* Section Heading */}
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 mb-16">

            <div>
              <p className="eyebrow">
                Selected Projects
              </p>

              <h2 className="mt-4 fluid-h2 font-display text-balance max-w-[20ch]">
                Thoughtfully engineered projects with clean and modern interfaces.
              </h2>
            </div>

            <Link
              to="/projects"
              className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.18em] link-underline"
            >
              View All Projects →
            </Link>
          </div>
        </Reveal>

        {/* Project List */}
        <ul className="divide-y divide-hairline border-y border-hairline">
          {projects.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={0.05 * i}
            >
              <li className="group">

                <Link
                  to={`/projects/${p.slug}`}
                  className="grid grid-cols-12 gap-4 py-8 md:py-10 items-baseline transition-all duration-300 hover:bg-surface/40 -mx-4 md:-mx-6 px-4 md:px-6 rounded-xl"
                >

                  {/* Index */}
                  <span className="col-span-1 font-mono text-[11px] text-ink-faint">
                    0{i + 1}
                  </span>

                  {/* Project Title */}
                  <span className="col-span-12 md:col-span-6 font-display text-2xl md:text-4xl text-balance group-hover:text-accent transition-colors">
                    {p.title}
                  </span>

                  {/* Tech / Category */}
                  <span className="col-span-6 md:col-span-3 text-ink-dim text-sm">
                    {p.client}
                  </span>

                  {/* Year */}
                  <span className="col-span-5 md:col-span-2 font-mono text-[11px] text-ink-faint text-right">
                    {p.year}
                  </span>

                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    "C",
    "C++",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "Python",
    "Git",
    "GitHub",
  ];

  return (
    <section className="relative py-32 md:py-48 border-t border-hairline">
      <div className="container-edit grid gap-12 md:grid-cols-12">

        {/* Left Label */}
        <div className="md:col-span-3">
          <p className="eyebrow">
            Technical Skills
          </p>
        </div>

        {/* Main Content */}
        <Reveal className="md:col-span-9">

          <p className="font-display text-3xl md:text-5xl leading-[1.15] text-balance">
            I work across frontend, backend, databases, and development
            tools to build responsive, scalable, and user-focused web
            applications.
            <em className="text-accent not-italic">
              {" "}Focused on clean architecture and modern development practices.
            </em>
          </p>

          {/* Skills Grid */}
          <div className="mt-16 flex flex-wrap gap-4">

            {skills.map((skill) => (
              <div
                key={skill}
                className="px-5 py-3 border border-hairline rounded-full bg-surface/40 backdrop-blur font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim hover:text-accent transition-colors"
              >
                {skill}
              </div>
            ))}

          </div>

        </Reveal>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative py-32 md:py-48 border-t border-hairline">
      <div className="container-edit grid gap-12 md:grid-cols-12">

        {/* Left Label */}
        <div className="md:col-span-3">
          <p className="eyebrow">
            Development Approach
          </p>
        </div>

        {/* Main Content */}
        <Reveal className="md:col-span-9">

          <p className="font-display text-3xl md:text-5xl leading-[1.15] text-balance">
            I focus on building modern software solutions that combine
            clean user interfaces, scalable architecture, and practical
            functionality. My work is centered around creating web
            applications that feel intuitive, efficient, and thoughtfully
            engineered.
            <em className="text-accent not-italic">
              {" "}Clean design. Reliable systems. Meaningful experiences.
            </em>
          </p>

          {/* CTA */}
          <Link
            to="/about"
            className="mt-12 inline-block font-mono text-[11px] uppercase tracking-[0.18em] link-underline"
          >
            Learn More About Me →
          </Link>

        </Reveal>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Skills />
      <Manifesto />
    </>
  );
}
