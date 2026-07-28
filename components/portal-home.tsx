"use client";

import {
  ArrowRight,
  Layers3,
  Network,
  Sparkles,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { ContactSection } from "@/components/contact-section";
import { siteConfig, tools } from "@/lib/tools";
import { ProductMatrixSection } from "@/components/product-matrix";

const easeOut = [0.22, 1, 0.36, 1] as const;

const projectSummaries = [
  {
    title: "Interface",
    description:
      "Shea is the unified entry for humans to work with agents, sessions, tools, and workflows across terminal and web.",
    icon: Sparkles,
  },
  {
    title: "Infrastructure",
    description:
      "Shft standardizes models, providers, MCP services, A2A flows, and external tools into one connector layer.",
    icon: Network,
  },
  {
    title: "Applications",
    description:
      "Shap, Shil, Shyr, Shox, tools, and dotfiles turn the shared runtime into focused products for real work.",
    icon: Layers3,
  },
];

function SloganWord({
  initial,
  rest,
}: {
  initial: string;
  rest: string;
}) {
  return (
    <span className="editorial">
      <strong className="font-black">{initial}</strong>
      <span className="font-normal">{rest}</span>
    </span>
  );
}

function IidSlogan() {
  return (
    <span className="editorial">
      We begin with{" "}
      <SloganWord initial="I" rest="magination" />, build{" "}
      <SloganWord initial="I" rest="ntelligence" />, and{" "}
      <SloganWord initial="D" rest="esign" /> for humans.
    </span>
  );
}

export function PortalHome() {
  return (
    <>
      <section className="border-b border-[var(--hairline)] px-5 md:px-8">
        <div className="mx-auto max-w-[1280px] py-14 md:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="max-w-[980px]"
          >
            <p className="mb-8 text-[13px] font-semibold uppercase leading-none text-[var(--text-tertiary)]">
              Product matrix for intelligent work
            </p>
            <h1 className="text-[58px] font-semibold leading-none text-[var(--text)] md:text-[88px] lg:text-[118px]">
              iid.sh
            </h1>
            <p className="mt-8 max-w-[940px] text-[31px] font-medium leading-[1.08] text-[var(--text)] md:text-[48px] lg:text-[56px]">
              <IidSlogan />
            </p>
            <p className="mt-8 max-w-[720px] text-[18px] leading-[1.55] text-[var(--text-secondary)] md:text-[20px]">
              {siteConfig.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section
        className="border-b border-[var(--hairline)] px-5 py-12 md:px-8 md:py-20"
        aria-labelledby="projects-heading"
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 grid gap-4 md:grid-cols-[0.7fr_1fr] md:items-end">
            <h2
              id="projects-heading"
              className="text-[42px] font-semibold leading-[1.05] text-[var(--text)] md:text-[64px]"
            >
              What iid.sh builds
            </h2>
            <p className="max-w-[720px] text-[18px] leading-[1.55] text-[var(--text-secondary)]">
              A small set of connected projects: one interface, one shared
              connector layer, and focused applications that can stand alone or
              work together.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {projectSummaries.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.42,
                    delay: index * 0.05,
                    ease: easeOut,
                  }}
                  className="rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)] p-5"
                >
                  <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-[8px] border border-[var(--hairline)] bg-[#f4f4f4] text-[var(--text)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-[22px] font-semibold leading-tight text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.55] text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <ProductMatrixSection />

      <section
        id="tools"
        className="border-b border-[var(--hairline)] px-5 py-12 md:px-8 md:py-20"
        aria-labelledby="tools-heading"
      >
        <div className="mx-auto grid max-w-[1280px] gap-9 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)]">
              <Wrench className="h-5 w-5" />
            </div>
            <h2
              id="tools-heading"
              className="text-[42px] font-semibold leading-[1.05] text-[var(--text)] md:text-[64px]"
            >
              Tools
            </h2>
            <p className="mt-6 max-w-[560px] text-[18px] leading-[1.55] text-[var(--text-secondary)]">
              {siteConfig.toolsDescription}
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)]">
            {tools.map((tool) => (
              <a
                key={tool.id}
                href={`/tools/${tool.slug}/`}
                className="group flex items-center justify-between gap-5 border-b border-[var(--hairline)] px-5 py-5 text-[var(--text)] no-underline last:border-b-0 hover:bg-[#f7f7f7]"
              >
                <div className="min-w-0">
                  <h3 className="text-[18px] font-semibold leading-tight">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-[14px] leading-[1.45] text-[var(--text-secondary)]">
                    {tool.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-[var(--text-secondary)] transition-transform group-hover:translate-x-0.5" />
              </a>
            ))}
            <div className="px-5 py-5 text-[15px] font-medium text-[var(--text-tertiary)]">
              More coming soon...
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
