import { siteConfig } from "@/lib/tools";

export type RootSite = "apex" | "tools" | "dot";

export const rootSiteMetadata = {
  apex: {
    title: siteConfig.siteName,
    description: siteConfig.tagline,
  },
  tools: {
    title: "Tools — tools.iid.sh",
    description:
      "A collection of single-purpose web tools, independently useful, consistently designed.",
  },
  dot: {
    title: "Dotfiles — dot.iid.sh",
    description:
      "One-command dotfiles setup for zsh, oh-my-zsh, vim, tmux, and git.",
  },
} satisfies Record<RootSite, { title: string; description: string }>;

export const rootPageMetadata = {
  title: "iid.sh — Portal, Tools, and Dotfiles",
  description:
    "Shared static entrypoint for iid.sh, tools.iid.sh, and dot.iid.sh.",
} as const;

export function detectRootSite(hostname: string): RootSite {
  if (hostname.startsWith("tools.")) return "tools";
  if (hostname.startsWith("dot.")) return "dot";
  return "apex";
}

export function syncRootHead(site: RootSite) {
  const metadata = rootSiteMetadata[site];
  document.title = metadata.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", metadata.description);
  }
}
