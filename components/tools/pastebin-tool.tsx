"use client";

import { useState } from "react";

export function PastebinTool() {
  const [text, setText] = useState("");

  return (
    <div className="space-y-4">
      <div className="glass-subtle p-5">
        <label className="mb-2 block text-[13px] font-medium text-[var(--text-secondary)]">
          Content
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={14}
          placeholder="Paste your text or code here…"
          className="w-full resize-y rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4 font-[var(--font-mono)] text-[14px] leading-[1.6] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-2 focus:outline-[var(--accent)]"
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            disabled
            className="cursor-not-allowed rounded-xl bg-[var(--accent)] px-5 py-2 text-[13px] font-semibold text-white opacity-50"
          >
            Create Paste
          </button>
          <span className="text-[12px] text-[var(--text-secondary)]">
            Requires backend — coming soon
          </span>
        </div>
      </div>

      <div className="glass-subtle p-5">
        <h3 className="mb-2 text-[14px] font-semibold text-[var(--text)]">
          How it works
        </h3>
        <ol className="m-0 space-y-1.5 pl-5 text-[14px] leading-[1.6] text-[var(--text-secondary)]">
          <li>Paste any text or code snippet above.</li>
          <li>Click &quot;Create Paste&quot; to generate a shareable link.</li>
          <li>Share the link — recipients see your content instantly.</li>
        </ol>
      </div>
    </div>
  );
}
