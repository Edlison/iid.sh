import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ColorTool } from "@/components/tools/color-tool";
import { DotLanding } from "@/components/dot-landing";
import { ToolShell } from "@/components/tool-shell";
import { getToolBySlug, type Tool } from "@/lib/tools";

const toolComponents: Record<Tool["id"], React.ComponentType> = {
  color: ColorTool,
  dotfiles: DotLanding,
};

export async function getToolMetadata(
  params: Promise<{ slug: string }>,
): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) return {};

  return {
    title: `iid.sh - ${tool.name}`,
    description: tool.description,
  };
}

export async function ToolRoute({
  params,
  rootPath = false,
}: {
  params: Promise<{ slug: string }>;
  rootPath?: boolean;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const Component = toolComponents[tool.id];

  if (tool.id === "dotfiles") return <Component />;

  return (
    <ToolShell tool={tool} backHref={rootPath ? "/" : "/tools/"}>
      <Component />
    </ToolShell>
  );
}
