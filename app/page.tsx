import { tools, siteConfig } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="glass mb-8 p-[clamp(24px,4vw,36px)]" aria-label="hero">
        <h1 className="mb-4 text-[clamp(32px,4.4vw,52px)] font-[650] leading-[1.08] tracking-[-0.035em] text-[var(--text)]">
          iid.sh
        </h1>
        <p className="mb-4 text-[clamp(17px,2vw,21px)] font-[450] leading-[1.35] tracking-[-0.01em] text-[color-mix(in_srgb,var(--text)_92%,transparent)]">
          {siteConfig.tagline}
        </p>
        <p id="about" className="m-0 text-[clamp(15px,1.7vw,17px)] leading-[1.6] text-[var(--text-secondary)]">
          In probability theory, <strong>i.i.d.</strong> (independent and
          identically distributed) describes random variables that are
          independent and share the same distribution. We borrow the acronym for
          this site: each tool stands on its own, but they share the same
          principles—minimal UI, fast workflows, and easy sharing.
        </p>
      </section>

      {/* Tools */}
      <section id="tools" className="mb-8" aria-label="tools">
        <h2 className="mb-4 text-[15px] font-semibold uppercase tracking-[0.04em] text-[var(--text-secondary)]">
          Tools
        </h2>
        <div className="grid gap-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="glass p-[clamp(20px,3vw,28px)]" aria-label="contact">
        <h2 className="mb-2 text-[15px] font-semibold uppercase tracking-[0.04em] text-[var(--text-secondary)]">
          Contact
        </h2>
        <p className="m-0 text-[clamp(15px,1.7vw,17px)] leading-[1.6] text-[var(--text-secondary)]">
          Email:{" "}
          <code className="font-[var(--font-mono)] text-[0.95em] text-[var(--text)]">
            hi@iid.sh
          </code>
        </p>
      </section>
    </>
  );
}
