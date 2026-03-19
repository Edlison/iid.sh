import type { Metadata } from "next";
import { siteConfig } from "@/lib/tools";
import { ToolsLanding } from "@/components/tools-landing";

export const metadata: Metadata = {
  title: "Tools — iid.sh",
  description: siteConfig.toolsTagline,
};

export default function ToolsPage() {
  return <ToolsLanding />;
}
