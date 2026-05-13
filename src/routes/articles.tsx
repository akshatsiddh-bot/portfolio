import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "../components/Reveal";
import { articles } from "../data/articles";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Writing — Akshat Siddh" },
      { name: "description", content: "Essays on Software Developering, motion, infrastructure, and craft." },
      { property: "og:title", content: "Writing — Akshat Siddh" },
      { property: "og:description", content: "Essays on Software Developering, motion, infrastructure, and craft." },
    ],
  }),
  component: ArticlesIndex,
});

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

function ArticlesIndex() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((a) => a.category)))],
    [],
  );
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = articles.filter(
    (a) =>
      (active === "All" || a.category === active) &&
      (query === "" ||
        (a.title + a.dek + a.category).toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="container-edit pt-24 md:pt-32 pb-32">
      <Reveal>
        <p className="eyebrow">The notebook · {articles.length} essays</p>
        <h1 className="mt-6 fluid-display font-display text-balance max-w-[14ch]">Writing.</h1>
        <p className="mt-8 text-ink-dim text-lg max-w-2xl">
          Long-form notes on Software Developering, motion, infrastructure, and the practice of building considered software.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-y border-hairline py-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  active === c ? "text-ink" : "text-ink-faint hover:text-ink-dim"
                }`}
              >
                {c}
                {active === c && <span className="ml-2 inline-block size-1 rounded-full bg-accent align-middle" />}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search essays…"
              className="w-full bg-transparent border-b border-hairline focus:border-accent outline-none py-2 pl-6 text-sm placeholder:text-ink-faint transition-colors"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-ink-faint font-mono text-[11px]">⌕</span>
          </div>
        </div>
      </Reveal>

      <ul className="mt-4">
        {filtered.map((a, i) => (
          <Reveal key={a.slug} delay={0.04 * i}>
            <li className="border-b border-hairline">
              <Link
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="group grid grid-cols-12 gap-4 py-10 md:py-12 items-baseline -mx-4 md:-mx-6 px-4 md:px-6 rounded transition-colors hover:bg-surface/40"
              >
                <span className="col-span-12 md:col-span-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  {fmt(a.date)}
                </span>
                <div className="col-span-12 md:col-span-7">
                  <h2 className="font-display text-3xl md:text-4xl text-balance leading-[1.1] group-hover:text-accent transition-colors">
                    {a.title}
                  </h2>
                  <p className="mt-3 text-ink-dim text-pretty max-w-prose">{a.dek}</p>
                </div>
                <div className="col-span-12 md:col-span-3 md:text-right font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  <span>{a.category}</span>
                  <span className="mx-2">·</span>
                  <span>{a.readingTime} min</span>
                </div>
              </Link>
            </li>
          </Reveal>
        ))}
        {filtered.length === 0 && (
          <li className="py-16 text-center text-ink-faint font-mono text-sm">No essays match.</li>
        )}
      </ul>
    </div>
  );
}
