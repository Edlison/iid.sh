import { siteConfig } from "./config.js";

function setYear() {
  const el = document.getElementById("y");
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
}

function renderTools() {
  const list = document.getElementById("tools-list");
  if (!list) return;

  const { siteName, baseUrl, tools } = siteConfig;

  list.replaceChildren(
    ...tools.map((tool) => {
      const li = document.createElement("li");
      li.className = "tool";

      const left = document.createElement("div");

      const h3 = document.createElement("h3");
      h3.textContent = tool.name;

      const p = document.createElement("p");
      p.textContent = tool.description;

      left.append(h3, p);

      const a = document.createElement("a");
      a.className = "tool-link";
      a.href = new URL(tool.path, baseUrl).toString();
      a.textContent = `${siteName}${tool.path} →`;

      li.append(left, a);
      return li;
    }),
  );
}

setYear();
renderTools();
