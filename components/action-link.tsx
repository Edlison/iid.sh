import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

type ActionLinkVariant = "primary" | "secondary";

interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ActionLinkVariant;
  icon?: boolean;
}

const baseClassName =
  "inline-flex items-center justify-center gap-2 rounded-[8px] px-4 py-3 text-[14px] font-semibold no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

const variantClassNames: Record<ActionLinkVariant, string> = {
  primary:
    "action-link-primary bg-[var(--accent)] transition-colors hover:bg-[var(--accent-hover)]",
  secondary:
    "action-link-secondary border border-[var(--hairline)] bg-[var(--surface-solid)] transition-colors hover:bg-[#f3f3f3]",
};

export function ActionLink({
  children,
  className = "",
  icon = true,
  variant = "secondary",
  ...props
}: ActionLinkProps) {
  return (
    <a
      className={`${baseClassName} ${variantClassNames[variant]} ${className}`.trim()}
      {...props}
    >
      <span>{children}</span>
      {icon ? <ArrowUpRight className="h-4 w-4 shrink-0" /> : null}
    </a>
  );
}
