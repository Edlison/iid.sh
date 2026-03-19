import type { Metadata } from "next";
import { RootPageClient } from "@/components/root-page";
import { rootPageMetadata } from "@/lib/root-site";

export const metadata: Metadata = {
  title: rootPageMetadata.title,
  description: rootPageMetadata.description,
};

export default function RootPage() {
  return <RootPageClient />;
}
