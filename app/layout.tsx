import type { Metadata } from "next";
import { GlassNav } from "@/components/glass-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "iid.sh",
  description:
    "iid.sh — small tools, independently useful, consistently designed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f6f6f8_55%,#eef0f4_100%)] dark:bg-[radial-gradient(circle_at_top,#161618_0%,#0e0e12_55%,#0a0a0e_100%)]">
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
