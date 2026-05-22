import type { Metadata } from "next";
import { ProductMatrixSection } from "@/components/portal-home";
import { siteConfig } from "@/lib/tools";

export const metadata: Metadata = {
  title: "iid.sh - Products",
  description: siteConfig.description,
};

export default function ProductPage() {
  return <ProductMatrixSection className="" />;
}
