import { getToolMetadata, ToolRoute } from "@/components/tool-route";
import { getAllToolSlugs } from "@/lib/tools";

const RESERVED = new Set(["tools", "dot", "product", "contact"]);

export function generateStaticParams() {
  return getAllToolSlugs()
    .filter((slug) => !RESERVED.has(slug))
    .map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return getToolMetadata(params);
}

export default async function RootToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ToolRoute params={params} rootPath />;
}
