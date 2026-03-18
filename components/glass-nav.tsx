"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Site = "apex" | "tools" | "dot";

const navLink =
  "text-[var(--text-secondary)] transition-colors hover:text-[var(--text)] no-underline";

export function GlassNav() {
  const [site, setSite] = useState<Site>("apex");

  useEffect(() => {
    const host = window.location.hostname;
    if (host.startsWith("tools.")) setSite("tools");
    else if (host.startsWith("dot.")) setSite("dot");
  }, []);

  const brand =
    site === "tools"
      ? "tools.iid.sh"
      : site === "dot"
        ? "dot.iid.sh"
        : "iid.sh";

  return (
    <header className="glass sticky top-2 z-50 mx-6 mb-8 py-3.5">
      <div className="mx-auto flex max-w-[980px] items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-wide text-[var(--text)] no-underline"
        >
          {brand}
        </Link>
        <nav
          className="flex items-center gap-5 text-[14px]"
          aria-label="primary"
        >
          {site === "apex" && (
            <>
              <a href="https://tools.iid.sh" className={navLink}>
                Tools
              </a>
              <a href="https://dot.iid.sh" className={navLink}>
                Dotfiles
              </a>
            </>
          )}
          {site === "tools" && (
            <a href="https://iid.sh" className={navLink}>
              iid.sh
            </a>
          )}
          {site === "dot" && (
            <>
              <a href="https://iid.sh" className={navLink}>
                iid.sh
              </a>
              <a
                href="https://github.com/Edlison/.dotfiles"
                className={navLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
