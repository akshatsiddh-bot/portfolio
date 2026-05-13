import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";

import appCss from "../styles.css?url";
import Layout from "../components/Layout";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="eyebrow">404 · Off the map</p>
        <h1 className="mt-4 fluid-h2">This page is unwritten.</h1>
        <Link to="/" className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.18em] link-underline">
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="eyebrow text-destructive">Runtime · Interrupted</p>
        <h1 className="mt-4 fluid-h2">Something stalled.</h1>
        <p className="mt-4 text-ink-dim">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] link-underline"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Akshat Siddh — Software Developer & Writer" },
      { name: "description", content: "A handcrafted portfolio and editorial writing platform by a senior Software Developer." },
      { name: "theme-color", content: "#13151a" },
      { property: "og:title", content: "Akshat Siddh — Software Developer & Writer" },
      { property: "og:description", content: "A handcrafted portfolio and editorial writing platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <Layout />
    </QueryClientProvider>
  );
}
