"use client";

import {
  ArrowUpRight,
  Blocks,
  BookOpenText,
  CircleDollarSign,
  Network,
  ServerCog,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { ProductName } from "@/components/product-name";
import { products, type Product } from "@/lib/products";

const productIcons: Record<Product["id"], LucideIcon> = {
  shea: Sparkles,
  shft: Network,
  shap: Blocks,
  shil: BookOpenText,
  shyr: CircleDollarSign,
  shox: ServerCog,
};

const easeOut = [0.22, 1, 0.36, 1] as const;

function ProductCard({ product, index }: { product: Product; index: number }) {
  const Icon = productIcons[product.id];
  const isLive = product.status === "live";
  const baseClassName =
    "group flex min-h-[310px] flex-col justify-between rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)] p-5 text-[var(--text)] no-underline";
  const liveClassName =
    "transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-[#fafafa] hover:shadow-[0_24px_70px_rgba(17,17,17,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-[var(--hairline)]"
          style={{ backgroundColor: product.accent }}
        >
          <Icon className="h-5 w-5" />
        </div>
        {isLive ? (
          <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--text-secondary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : (
          <span className="shrink-0 rounded-[999px] border border-[var(--hairline)] px-2.5 py-1 text-[12px] leading-none text-[var(--text-secondary)]">
            Coming soon
          </span>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-[24px] font-semibold leading-tight md:text-[28px]">
          <ProductName
            name={product.name}
            restClassName="editorial-italic font-normal"
          />
        </h3>
        <p className="mt-2 text-[15px] leading-[1.45] text-[var(--text-secondary)]">
          {product.role}
        </p>
      </div>

      <p className="mt-8 text-[15px] leading-[1.55] text-[var(--text-secondary)]">
        {product.description}
      </p>
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: easeOut }}
    >
      {isLive ? (
        <a href={product.href} className={`${baseClassName} ${liveClassName}`}>
          {content}
        </a>
      ) : (
        <div className={`${baseClassName} opacity-75`}>{content}</div>
      )}
    </motion.article>
  );
}

export function ProductMatrixSection({
  className = "border-b border-[var(--hairline)]",
  headingLevel = "h2",
}: {
  className?: string;
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;

  return (
    <section
      id="products"
      className={`${className} px-5 py-12 md:px-8 md:py-20`}
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-9 grid gap-6 md:mb-12 md:grid-cols-[0.82fr_1fr] md:items-end">
          <Heading
            id="products-heading"
            className="text-[42px] font-semibold leading-[1.05] md:text-[64px]"
          >
            Product matrix
          </Heading>
          <p className="max-w-[720px] text-[18px] leading-[1.55] text-[var(--text-secondary)]">
            Interface, infrastructure, apps, tools, and vertical agents share
            one design language so each product can stand alone or compose into
            a larger workflow.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
