import { dotConfig } from "@/lib/dotfiles";
import { siteConfig } from "@/lib/tools";

export type RootSite = "apex" | "tools" | "dot";

export const rootSiteMetadata = {
  apex: {
    title: siteConfig.siteName,
    description: siteConfig.tagline,
  },
  tools: {
    title: "iid.sh - Tools",
    description: siteConfig.toolsTagline,
  },
  dot: {
    title: "iid.sh - Dotfiles",
    description: dotConfig.description,
  },
} satisfies Record<RootSite, { title: string; description: string }>;

export const rootPageMetadata = {
  title: siteConfig.siteName,
  description: siteConfig.tagline,
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
