import type { Metadata } from "next";
import { ToolsLanding } from "@/components/tools-landing";

export const metadata: Metadata = {
  title: "Tools — iid.sh",
  description:
    "A collection of single-purpose web tools, independently useful, consistently designed.",
};

export default function ToolsPage() {
  return <ToolsLanding />;
}
