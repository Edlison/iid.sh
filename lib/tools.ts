export interface Tool {
  id: string;
  name: string;
  description: string;
  slug: string;
  interactive: boolean;
}

export const siteConfig = {
  siteName: "iid.sh",
  baseUrl: "https://iid.sh",
  tagline:
    "Independent and identically distributed — small tools, independently useful, consistently designed.",
} as const;

export const tools: Tool[] = [
  {
    id: "prompt",
    name: "Prompt",
    description: "Manage prompts with version history.",
    slug: "prompt",
    interactive: true,
  },
  {
    id: "color",
    name: "Color",
    description: "Academic color palettes.",
    slug: "color",
    interactive: true,
  },
  {
    id: "pastebin",
    name: "Pastebin",
    description: "Share a snippet of text or code.",
    slug: "pastebin",
    interactive: false,
  },
  {
    id: "url",
    name: "TinyURL",
    description: "Shorten a long URL into something easy to share.",
    slug: "url",
    interactive: false,
  },
  {
    id: "diff",
    name: "Diff",
    description: "Compare two texts and see what changed.",
    slug: "diff",
    interactive: true,
  },
  {
    id: "img",
    name: "Img Upload",
    description: "Upload an image and get a shareable link.",
    slug: "img",
    interactive: false,
  },
  {
    id: "status",
    name: "Status",
    description: "Check service health and availability.",
    slug: "status",
    interactive: false,
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return tools.map((t) => t.slug);
}
