import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.IID_SITE_URL ?? "http://127.0.0.1:3000";
const outDir = path.resolve("tmp", "ui-check");

const checks = [
  ["home-desktop", "/", { width: 1440, height: 1000 }],
  ["home-mobile", "/", { width: 390, height: 844 }],
  ["tools-desktop", "/tools/", { width: 1280, height: 900 }],
  ["tools-mobile", "/tools/", { width: 390, height: 844 }],
  ["dot-desktop", "/dot/", { width: 1280, height: 900 }],
  ["dot-mobile", "/dot/", { width: 390, height: 844 }],
];

function target(pathname) {
  return new URL(pathname, baseUrl).toString();
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const removedHero = document.querySelector(
      'img[alt="Abstract connected product matrix for iid.sh"]',
    );
    const links = Array.from(document.querySelectorAll("a")).map((anchor) => ({
      text: (anchor.textContent || "").trim().replace(/\s+/g, " "),
      href: anchor.href,
    }));
    const elements = Array.from(document.querySelectorAll("body *"));
    const viewportWidth = window.innerWidth;
    const overflow = elements
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          tag: element.tagName.toLowerCase(),
          text: (element.textContent || "")
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 70),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          display: style.display,
        };
      })
      .filter(
        (item) =>
          item.width > 0 &&
          item.display !== "none" &&
          (item.left < -2 || item.right > viewportWidth + 2),
      )
      .slice(0, 10);

    return {
      title: document.title,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      overflow,
      removedHeroPresent: Boolean(removedHero),
      heroHasInputLikeEntry: Boolean(
        document
          .querySelector("main section:first-of-type")
          ?.textContent?.toLowerCase()
          .match(
            /what can i help|enter through|prompt|command|ask iid|message/i,
          ),
      ),
      productLinks: links.filter((link) =>
        ["Shea", "Shft", "Shap", "Shil", "Shyr", "Shox"].some((name) =>
          link.text.startsWith(name),
        ),
      ),
    };
  });
}

async function checkPage(browser, name, pathname, viewport) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(target(pathname), { waitUntil: "load" });
  await page.waitForTimeout(300);
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  const data = await inspectPage(page);
  await page.close();

  return { name, file, errors, ...data };
}

async function checkMenus(browser) {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const desktopErrors = [];
  desktop.on("pageerror", (error) => desktopErrors.push(error.message));
  desktop.on("console", (message) => {
    if (message.type() === "error") desktopErrors.push(message.text());
  });
  await desktop.goto(target("/"), { waitUntil: "load" });
  await desktop.getByRole("link", { name: "Products", exact: true }).hover();
  await desktop.waitForTimeout(200);
  const desktopFile = path.join(outDir, "product-menu.png");
  await desktop.screenshot({ path: desktopFile, fullPage: false });

  await desktop.getByRole("link", { name: "Tools", exact: true }).hover();
  await desktop.waitForTimeout(200);
  const toolsFile = path.join(outDir, "tools-menu.png");
  await desktop.screenshot({ path: toolsFile, fullPage: false });
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const mobileErrors = [];
  mobile.on("pageerror", (error) => mobileErrors.push(error.message));
  mobile.on("console", (message) => {
    if (message.type() === "error") mobileErrors.push(message.text());
  });
  await mobile.goto(target("/"), { waitUntil: "load" });
  await mobile.getByRole("button", { name: "Toggle navigation" }).click();
  await mobile.waitForTimeout(200);
  const mobileFile = path.join(outDir, "mobile-menu.png");
  await mobile.screenshot({ path: mobileFile, fullPage: false });
  await mobile.close();

  return [
    { name: "product-menu", file: desktopFile, errors: desktopErrors },
    { name: "tools-menu", file: toolsFile, errors: desktopErrors },
    { name: "mobile-menu", file: mobileFile, errors: mobileErrors },
  ];
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

for (const [name, pathname, viewport] of checks) {
  results.push(await checkPage(browser, name, pathname, viewport));
}

results.push(...(await checkMenus(browser)));
await browser.close();

const failures = results.flatMap((result) => {
  const issues = [];
  if (result.errors?.length) {
    issues.push(`${result.name}: console/page errors: ${result.errors.join("; ")}`);
  }
  if (typeof result.scrollWidth === "number" && result.scrollWidth !== result.clientWidth) {
    issues.push(
      `${result.name}: horizontal overflow ${result.scrollWidth} > ${result.clientWidth}`,
    );
  }
  if (result.overflow?.length) {
    issues.push(`${result.name}: overflowing elements detected`);
  }
  if (result.name.startsWith("home") && result.removedHeroPresent) {
    issues.push(`${result.name}: removed hero image is still present`);
  }
  if (result.name.startsWith("home") && result.heroHasInputLikeEntry) {
    issues.push(`${result.name}: input-like hero entry text detected`);
  }
  return issues;
});

await writeFile(
  path.join(outDir, "results.json"),
  JSON.stringify(results, null, 2),
);

console.log(
  JSON.stringify(
    results.map((result) => ({
      name: result.name,
      file: result.file,
      errors: result.errors,
      scrollWidth: result.scrollWidth,
      clientWidth: result.clientWidth,
      overflowCount: result.overflow?.length,
      removedHeroPresent: result.removedHeroPresent,
      heroHasInputLikeEntry: result.heroHasInputLikeEntry,
      productLinks: result.productLinks?.map((link) => link.href),
    })),
    null,
    2,
  ),
);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
