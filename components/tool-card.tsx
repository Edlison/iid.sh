import Link from "next/link";
import type { Tool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}/`} className="block no-underline">
      <div className="glass-subtle glass-lift flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <h3 className="mb-1 text-[17px] font-semibold leading-snug text-[var(--text)]">
            {tool.name}
          </h3>
          <p className="m-0 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            {tool.description}
          </p>
        </div>
        <span className="mt-0.5 shrink-0 text-[14px] font-medium text-[var(--text-secondary)]">
          →
        </span>
      </div>
    </Link>
  );
}
