"use client";

import { useState } from "react";

export function UrlTool() {
  const [url, setUrl] = useState("");

  return (
    <div className="space-y-4">
      <div className="glass-subtle p-5">
        <label className="mb-2 block text-[13px] font-medium text-[var(--text-secondary)]">
          Long URL
        </label>
        <div className="flex gap-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
            placeholder="https://example.com/very/long/path…"
            className="min-w-0 flex-1 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2.5 text-[14px] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-2 focus:outline-[var(--accent)]"
          />
          <button
            disabled
            className="shrink-0 cursor-not-allowed rounded-xl bg-[var(--accent)] px-5 py-2.5 text-[13px] font-semibold text-white opacity-50"
          >
            Shorten
          </button>
        </div>
        <p className="mt-2 text-[12px] text-[var(--text-secondary)]">
          Requires backend — coming soon
        </p>
      </div>

      <div className="glass-subtle p-5">
        <h3 className="mb-2 text-[14px] font-semibold text-[var(--text)]">
          How it works
        </h3>
        <ol className="m-0 space-y-1.5 pl-5 text-[14px] leading-[1.6] text-[var(--text-secondary)]">
          <li>Paste a long URL above.</li>
          <li>Click &quot;Shorten&quot; to generate a short iid.sh link.</li>
          <li>Share the short link — it redirects to the original URL.</li>
        </ol>
      </div>
    </div>
  );
}
