import Link from "next/link";

export function GlassNav() {
  return (
    <header className="glass sticky top-4 z-50 mx-auto mb-8 flex max-w-[720px] items-center justify-between gap-4 px-6 py-3.5">
      <Link
        href="/"
        className="text-[15px] font-semibold tracking-wide text-[var(--text)] no-underline"
      >
        iid.sh
      </Link>
      <nav className="flex items-center gap-5 text-[14px]" aria-label="primary">
        <Link
          href="/#tools"
          className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text)] no-underline"
        >
          Tools
        </Link>
        <Link
          href="/#about"
          className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text)] no-underline"
        >
          About
        </Link>
        <Link
          href="/#contact"
          className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text)] no-underline"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
