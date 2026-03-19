import type { Metadata } from "next";
import Script from "next/script";
import { GlassNav } from "@/components/glass-nav";
import { rootSiteMetadata } from "@/lib/root-site";
import { siteConfig } from "@/lib/tools";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: siteConfig.tagline,
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
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f6f6f8_55%,#eef0f4_100%)] dark:bg-[radial-gradient(circle_at_top,#161618_0%,#0e0e12_55%,#0a0a0e_100%)]">
        <Script id="root-host-metadata" strategy="beforeInteractive">
          {rootMetadataScript}
        </Script>
        <div className="min-h-screen pt-2 pb-10">
          <GlassNav />
          <main className="mx-auto max-w-[1080px] px-[clamp(20px,5vw,48px)]">
            {children}
            <footer className="mt-10 text-center text-[13px] text-[var(--text-secondary)]">
              © {new Date().getFullYear()} iid.sh
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
