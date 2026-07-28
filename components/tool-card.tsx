import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getToolHref, type Tool } from "@/lib/tools";

export function ToolCard({
  tool,
  rootPath = false,
}: {
  tool: Tool;
  rootPath?: boolean;
}) {
  const href = getToolHref(tool, rootPath);

  return (
    <Link
      href={href}
      className="group flex min-h-[210px] flex-col justify-between rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)] p-5 text-[var(--text)] no-underline transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-[#fafafa] hover:shadow-[0_20px_60px_rgba(17,17,17,0.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <div>
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-[8px] border border-[var(--hairline)] bg-[#f4f4f4] font-[var(--font-mono)] text-[13px] font-semibold">
          {tool.name.slice(0, 2)}
        </div>
        <h3 className="text-[22px] font-semibold leading-tight text-[var(--text)]">
          {tool.name}
        </h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-[var(--text-secondary)]">
          {tool.description}
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-[var(--hairline)] pt-4 text-[13px] font-medium text-[var(--text-secondary)]">
        <span>Open</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
