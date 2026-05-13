import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { articles, getArticle } from "../data/articles";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    return {
      meta: a
        ? [
            { title: `${a.title} — Akshat Siddh` },
            { name: "description", content: a.dek },
            { property: "og:title", content: a.title },
            { property: "og:description", content: a.dek },
            { property: "og:type", content: "article" },
          ]
        : [{ title: "Essay — Akshat Siddh" }],
    };
  },
  errorComponent: ({ error, reset }) => (
    <div className="container-read py-32 text-center">
      <p className="eyebrow text-destructive">Failed to load</p>
      <h1 className="mt-4 fluid-h2">{error.message}</h1>
      <button onClick={reset} className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] link-underline">
        Try again
      </button>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-read py-32 text-center">
      <p className="eyebrow">Not found</p>
      <h1 className="mt-4 fluid-h2">This essay doesn't exist.</h1>
      <Link to="/articles" className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.18em] link-underline">
        Back to writing
      </Link>
    </div>
  ),
  component: ArticleView,
});

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

/** Tiny markdown-ish renderer (h2/h3/p/code/quote/lists). Hand-tuned for our content. */
function renderBody(body: string) {
  const blocks = body.split(/\n\n+/);
  const out: { type: string; content: string; lang?: string }[] = [];
  for (const b of blocks) {
    if (b.startsWith("```")) {
      const m = b.match(/^```(\w+)?\n([\s\S]*?)```$/);
      if (m) out.push({ type: "pre", content: m[2], lang: m[1] });
    } else if (b.startsWith("## ")) out.push({ type: "h2", content: b.slice(3) });
    else if (b.startsWith("### ")) out.push({ type: "h3", content: b.slice(4) });
    else if (b.startsWith("> ")) out.push({ type: "quote", content: b.slice(2) });
    else out.push({ type: "p", content: b });
  }
  return out;
}

function inlineCode(s: string) {
  const parts = s.split(/(`[^`]+`)/g);
  return parts.map((p, i) =>
    p.startsWith("`") && p.endsWith("`") ? <code key={i}>{p.slice(1, -1)}</code> : <span key={i}>{p}</span>,
  );
}

function ArticleView() {
  const { article } = Route.useLoaderData();
  const blocks = useMemo(() => renderBody(article.body), [article.body]);
  const headings = useMemo(
    () => blocks.filter((b) => b.type === "h2").map((b) => ({ id: slugify(b.content), text: b.content })),
    [blocks],
  );
  const [activeId, setActiveId] = useState<string>("");

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    document.querySelectorAll<HTMLElement>("article h2[id]").forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [article.slug]);

  const related = articles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 2);

  return (
    <div>
      {/* progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-16 left-0 right-0 h-px bg-accent origin-left z-40"
      />

      <header className="container-edit pt-24 md:pt-32 pb-12 border-b border-hairline">
        <Reveal>
          <Link to="/articles" className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint hover:text-ink link-underline">
            ← Writing
          </Link>
          <p className="eyebrow mt-10">{article.category} · {fmt(article.date)} · {article.readingTime} min read</p>
          <h1 className="mt-6 fluid-display font-display text-balance max-w-[20ch] leading-[0.98]">
            {article.title}
          </h1>
          <p className="mt-8 text-ink-dim text-xl max-w-2xl text-pretty">{article.dek}</p>
        </Reveal>
      </header>

      <div className="container-edit pt-16 pb-24 grid md:grid-cols-12 gap-12">
        {/* TOC */}
        <aside className="hidden md:block md:col-span-3">
          <div className="sticky top-28">
            <p className="eyebrow mb-5">Contents</p>
            <ul className="space-y-3">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className={`block text-sm leading-snug transition-colors ${
                      activeId === h.id ? "text-ink" : "text-ink-faint hover:text-ink-dim"
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-6 border-t border-hairline">
              <ShareUI title={article.title} />
            </div>
          </div>
        </aside>

        <article className="md:col-span-9 max-w-[68ch] prose-edit">
          {blocks.map((b, i) => {
            if (b.type === "h2") {
              const id = slugify(b.content);
              return <h2 key={i} id={id}>{b.content}</h2>;
            }
            if (b.type === "h3") return <h3 key={i}>{b.content}</h3>;
            if (b.type === "quote") return <blockquote key={i}>{inlineCode(b.content)}</blockquote>;
            if (b.type === "pre") return (
              <pre key={i}><code>{b.content}</code></pre>
            );
            return <p key={i}>{inlineCode(b.content)}</p>;
          })}

          <hr />
          <p className="text-ink-faint font-mono text-[11px] uppercase tracking-[0.18em] not-prose">
            Filed under {article.category} · {fmt(article.date)}
          </p>
        </article>
      </div>

      {related.length > 0 && (
        <section className="container-edit py-24 border-t border-hairline">
          <p className="eyebrow mb-10">Continue reading</p>
          <div className="grid gap-10 md:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/articles/$slug"
                params={{ slug: r.slug }}
                className="group block border-t border-hairline pt-6"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  {r.category} · {r.readingTime} min
                </p>
                <h3 className="mt-3 font-display text-2xl md:text-3xl text-balance group-hover:text-accent transition-colors">
                  {r.title}
                </h3>
                <p className="mt-2 text-ink-dim">{r.dek}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ShareUI({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (typeof window === "undefined") return;
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div>
      <p className="eyebrow mb-3">Share</p>
      <div className="flex flex-col gap-2">
        <button onClick={copy} className="text-left text-sm text-ink-dim hover:text-ink transition link-underline">
          {copied ? "Link copied ✓" : "Copy link"}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`}
          target="_blank" rel="noreferrer"
          className="text-sm text-ink-dim hover:text-ink transition link-underline"
        >
          Share on X
        </a>
      </div>
    </div>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
