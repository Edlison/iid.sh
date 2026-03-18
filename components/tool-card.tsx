import Link from "next/link";
import type { Tool } from "@/lib/tools";

export function ToolCard({
  tool,
  rootPath = false,
}: {
  tool: Tool;
  rootPath?: boolean;
}) {
  const href = rootPath ? `/${tool.slug}/` : `/tools/${tool.slug}/`;
  return (
    <Link
      href={href}
      className="group flex items-start justify-between gap-4 py-5 no-underline transition-opacity hover:opacity-70"
    >
      <div className="min-w-0">
        <h3 className="mb-1 text-[17px] font-semibold leading-snug text-[var(--text)]">
          {tool.name}
        </h3>
        <p className="m-0 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          {tool.description}
        </p>
      </div>
      <span className="mt-0.5 shrink-0 text-[14px] font-medium text-[var(--text-secondary)] transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
