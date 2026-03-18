"use client";

import { useState, useCallback } from "react";

interface DiffLine {
  type: "equal" | "add" | "remove";
  text: string;
}

function computeDiff(a: string, b: string): DiffLine[] {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const max = linesA.length + linesB.length;
  const v = new Map<number, number>();
  const trace: Map<number, number>[] = [];

  v.set(1, 0);
  outer: for (let d = 0; d <= max; d++) {
    trace.push(new Map(v));
    for (let k = -d; k <= d; k += 2) {
      let x: number;
      if (k === -d || (k !== d && (v.get(k - 1) ?? 0) < (v.get(k + 1) ?? 0))) {
        x = v.get(k + 1) ?? 0;
      } else {
        x = (v.get(k - 1) ?? 0) + 1;
      }
      let y = x - k;
      while (x < linesA.length && y < linesB.length && linesA[x] === linesB[y]) {
        x++;
        y++;
      }
      v.set(k, x);
      if (x >= linesA.length && y >= linesB.length) break outer;
    }
  }

  const result: DiffLine[] = [];
  let x = linesA.length;
  let y = linesB.length;
  for (let d = trace.length - 1; d >= 0; d--) {
    const t = trace[d];
    const k = x - y;
    let prevK: number;
    if (k === -d || (k !== d && (t.get(k - 1) ?? 0) < (t.get(k + 1) ?? 0))) {
      prevK = k + 1;
    } else {
      prevK = k - 1;
    }
    const prevX = t.get(prevK) ?? 0;
    const prevY = prevX - prevK;

    while (x > prevX && y > prevY) {
      x--;
      y--;
      result.unshift({ type: "equal", text: linesA[x] });
    }
    if (d > 0) {
      if (x === prevX) {
        y--;
        result.unshift({ type: "add", text: linesB[y] });
      } else {
        x--;
        result.unshift({ type: "remove", text: linesA[x] });
      }
    }
  }
  return result;
}

const lineStyles: Record<DiffLine["type"], string> = {
  equal: "text-[var(--text-secondary)]",
  add: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  remove: "bg-red-500/10 text-red-700 dark:text-red-400 line-through",
};

const linePrefix: Record<DiffLine["type"], string> = {
  equal: "  ",
  add: "+ ",
  remove: "- ",
};

export function DiffTool() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diff, setDiff] = useState<DiffLine[] | null>(null);

  const handleCompare = useCallback(() => {
    setDiff(computeDiff(textA, textB));
  }, [textA, textB]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-subtle p-4">
          <label className="mb-2 block text-[13px] font-medium text-[var(--text-secondary)]">
            Original
          </label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={10}
            className="w-full resize-y rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3 font-[var(--font-mono)] text-[14px] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-2 focus:outline-[var(--accent)]"
            placeholder="Paste original text…"
          />
        </div>
        <div className="glass-subtle p-4">
          <label className="mb-2 block text-[13px] font-medium text-[var(--text-secondary)]">
            Modified
          </label>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={10}
            className="w-full resize-y rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3 font-[var(--font-mono)] text-[14px] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-2 focus:outline-[var(--accent)]"
            placeholder="Paste modified text…"
          />
        </div>
      </div>

      <button
        onClick={handleCompare}
        className="glass-subtle cursor-pointer px-6 py-2.5 text-[14px] font-semibold text-[var(--text)] transition-colors hover:bg-[var(--surface-hover)]"
      >
        Compare
      </button>

      {diff && (
        <div className="glass-subtle overflow-x-auto p-4">
          <h3 className="mb-3 text-[13px] font-medium text-[var(--text-secondary)]">
            Result
          </h3>
          <pre className="m-0 font-[var(--font-mono)] text-[13px] leading-[1.7]">
            {diff.length === 0 ? (
              <span className="text-[var(--text-secondary)]">
                No differences found.
              </span>
            ) : (
              diff.map((line, i) => (
                <div key={i} className={`px-2 ${lineStyles[line.type]}`}>
                  {linePrefix[line.type]}
                  {line.text}
                </div>
              ))
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
