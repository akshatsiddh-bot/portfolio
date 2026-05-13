import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/60 border-b border-hairline" : ""
      }`}
    >
      <div className="container-edit flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-xl tracking-tight">Akshat Siddh</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-dim hover:text-ink transition-colors"
              activeProps={{ className: "text-ink" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
  href="/contact"
  className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-ink hover:text-accent transition-colors"
>
  <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
  Open To Work
</a>
      </div>
    </header>
   
  );
}

function Footer() {
  return (
    <footer className="relative mt-32 border-t border-hairline">
      <div className="container-edit py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <h3 className="font-display text-3xl md:text-4xl text-balance">
            Let's build something <em className="text-accent not-italic">considered.</em>
          </h3>
          <a
            href="mailto:akshatsiddh@gmail.com"
            className="mt-6 inline-block font-display text-2xl link-underline"
          >
            akshatsiddh@gmail.com
          </a>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="space-y-2 text-ink-dim">
            <li><a className="hover:text-ink transition" href="https://github.com/akshatsiddh-bot">GitHub</a></li>
            <li><a className="hover:text-ink transition" href="#">Read.cv</a></li>
            <li><a className="hover:text-ink transition" href="https://linkedin.com/in/akshat-siddh">LinkedIn</a></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">Index</p>
          <ul className="space-y-2 text-ink-dim">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-ink transition">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-edit pb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-ink-faint font-mono text-[11px] tracking-widest">
        <span>© {new Date().getFullYear()} AKSHAT SIDDH · ALL SYSTEMS NOMINAL</span>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { location } = useRouterState();
  return (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 pt-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </main>
    <Footer />
  </div>
);
}
