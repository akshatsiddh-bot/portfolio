import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Akshat Siddh" },
      { name: "description", content: "Get in touch about a project, an essay, or a quiet collaboration." },
      { property: "og:title", content: "Contact — Akshat Siddh" },
      { property: "og:description", content: "Get in touch about a project, an essay, or a quiet collaboration." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container-edit pt-24 md:pt-32 pb-40">
      <div className="grid gap-16 md:grid-cols-12">

        {/* Left Section */}
        <Reveal className="md:col-span-7">
          <p className="eyebrow">Available for Opportunities</p>

          <h1 className="mt-6 fluid-display font-display text-balance max-w-[14ch]">
            Let&apos;s build something{" "}
            <em className="text-accent not-italic">
              meaningful.
            </em>
          </h1>

          <p className="mt-8 text-ink-dim text-lg max-w-xl leading-relaxed">
            Open to internships, freelance projects, collaborations,
            and software development opportunities. If you have a
            project idea, business requirement, or technical challenge,
            feel free to reach out.
          </p>

          <div className="mt-16 space-y-8">

            {/* Email */}
            <div>
              <p className="eyebrow">Email</p>

              <a
                href="mailto:akshatsiddh@gmail.com"
                className="mt-3 block font-display text-3xl md:text-4xl link-underline"
              >
                akshatsiddh@gmail.com
              </a>
            </div>

            {/* Social Links */}
            <div>
              <p className="eyebrow">Connect</p>

              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">

                <li>
                  <a
                    className="text-ink-dim hover:text-ink transition link-underline"
                    href="https://github.com/akshatsiddh-bot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>

                <li>
                  <a
                    className="text-ink-dim hover:text-ink transition link-underline"
                    href="https://linkedin.com/in/akshat-siddh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </Reveal>

        {/* Right Section / Form */}
        <Reveal delay={0.15} className="md:col-span-5">

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="border border-hairline rounded-lg p-8 bg-surface/40 backdrop-blur"
          >
            <p className="eyebrow">Get In Touch</p>

            <div className="mt-8 space-y-7">

              <Field
                label="Name"
                id="name"
              />

              <Field
                label="Email"
                id="email"
                type="email"
              />

              <Field
                label="Subject"
                id="subject"
              />

              {/* Message */}
              <div>
                <label
                  htmlFor="msg"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint"
                >
                  Message
                </label>

                <textarea
                  id="msg"
                  required
                  rows={5}
                  placeholder="Write your message..."
                  className="mt-2 w-full bg-transparent border-b border-hairline focus:border-accent outline-none py-2 text-ink resize-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-10 w-full inline-flex items-center justify-center gap-3 rounded-full bg-foreground text-background py-3 font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-accent transition-colors"
            >
              {sent ? "Message Sent ✓" : "Send Message"}

              {!sent && (
                <span aria-hidden>
                  →
                </span>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}

function Field({ label, id, type = "text" }: { label: string; id: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
        {label}
      </label>
      <input
        id={id} type={type} required
        className="mt-2 w-full bg-transparent border-b border-hairline focus:border-accent outline-none py-2 text-ink transition-colors"
      />
    </div>
  );
}
