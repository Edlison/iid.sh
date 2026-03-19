import type { Metadata } from "next";
import { siteConfig } from "@/lib/tools";
import { ToolsLanding } from "@/components/tools-landing";

export const metadata: Metadata = {
  title: "iid.sh - Tools",
  description: siteConfig.toolsTagline,
};

export default function ToolsPage() {
  return <ToolsLanding />;
}
