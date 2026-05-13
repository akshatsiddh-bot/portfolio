import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      {
        title: "Projects — Akshat Siddh",
      },
      {
        name: "description",
        content:
          "A collection of web development projects focused on modern UI, full-stack applications, and practical software solutions.",
      },
      {
        property: "og:title",
        content: "Projects — Akshat Siddh",
      },
      {
        property: "og:description",
        content:
          "A collection of web development projects focused on modern UI, full-stack applications, and practical software solutions.",
      },
    ],
  }),

  component: Work,
});

function Work() {
  return (
    <div className="container-edit pt-24 md:pt-32 pb-32">

      {/* Hero Section */}
      <Reveal>

        <p className="eyebrow">
          Selected Projects · 2024 → 2026
        </p>

        <h1 className="mt-6 fluid-display font-display text-balance max-w-[16ch]">
          Projects and practical work.
        </h1>

        <p className="mt-8 text-ink-dim text-lg max-w-2xl">
          A collection of projects focused on frontend development,
          full-stack applications, responsive interfaces, and modern
          web technologies.
        </p>

      </Reveal>

      {/* Projects */}
      <div className="mt-24 space-y-32 md:space-y-44">

        {projects.map((p, i) => {
          const flip = i % 2 === 1;

          return (
            <Reveal key={p.slug}>

              <article
                className={`grid gap-10 md:grid-cols-12 md:gap-14 items-center ${
                  flip ? "md:[&>.media]:order-2" : ""
                }`}
              >

                {/* Visual Card */}
                <div className="media md:col-span-7 group relative">

                  <div className="aspect-[16/11] rounded-md overflow-hidden border border-hairline relative bg-surface">

                    {/* Background Gradient */}
                    <div
                      className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                      style={{
                        background:
                          "radial-gradient(ellipse at 30% 20%, oklch(0.78 0.10 230 / 0.28), transparent 55%), radial-gradient(ellipse at 80% 80%, oklch(0.20 0.014 260 / 1), oklch(0.13 0.012 260 / 1))",
                      }}
                    />

                    <div className="absolute inset-0 grain" />

                    {/* Title */}
                    <div className="absolute inset-0 flex items-end p-8">

                      <span className="font-display text-4xl md:text-5xl leading-[0.95] text-balance">
                        {p.title}
                      </span>

                    </div>

                    {/* Counter */}
                    <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                      0{i + 1} / {projects.length}
                    </div>

                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-5">

                  {/* Meta */}
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                    {p.client} · {p.year}
                  </p>

                  {/* Title */}
                  <h2 className="mt-4 font-display text-3xl md:text-4xl text-balance leading-tight">
                    {p.title}
                  </h2>

                  {/* Role */}
                  <p className="mt-2 text-ink-faint italic">
                    {p.role}
                  </p>

                  {/* Summary */}
                  <p className="mt-6 text-ink-dim text-pretty leading-relaxed">
                    {p.summary}
                  </p>

                  {/* Metrics */}
                  <ul className="mt-8 grid grid-cols-3 gap-4 border-t border-hairline pt-6">

                    {p.metrics.map((m) => (
                      <li key={m.label}>

                        <p className="font-display text-2xl md:text-3xl text-ink">
                          {m.value}
                        </p>

                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                          {m.label}
                        </p>

                      </li>
                    ))}

                  </ul>

                  {/* Stack */}
                  <div className="mt-8 flex flex-wrap gap-2">

                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border border-hairline text-ink-dim"
                      >
                        {s}
                      </span>
                    ))}

                  </div>
                </div>

              </article>
            </Reveal>
          );
        })}

      </div>
    </div>
  );
}