export interface Tool {
  id: string;
  name: string;
  description: string;
  slug: string;
  aliases?: string[];
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
  toolsTagline:
    "A focused set of utilities for daily building, writing, and shipping.",
  toolsDescription:
    "A focused group of utilities that stays close to the product system: clean defaults, quick references, and small helpers for daily building.",
} as const;

export const tools: Tool[] = [
  {
    id: "dotfiles",
    name: "Dotfiles",
    description:
      "An AI-native configuration layer for shells, profiles, environment variables, and terminal defaults.",
    slug: "dotfiles",
    aliases: ["dot"],
    interactive: true,
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
  return tools.find(
    (t) => !t.href && (t.slug === slug || t.aliases?.includes(slug)),
  );
}

export function getAllSlugs(): string[] {
  return tools
    .filter((t) => !t.href)
    .flatMap((t) => [t.slug, ...(t.aliases ?? [])]);
}
