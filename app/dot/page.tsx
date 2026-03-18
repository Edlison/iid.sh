import type { Metadata } from "next";
import { DotLanding } from "@/components/dot-landing";

export const metadata: Metadata = {
  title: "Dotfiles — dot.iid.sh",
  description:
    "One-command dotfiles setup for zsh, oh-my-zsh, vim, tmux, and git.",
};

export default function DotPage() {
  return <DotLanding />;
}
