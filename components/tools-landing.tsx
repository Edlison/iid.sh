import { ArrowRight, Wrench } from "lucide-react";
import { tools, siteConfig } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";

export function ToolsLanding({ rootPath = false }: { rootPath?: boolean }) {
  return (
    <>
      <section className="border-b border-[var(--hairline)] px-5 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)]">
            <Wrench className="h-6 w-6" />
          </div>
          <h1 className="max-w-[900px] text-[56px] font-semibold leading-none text-[var(--text)] md:text-[92px]">
            Tools
          </h1>
          <p className="mt-7 max-w-[720px] text-[20px] leading-[1.5] text-[var(--text-secondary)] md:text-[24px]">
            {siteConfig.toolsTagline}
          </p>
          <p className="mt-4 max-w-[680px] text-[17px] leading-[1.55] text-[var(--text-secondary)] md:text-[18px]">
            {siteConfig.toolsDescription}
          </p>
          <a
            href={siteConfig.baseUrl}
            className="mt-9 inline-flex items-center gap-2 rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)] px-4 py-3 text-[14px] font-semibold text-[var(--text)] no-underline transition-colors hover:bg-[#f3f3f3]"
          >
            iid.sh matrix <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-16" aria-label="tools">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} rootPath={rootPath} />
            ))}
            <div className="flex min-h-[210px] items-end rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)] p-5 text-[15px] font-medium text-[var(--text-tertiary)]">
              More coming soon...
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
