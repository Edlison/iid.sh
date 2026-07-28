import { getToolMetadata, ToolRoute } from "@/components/tool-route";
import { getAllToolSlugs } from "@/lib/tools";

export function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return getToolMetadata(params);
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ToolRoute params={params} />;
}
