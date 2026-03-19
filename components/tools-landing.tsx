import { tools, siteConfig } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";

export function ToolsLanding({ rootPath = false }: { rootPath?: boolean }) {
  return (
    <>
      <section className="mt-6 mb-16" aria-label="hero">
        <h1 className="mb-4 text-[clamp(44px,7vw,80px)] font-[700] leading-[1.04] tracking-[-0.04em] text-[var(--text)]">
          Tools
        </h1>
        <p className="max-w-[600px] text-[clamp(17px,2.2vw,21px)] font-[400] leading-[1.4] tracking-[-0.01em] text-[var(--text-secondary)]">
          {siteConfig.toolsTagline}
        </p>
      </section>

      <section className="mb-8" aria-label="tools">
        <h2 className="mb-6 text-[clamp(28px,4vw,40px)] font-[700] leading-[1.1] tracking-[-0.03em] text-[var(--text)]">
          Explore the tools.
        </h2>
        <div className="divide-y divide-[var(--hairline)]">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} rootPath={rootPath} />
          ))}
        </div>
      </section>
    </>
  );
}
