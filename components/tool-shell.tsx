import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Tool } from "@/lib/tools";

export function ToolShell({
  tool,
  backHref = "/tools/",
  children,
}: {
  tool: Tool;
  backHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-6">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <ArrowLeft className="h-4 w-4" /> Tools
          </Link>
        </div>

        <header className="mb-8 border-b border-[var(--hairline)] pb-8 md:mb-10 md:pb-10">
          <h1 className="text-[36px] font-semibold leading-tight text-[var(--text)] md:text-[52px]">
            {tool.name}
          </h1>
          <p className="mt-3 max-w-[680px] text-[17px] leading-[1.55] text-[var(--text-secondary)]">
            {tool.description}
          </p>
        </header>

        {children}
      </div>
    </div>
  );
}
