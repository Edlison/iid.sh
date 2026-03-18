"use client";

import { useEffect, useState } from "react";
import { PortalHome } from "@/components/portal-home";
import { ToolsLanding } from "@/components/tools-landing";
import { DotLanding } from "@/components/dot-landing";
import { siteConfig } from "@/lib/tools";

type Site = "apex" | "tools" | "dot";

const siteMetadata = {
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
} satisfies Record<Site, { title: string; description: string }>;

function detectSite(hostname: string): Site {
  if (hostname.startsWith("tools.")) return "tools";
  if (hostname.startsWith("dot.")) return "dot";
  return "apex";
}

function syncHead(site: Site) {
  const metadata = siteMetadata[site];
  document.title = metadata.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", metadata.description);
  }
}

export default function RootPage() {
  const [site, setSite] = useState<Site>("apex");

  useEffect(() => {
    const nextSite = detectSite(window.location.hostname);
    setSite(nextSite);
    syncHead(nextSite);
  }, []);

  if (site === "tools") return <ToolsLanding rootPath />;
  if (site === "dot") return <DotLanding />;
  return <PortalHome />;
}
