import { siteConfig } from "@/lib/tools";

export function PortalHome() {
  return (
    <>
      <section className="mt-6 mb-16" aria-label="hero">
        <h1 className="mb-4 text-[clamp(44px,7vw,80px)] font-[700] leading-[1.04] tracking-[-0.04em] text-[var(--text)]">
          iid.sh
        </h1>
        <p className="max-w-[600px] text-[clamp(17px,2.2vw,21px)] font-[400] leading-[1.4] tracking-[-0.01em] text-[var(--text-secondary)]">
          {siteConfig.tagline}
        </p>
      </section>

      <section className="mb-16" aria-label="sites">
        <h2 className="mb-6 text-[clamp(28px,4vw,40px)] font-[700] leading-[1.1] tracking-[-0.03em] text-[var(--text)]">
          Sites
        </h2>
        <div className="divide-y divide-[var(--hairline)]">
          <a
            href={siteConfig.toolsUrl}
            className="group flex items-start justify-between gap-4 py-5 no-underline transition-opacity hover:opacity-70"
          >
            <div className="min-w-0">
              <h3 className="mb-1 text-[17px] font-semibold leading-snug text-[var(--text)]">
                Tools
              </h3>
              <p className="m-0 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                A collection of single-purpose web tools — prompt manager,
                color palettes, diff viewer, and more.
              </p>
            </div>
            <span className="mt-0.5 shrink-0 text-[14px] font-medium text-[var(--text-secondary)] transition-transform group-hover:translate-x-0.5">
              tools.iid.sh&ensp;→
            </span>
          </a>
          <a
            href={siteConfig.dotUrl}
            className="group flex items-start justify-between gap-4 py-5 no-underline transition-opacity hover:opacity-70"
          >
            <div className="min-w-0">
              <h3 className="mb-1 text-[17px] font-semibold leading-snug text-[var(--text)]">
                Dotfiles
              </h3>
              <p className="m-0 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                One-command setup for zsh, oh-my-zsh, vim, tmux, and git —
                quick start in a very new environment.
              </p>
            </div>
            <span className="mt-0.5 shrink-0 text-[14px] font-medium text-[var(--text-secondary)] transition-transform group-hover:translate-x-0.5">
              dot.iid.sh&ensp;→
            </span>
          </a>
        </div>
      </section>

      <section id="contact" className="mb-4" aria-label="contact">
        <h2 className="mb-4 text-[clamp(28px,4vw,40px)] font-[700] leading-[1.1] tracking-[-0.03em] text-[var(--text)]">
          Contact
        </h2>
        <p className="text-[clamp(15px,1.7vw,17px)] leading-[1.6] text-[var(--text-secondary)]">
          {/* Email{" "} */}
          <code className="font-[var(--font-mono)] text-[0.95em] text-[var(--text)]">
            hi@iid.sh
          </code>
        </p>
      </section>
    </>
  );
}
