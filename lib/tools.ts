export interface Tool {
  id: "dotfiles" | "color";
  name: string;
  description: string;
  slug: string;
  aliases: readonly string[];
}

export const siteConfig = {
  siteName: "iid.sh",
  baseUrl: "https://iid.sh",
  description:
    "A coherent product matrix for AI-native interfaces, shared runtime infrastructure, focused apps, and vertical agents.",
  toolsTagline:
    "A focused set of utilities for daily building, writing, and shipping.",
  toolsDescription:
    "A focused group of utilities that stays close to the product system: clean defaults, quick references, and small helpers for daily building.",
} as const;

export const tools: readonly Tool[] = [
  {
    id: "dotfiles",
    name: "Dotfiles",
    description:
      "An AI-native configuration layer for shells, profiles, environment variables, and terminal defaults.",
    slug: "dotfiles",
    aliases: ["dot"],
  },
  {
    id: "color",
    name: "Color",
    description: "Academic color palettes.",
    slug: "color",
    aliases: [],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug || tool.aliases.includes(slug));
}

export function getAllToolSlugs(): string[] {
  return tools.flatMap((tool) => [tool.slug, ...tool.aliases]);
}

export function getToolHref(tool: Tool, rootPath = false): string {
  return rootPath ? `/${tool.slug}/` : `/tools/${tool.slug}/`;
}
