export interface Tool {
  id: string;
  name: string;
  description: string;
  slug: string;
  interactive: boolean;
  href?: string;
}

export const siteConfig = {
  siteName: "iid.sh",
  baseUrl: "https://iid.sh",
  toolsUrl: "https://tools.iid.sh",
  dotUrl: "https://dot.iid.sh",
  tagline:
    "We begin with imagination, build intelligence, and design for humans.",
  description:
    "A coherent product matrix for AI-native interfaces, shared runtime infrastructure, focused apps, and vertical agents.",
  toolsTagline: "Minimal utilities for daily building, writing, and shipping.",
} as const;

export const tools: Tool[] = [
  {
    id: "dotfiles",
    name: "Dotfiles",
    description: "A minimal terminal baseline for building and thinking.",
    slug: "dot",
    interactive: true,
    href: "/dot/",
  },
  {
    id: "color",
    name: "Color",
    description: "Academic color palettes.",
    slug: "color",
    interactive: true,
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => !t.href && t.slug === slug);
}

export function getAllSlugs(): string[] {
  return tools.filter((t) => !t.href).map((t) => t.slug);
}
