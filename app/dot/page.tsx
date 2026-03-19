import type { Metadata } from "next";
import { dotConfig } from "@/lib/dotfiles";
import { DotLanding } from "@/components/dot-landing";

export const metadata: Metadata = {
  title: "iid.sh - Dotfiles",
  description: dotConfig.description,
};

export default function DotPage() {
  return <DotLanding />;
}
