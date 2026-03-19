import { notFound } from "next/navigation";
import { getAllSlugs, getToolBySlug } from "@/lib/tools";
import { ToolShell } from "@/components/tool-shell";

import { ColorTool } from "@/components/tools/color-tool";
import { DiffTool } from "@/components/tools/diff-tool";
import { PromptTool } from "@/components/tools/prompt-tool";
import { PastebinTool } from "@/components/tools/pastebin-tool";
import { UrlTool } from "@/components/tools/url-tool";
import { ImgTool } from "@/components/tools/img-tool";
import { StatusTool } from "@/components/tools/status-tool";

const toolComponents: Record<string, React.ComponentType> = {
  color: ColorTool,
  diff: DiffTool,
  prompt: PromptTool,
  pastebin: PastebinTool,
  url: UrlTool,
  img: ImgTool,
  status: StatusTool,
};

const RESERVED = new Set(["tools", "dot"]);

export function generateStaticParams() {
  return getAllSlugs()
    .filter((slug) => !RESERVED.has(slug))
    .map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const tool = getToolBySlug(slug);
    if (!tool) return {};
    return {
      title: `${tool.name} — tools.iid.sh`,
      description: tool.description,
    };
  });
}

export default async function RootToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const Component = toolComponents[slug];
  if (!Component) notFound();

  return (
    <ToolShell tool={tool} backHref="/tools/">
      <Component />
    </ToolShell>
  );
}
