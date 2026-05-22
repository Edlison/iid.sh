import { Code2, TerminalSquare } from "lucide-react";
import { dotConfig, features } from "@/lib/dotfiles";
import { ActionLink } from "@/components/action-link";
import { CopyButton } from "@/components/copy-button";

export function DotLanding() {
  return (
    <>
      <section className="border-b border-[var(--hairline)] px-5 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)]">
            <Code2 className="h-6 w-6" />
          </div>
          <h1 className="max-w-[900px] text-[56px] font-semibold leading-none text-[var(--text)] md:text-[92px]">
            {dotConfig.tagline}
          </h1>
          <p className="mt-7 max-w-[700px] text-[20px] leading-[1.5] text-[var(--text-secondary)] md:text-[24px]">
            {dotConfig.description}
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--hairline)] px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-center">
          <div className="min-w-0">
            <h2 className="text-[36px] font-semibold leading-tight text-[var(--text)] md:text-[52px]">
              Install
            </h2>
            <p className="mt-4 max-w-[420px] text-[16px] leading-[1.55] text-[var(--text-secondary)]">
              One command for the AI-native configuration baseline.
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-4 rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)] p-4 shadow-[0_16px_50px_rgba(17,17,17,0.06)] sm:flex-row sm:items-center">
            <TerminalSquare className="hidden h-5 w-5 shrink-0 text-[var(--text-secondary)] sm:block" />
            <code className="min-w-0 flex-1 break-all font-[var(--font-mono)] text-[14px] leading-relaxed text-[var(--text)] sm:overflow-x-auto sm:whitespace-nowrap md:text-[15px]">
              {dotConfig.installCommand}
            </code>
            <CopyButton text={dotConfig.installCommand} />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--hairline)] px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-8 text-[36px] font-semibold leading-tight text-[var(--text)] md:text-[52px]">
            What you get
          </h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="min-h-[190px] rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)] p-5"
              >
                <h3 className="text-[20px] font-semibold leading-tight text-[var(--text)]">
                  {feature.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.55] text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 md:flex-row">
          <ActionLink
            href={dotConfig.repoUrl}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </ActionLink>
          <ActionLink href={dotConfig.installUrl}>
            Raw install script
          </ActionLink>
        </div>
      </section>
    </>
  );
}
