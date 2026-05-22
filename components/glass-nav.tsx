"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { products } from "@/lib/products";
import { siteConfig, tools } from "@/lib/tools";
import { ProductName } from "@/components/product-name";

type Site = "apex" | "tools" | "dot";

const navLink =
  "text-[13px] leading-none text-[var(--text)] no-underline transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

const dropdownPanel =
  "absolute left-1/2 top-full w-[360px] -translate-x-1/2 pt-5";

const PRODUCT_PATH = "/product/";
const TOOLS_PATH = "/tools/";
const CONTACT_PATH = "/contact/";

function ProductMatrixMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-[8px] border border-[var(--hairline)] bg-[var(--hairline)]">
      {products.map((product) => {
        const isLive = product.status === "live" && product.href;
        const content = (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[14px] font-semibold leading-tight text-[var(--text)]">
                  <ProductName
                    name={product.name}
                    restClassName="editorial-italic font-normal"
                  />
                </div>
                <div className="mt-1 text-[12px] leading-snug text-[var(--text-secondary)]">
                  {product.role}
                </div>
              </div>
              {isLive ? (
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-secondary)]" />
              ) : (
                <span className="shrink-0 rounded-[999px] border border-[var(--hairline)] px-2 py-1 text-[11px] leading-none text-[var(--text-secondary)]">
                  Soon
                </span>
              )}
            </div>
            <p className="mt-4 text-[13px] leading-[1.45] text-[var(--text-secondary)]">
              {product.summary}
            </p>
          </>
        );

        if (!isLive) {
          return (
            <div
              key={product.id}
              className="bg-[var(--surface-solid)] p-4 opacity-70"
              aria-disabled="true"
            >
              {content}
            </div>
          );
        }

        return (
          <a
            key={product.id}
            href={product.href}
            onClick={onNavigate}
            className="group bg-[var(--surface-solid)] p-4 no-underline transition-colors hover:bg-[#f3f3ee] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[var(--accent)]"
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}

function ToolsMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-[8px] border border-[var(--hairline)] bg-[var(--hairline)]">
      {tools.map((tool) => (
        <a
          key={tool.id}
          href={tool.href ?? `/tools/${tool.slug}/`}
          onClick={onNavigate}
          className="group bg-[var(--surface-solid)] p-4 no-underline transition-colors hover:bg-[#f3f3ee] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[var(--accent)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[14px] font-semibold leading-tight text-[var(--text)]">
                {tool.name}
              </div>
              <div className="mt-1 text-[12px] leading-snug text-[var(--text-secondary)]">
                {tool.interactive ? "Interactive" : "Planned"}
              </div>
            </div>
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-secondary)] transition-transform group-hover:translate-x-0.5" />
          </div>
          <p className="mt-4 text-[13px] leading-[1.45] text-[var(--text-secondary)]">
            {tool.description}
          </p>
        </a>
      ))}
    </div>
  );
}

function DropdownShell({
  label,
  href,
  open,
  onOpen,
  onClose,
  children,
}: {
  label: string;
  href: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative flex h-16 items-center"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
    >
      <a
        href={href}
        className={navLink}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {label}
      </a>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={dropdownPanel}
          >
            <div className="rounded-[8px] bg-[var(--surface)] p-2 shadow-[0_24px_70px_rgba(17,17,17,0.14)] backdrop-blur-2xl">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function GlassNav() {
  const [site, setSite] = useState<Site>("apex");
  const [productsOpen, setProductsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    if (host.startsWith("tools.")) setSite("tools");
    else if (host.startsWith("dot.")) setSite("dot");
  }, []);

  const brandHref = site === "apex" ? "/" : siteConfig.baseUrl;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--hairline)] bg-[color-mix(in_srgb,var(--bg)_90%,white)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-8">
        {site === "apex" ? (
          <Link
            href={brandHref}
            className="text-[18px] font-semibold leading-none text-[var(--text)] no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            iid.sh
          </Link>
        ) : (
          <a
            href={brandHref}
            className="text-[18px] font-semibold leading-none text-[var(--text)] no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            iid.sh
          </a>
        )}

        <nav className="hidden h-16 items-center gap-7 md:flex" aria-label="primary">
          <DropdownShell
            label="Products"
            href={PRODUCT_PATH}
            open={productsOpen}
            onOpen={() => {
              setProductsOpen(true);
              setToolsOpen(false);
            }}
            onClose={() => setProductsOpen(false)}
          >
            <ProductMatrixMenu onNavigate={() => setProductsOpen(false)} />
          </DropdownShell>
          <DropdownShell
            label="Tools"
            href={TOOLS_PATH}
            open={toolsOpen}
            onOpen={() => {
              setToolsOpen(true);
              setProductsOpen(false);
            }}
            onClose={() => setToolsOpen(false)}
          >
            <ToolsMenu onNavigate={() => setToolsOpen(false)} />
          </DropdownShell>
          <a href={CONTACT_PATH} className={navLink}>
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[8px] border border-[var(--hairline)] bg-[var(--surface)] text-[var(--text)] md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--hairline)] bg-[var(--bg)] md:hidden"
          >
            <div className="space-y-5 px-5 py-5">
              <div>
                <div className="mb-3 text-[12px] font-semibold uppercase text-[var(--text-tertiary)]">
                  <a
                    href={PRODUCT_PATH}
                    className="text-[12px] font-semibold uppercase text-[var(--text-tertiary)] no-underline"
                    onClick={() => setMobileOpen(false)}
                  >
                    Products
                  </a>
                </div>
                <ProductMatrixMenu onNavigate={() => setMobileOpen(false)} />
              </div>
              <div className="grid gap-3 text-[15px]">
                <a
                  href={TOOLS_PATH}
                  className="border-t border-[var(--hairline)] pt-4 no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  Tools
                </a>
                <ToolsMenu onNavigate={() => setMobileOpen(false)} />
                <a
                  href={CONTACT_PATH}
                  className="border-t border-[var(--hairline)] pt-4 no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
