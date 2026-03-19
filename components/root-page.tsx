"use client";

import { useEffect, useState } from "react";
import { PortalHome } from "@/components/portal-home";
import { ToolsLanding } from "@/components/tools-landing";
import { DotLanding } from "@/components/dot-landing";
import { detectRootSite, syncRootHead, type RootSite } from "@/lib/root-site";

export function RootPageClient() {
  const [site, setSite] = useState<RootSite>("apex");

  useEffect(() => {
    const nextSite = detectRootSite(window.location.hostname);
    setSite(nextSite);
    syncRootHead(nextSite);
  }, []);

  if (site === "tools") return <ToolsLanding rootPath />;
  if (site === "dot") return <DotLanding />;
  return <PortalHome />;
}
