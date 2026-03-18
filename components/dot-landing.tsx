import { dotConfig, features } from "@/lib/dotfiles";
import { CopyButton } from "@/components/copy-button";

export function DotLanding() {
  return (
    <>
      <section className="mt-6 mb-16" aria-label="hero">
        <h1 className="mb-4 text-[clamp(44px,7vw,80px)] font-[700] leading-[1.04] tracking-[-0.04em] text-[var(--text)]">
          {dotConfig.tagline}
        </h1>
        <p className="max-w-[600px] text-[clamp(15px,1.8vw,17px)] leading-[1.6] text-[var(--text-secondary)]">
          {dotConfig.description}
        </p>
      </section>

      <section className="mb-16" aria-label="install">
        <h2 className="mb-6 text-[clamp(28px,4vw,40px)] font-[700] leading-[1.1] tracking-[-0.03em] text-[var(--text)]">
          Install.
        </h2>
        <div className="flex items-center gap-4 rounded-xl border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--surface)_60%,transparent)] p-5">
          <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-[var(--font-mono)] text-[clamp(14px,1.5vw,16px)] leading-relaxed text-[var(--text)]">
            {dotConfig.installCommand}
          </code>
          <CopyButton text={dotConfig.installCommand} />
        </div>
      </section>

      <section className="mb-16" aria-label="features">
        <h2 className="mb-6 text-[clamp(28px,4vw,40px)] font-[700] leading-[1.1] tracking-[-0.03em] text-[var(--text)]">
          What you get.
        </h2>
        <div className="divide-y divide-[var(--hairline)]">
          {features.map((feature) => (
            <div key={feature.title} className="py-5">
              <h3 className="mb-1 text-[17px] font-semibold leading-snug text-[var(--text)]">
                {feature.title}
              </h3>
              <p className="m-0 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4" aria-label="links">
        <h2 className="mb-4 text-[clamp(28px,4vw,40px)] font-[700] leading-[1.1] tracking-[-0.03em] text-[var(--text)]">
          Links.
        </h2>
        <div className="flex gap-6 text-[15px]">
          <a
            href={dotConfig.repoUrl}
            className="text-[var(--accent)] no-underline transition-opacity hover:opacity-70"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub →
          </a>
          <a
            href={dotConfig.installUrl}
            className="text-[var(--accent)] no-underline transition-opacity hover:opacity-70"
          >
            Raw install script →
          </a>
        </div>
      </section>
    </>
  );
}
