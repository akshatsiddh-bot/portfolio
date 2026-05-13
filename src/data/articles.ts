export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  readingTime: number;
  featured?: boolean;
  body: string;
};

export const articles: Article[] = [
  {
    slug: "the-quiet-grammar-of-interfaces",
    title: "The Quiet Grammar of Interfaces",
    dek: "On restraint, rhythm, and the sentences a product whispers between its features.",
    category: "Software Developering",
    date: "2026-04-12",
    readingTime: 9,
    featured: true,
    body: `## A pause is a sentence

Every interface is read before it is used. The negative space, the cadence of components, the silence between sections — these form a grammar. When we ignore it, the product becomes a list. When we honor it, it becomes prose.

> The best products feel like they were written, not assembled.

## Rhythm over density

We tend to mistake density for value. But a slower interface — one with measured intervals — is read more carefully. People remember it.

\`\`\`tsx
// Spacing as composition, not decoration
<section className="py-32 md:py-40">
  <h2 className="fluid-h2">Considered work</h2>
  <p className="mt-8 text-ink-dim max-w-prose">…</p>
</section>
\`\`\`

## The editorial mindset

Borrow from print. The hierarchy of a great magazine spread translates surprisingly well to product surfaces, once you stop reaching for cards.`,
  },
  {
    slug: "shipping-motion-that-disappears",
    title: "Shipping Motion That Disappears",
    dek: "How to use Framer Motion so users feel the timing — never see the animation.",
    category: "Motion",
    date: "2026-03-03",
    readingTime: 7,
    body: `## Invisible sophistication

Motion should clarify causality. If a user notices the animation itself, the animation has failed.

## Easing is opinion

Linear is a void. Use \`cubic-bezier(0.2, 0.8, 0.2, 1)\` as a default and earn every deviation.

\`\`\`ts
const ease = [0.2, 0.8, 0.2, 1] as const;
\`\`\`

## Performance is craft

If a transition stutters on a mid-tier laptop, it doesn't exist. Profile, then refine.`,
  },
  {
    slug: "type-systems-as-conversation",
    title: "Type Systems as Conversation",
    dek: "Why TypeScript's most powerful feature is the dialogue it forces between you and your future self.",
    category: "Engineering",
    date: "2026-02-18",
    readingTime: 11,
    body: `## Types document intent

A well-typed API is a letter to the next engineer. Including yourself, in three months, at 11pm.

## Narrowing is a design tool

Discriminated unions encode the states a feature is allowed to be in. They make impossible states unrepresentable.

\`\`\`ts
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "ready"; data: T };
\`\`\``,
  },
  {
    slug: "against-glassmorphism",
    title: "Against Glassmorphism",
    dek: "A small polemic on the aesthetic of frosted everything, and what to use instead.",
    category: "Opinion",
    date: "2026-01-22",
    readingTime: 5,
    body: `## A material in search of meaning

Frosted glass borrowed authority from Apple's hardware. Detached from that context, it became decoration. Decoration ages quickly.

## Use surfaces, not effects

Solid graphite. Hairline borders. Considered shadow. The result is calmer, faster, and ages better.`,
  },
  {
    slug: "edge-rendering-isnt-a-feature",
    title: "Edge Rendering Isn't a Feature",
    dek: "It's a constraint. Here's how to design for it without pretending it's free.",
    category: "Infrastructure",
    date: "2025-12-09",
    readingTime: 12,
    body: `## The latency budget is real

Edge buys you geography but rents you constraints. Native modules disappear, filesystems become virtual, and cold starts become a design problem.

## Design the contract first

Decide what runs where before writing the function. Pure transforms at the edge, stateful work in a region, expensive jobs offline.`,
  },
  {
    slug: "the-craftsman-and-the-checklist",
    title: "The Craftsman and the Checklist",
    dek: "Process is what you fall back on. Craft is what you reach for.",
    category: "Career",
    date: "2025-11-04",
    readingTime: 6,
    body: `## Two modes

Process catches your floor. Craft raises your ceiling. A senior engineer is fluent in both and knows when to switch.

## Notice the seams

The work that endures pays attention to the joints — error states, empty states, the moment between intent and result.`,
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
