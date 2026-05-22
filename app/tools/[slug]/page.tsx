import { notFound } from "next/navigation";
import { DotLanding } from "@/components/dot-landing";
import { getAllSlugs, getToolBySlug } from "@/lib/tools";
import { ToolShell } from "@/components/tool-shell";

import { ColorTool } from "@/components/tools/color-tool";

const toolComponents: Record<string, React.ComponentType> = {
  color: ColorTool,
  dot: DotLanding,
  dotfiles: DotLanding,
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const tool = getToolBySlug(slug);
    if (!tool) return {};
    return {
      title: `iid.sh - ${tool.name}`,
      description: tool.description,
    };
  });
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const Component = toolComponents[slug];
  if (!Component) notFound();

  if (tool.id === "dotfiles") {
    return <Component />;
  }

  return (
    <ToolShell tool={tool}>
      <Component />
    </ToolShell>
  );
}
