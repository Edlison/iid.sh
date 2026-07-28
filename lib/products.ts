interface ProductBase {
  id: string;
  name: string;
  role: string;
  summary: string;
  description: string;
  accent: string;
}

interface LiveProduct extends ProductBase {
  status: "live";
  href: string;
}

interface ComingSoonProduct extends ProductBase {
  status: "coming-soon";
}

export type Product = LiveProduct | ComingSoonProduct;

export const products: readonly Product[] = [
  {
    id: "shft",
    name: "Shft",
    role: "AI hub and connector layer",
    summary: "The routing layer for models, providers, MCP, A2A, and tools.",
    description:
      "A standard capability layer behind user-facing products, built to compose providers and external services cleanly.",
    accent: "#def2ea",
    href: "https://shft.iid.sh",
    status: "live",
  },
  {
    id: "shea",
    name: "Shea",
    role: "All-in-one AI entry",
    summary: "The front door for agents, sessions, tools, and workflows.",
    description:
      "A unified TUI and WebUI for interacting with intelligence without splitting work across isolated chat surfaces.",
    accent: "#dfe7ff",
    status: "coming-soon",
  },
  {
    id: "shap",
    name: "Shap",
    role: "App platform",
    summary: "Focused apps, tools, MCPs, and plugins as reusable capabilities.",
    description:
      "The platform surface for discovering and invoking small applications across Shea, Shft, and vertical agents.",
    accent: "#f4e6ce",
    status: "coming-soon",
  },
  {
    id: "shil",
    name: "Shil",
    role: "Paper research agent",
    summary: "Literature review, notes, comparison, rebuttal, and synthesis.",
    description:
      "A research workflow agent for turning scattered papers into structured, actionable understanding.",
    accent: "#e8e2f3",
    status: "coming-soon",
  },
  {
    id: "shyr",
    name: "Shyr",
    role: "Finance agent",
    summary: "Financial intelligence, monitoring, reporting, and calm support.",
    description:
      "A systematic layer for finance-related research and decision workflows.",
    accent: "#d8ecef",
    status: "coming-soon",
  },
  {
    id: "shox",
    name: "Shox",
    role: "Extreme CS2 server",
    summary: "High-performance CS2 server deployment and operations.",
    description:
      "Gaming infrastructure with operational depth, speed, and an advanced hosting experience.",
    accent: "#f1ded8",
    status: "coming-soon",
  },
];
