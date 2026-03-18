"use client";

import { useState, useCallback, useId, type PointerEvent } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const distortionId = useId().replace(/:/g, "");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, [text]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      setPointerOffset({
        x: x * 0.05,
        y: y * 0.05,
      });
    },
    [],
  );

  const resetPointer = useCallback(() => {
    setPointerOffset({ x: 0, y: 0 });
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        className="glass-subtle group relative shrink-0 cursor-pointer overflow-hidden rounded-full border-[color-mix(in_srgb,var(--surface-border)_78%,transparent)] bg-[color-mix(in_srgb,var(--surface)_84%,transparent)] px-4 py-1.5 text-[13px] font-semibold tracking-[-0.01em] text-[var(--text)] transition-[transform,box-shadow,background-color] duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--surface-hover)_88%,transparent)] hover:shadow-[0_16px_32px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--accent)_55%,white)] active:scale-[0.98] dark:hover:shadow-[0_18px_34px_rgba(0,0,0,0.28)]"
        style={{
          transform: `translate(${pointerOffset.x}px, ${pointerOffset.y}px)`,
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(255,255,255,0.08))]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[12%] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),rgba(255,255,255,0.14)_48%,transparent_72%)] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          style={{ filter: `url(#${distortionId})` }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/55"
        />
        <span className="relative z-10">{copied ? "Copied" : "Copy"}</span>
      </button>

      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <filter id={distortionId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" />
        </filter>
      </svg>
    </>
  );
}
