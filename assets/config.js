export const siteConfig = {
  siteName: "iid.sh",
  baseUrl: "https://iid.sh",
  tools: [
    {
      id: "url",
      name: "tinyurl",
      description: "Shorten a long URL into something easy to share.",
      path: "/url",
    },
    {
      id: "img",
      name: "img upload",
      description: "Upload an image and get a shareable link.",
      path: "/img",
    },
    {
      id: "diff",
      name: "diff",
      description: "Compare two texts and see what changed.",
      path: "/diff",
    },
    {
      id: "pastebin",
      name: "pastebin",
      description: "Share a snippet of text or code.",
      path: "/pastebin",
    },
    {
      id: "status",
      name: "status",
      description: "Check service health and availability.",
      path: "/status",
    },
  ],
};
