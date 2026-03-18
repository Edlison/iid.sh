"use client";

import { useState } from "react";

interface Palette {
  name: string;
  colors: string[];
}

const palettes: Palette[] = [
  {
    name: "Nature",
    colors: ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"],
  },
  {
    name: "Ocean",
    colors: ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"],
  },
  {
    name: "Sunset",
    colors: ["#641220", "#85182A", "#A71E34", "#C71F37", "#E01E37"],
  },
  {
    name: "Forest",
    colors: ["#1B4332", "#2D6A4F", "#40916C", "#52B788", "#74C69D"],
  },
  {
    name: "Pastel",
    colors: ["#FFB5A7", "#FCD5CE", "#F8EDEB", "#F9DCC4", "#FEC89A"],
  },
  {
    name: "Monochrome",
    colors: ["#212529", "#495057", "#6C757D", "#ADB5BD", "#DEE2E6"],
  },
  {
    name: "Vivid",
    colors: ["#FF006E", "#FB5607", "#FFBE0B", "#3A86FF", "#8338EC"],
  },
  {
    name: "Earth",
    colors: ["#6B705C", "#A5A58D", "#B7B7A4", "#D4C7B0", "#FFE8D6"],
  },
];

function Swatch({ color }: { color: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="group relative flex h-16 flex-1 cursor-pointer items-end justify-center rounded-xl border-0 p-2 transition-transform duration-200 hover:scale-105 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)]"
      style={{ backgroundColor: color }}
      title={`Copy ${color}`}
    >
      <span className="rounded-md bg-black/30 px-1.5 py-0.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        {copied ? "Copied!" : color}
      </span>
    </button>
  );
}

export function ColorTool() {
  return (
    <div className="space-y-4">
      {palettes.map((palette) => (
        <div key={palette.name} className="glass-subtle p-5">
          <h3 className="mb-3 text-[15px] font-semibold text-[var(--text)]">
            {palette.name}
          </h3>
          <div className="flex gap-2">
            {palette.colors.map((color) => (
              <Swatch key={color} color={color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
