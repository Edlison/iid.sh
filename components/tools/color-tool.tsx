"use client";

import { Check } from "lucide-react";
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
    <div className="min-w-0">
      <button
        type="button"
        onClick={handleCopy}
        className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-[8px] border border-black/10 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        style={{ backgroundColor: color }}
        aria-label={`Copy ${color}`}
        title={`Copy ${color}`}
      >
        {copied ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-white">
            <Check className="h-4 w-4" />
          </span>
        ) : null}
      </button>
      <code className="mt-2 block text-center font-[var(--font-mono)] text-[10px] text-[var(--text-secondary)] sm:text-[11px]">
        {color}
      </code>
    </div>
  );
}

export function ColorTool() {
  return (
    <div className="space-y-4">
      {palettes.map((palette) => (
        <section
          key={palette.name}
          className="rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)] p-4 sm:p-5"
        >
          <h3 className="mb-3 text-[15px] font-semibold text-[var(--text)]">
            {palette.name}
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {palette.colors.map((color) => (
              <Swatch key={color} color={color} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
