import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export function StaggerWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span variants={stagger} initial="hidden" animate="show" className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span variants={item} className="inline-block">{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}
