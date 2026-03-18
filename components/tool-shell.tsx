import Link from "next/link";
import type { Tool } from "@/lib/tools";

export function ToolShell({
  tool,
  children,
}: {
  tool: Tool;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/#tools"
          className="inline-block text-[13px] font-medium text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--text)]"
        >
          ← Back to tools
        </Link>
      </div>

      <section className="glass mb-6 p-[clamp(24px,4vw,32px)]" aria-label="tool header">
        <h1 className="mb-2 text-[clamp(26px,3.5vw,38px)] font-[650] leading-[1.12] tracking-[-0.03em] text-[var(--text)]">
          {tool.name}
        </h1>
        <p className="m-0 text-[clamp(15px,1.7vw,17px)] leading-[1.5] text-[var(--text-secondary)]">
          {tool.description}
        </p>
      </section>

      {children}
    </div>
  );
}
