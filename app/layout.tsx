import type { Metadata } from "next";
import Script from "next/script";
import { GlassNav } from "@/components/glass-nav";
import { rootSiteMetadata } from "@/lib/root-site";
import { siteConfig } from "@/lib/tools";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: siteConfig.description,
};

const rootMetadataScript = `
  (function () {
    if (window.location.pathname !== "/") return;

    var metadata = ${JSON.stringify(rootSiteMetadata)};
    var host = window.location.hostname;
    var site = "apex";

    if (host.indexOf("tools.") === 0) site = "tools";
    else if (host.indexOf("dot.") === 0) site = "dot";

    var current = metadata[site];
    document.title = current.title;

    var description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", current.description);
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg)]">
        <Script id="root-host-metadata" strategy="beforeInteractive">
          {rootMetadataScript}
        </Script>
        <div className="min-h-screen">
          <GlassNav />
          <main>
            {children}
          </main>
          <footer className="mx-auto flex max-w-[1200px] flex-col gap-3 border-t border-[var(--hairline)] px-5 py-8 text-[13px] text-[var(--text-secondary)] md:flex-row md:items-center md:justify-between md:px-8">
            <span>iid.sh</span>
            <span>(c) {new Date().getFullYear()} iid.sh</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
