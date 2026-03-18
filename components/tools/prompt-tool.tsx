"use client";

import { useState, useEffect, useCallback } from "react";

interface PromptEntry {
  id: string;
  title: string;
  content: string;
  versions: { content: string; timestamp: number }[];
  updatedAt: number;
}

const STORAGE_KEY = "iid-prompts";

function loadPrompts(): PromptEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePrompts(prompts: PromptEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

export function PromptTool() {
  const [prompts, setPrompts] = useState<PromptEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setPrompts(loadPrompts());
  }, []);

  const active = prompts.find((p) => p.id === activeId);

  const handleNew = useCallback(() => {
    setActiveId(null);
    setTitle("");
    setContent("");
    setShowHistory(false);
  }, []);

  const handleSave = useCallback(() => {
    if (!title.trim()) return;
    const now = Date.now();
    setPrompts((prev) => {
      let next: PromptEntry[];
      if (activeId) {
        next = prev.map((p) =>
          p.id === activeId
            ? {
                ...p,
                title,
                content,
                versions: [...p.versions, { content: p.content, timestamp: p.updatedAt }],
                updatedAt: now,
              }
            : p,
        );
      } else {
        const entry: PromptEntry = {
          id: crypto.randomUUID(),
          title,
          content,
          versions: [],
          updatedAt: now,
        };
        next = [entry, ...prev];
        setActiveId(entry.id);
      }
      savePrompts(next);
      return next;
    });
  }, [activeId, title, content]);

  const handleDelete = useCallback(() => {
    if (!activeId) return;
    setPrompts((prev) => {
      const next = prev.filter((p) => p.id !== activeId);
      savePrompts(next);
      return next;
    });
    handleNew();
  }, [activeId, handleNew]);

  const handleSelect = useCallback(
    (entry: PromptEntry) => {
      setActiveId(entry.id);
      setTitle(entry.title);
      setContent(entry.content);
      setShowHistory(false);
    },
    [],
  );

  const handleRestore = useCallback(
    (version: { content: string; timestamp: number }) => {
      setContent(version.content);
      setShowHistory(false);
    },
    [],
  );

  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      {/* Sidebar */}
      <div className="glass-subtle flex flex-col gap-2 p-4">
        <button
          onClick={handleNew}
          className="cursor-pointer rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-3 py-2 text-[13px] font-semibold text-[var(--text)] transition-colors hover:bg-[var(--surface-hover)]"
        >
          + New Prompt
        </button>
        <div className="flex flex-col gap-1">
          {prompts.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className={`cursor-pointer truncate rounded-lg border-0 px-3 py-2 text-left text-[13px] transition-colors ${
                p.id === activeId
                  ? "bg-[var(--accent)]/12 font-semibold text-[var(--accent)]"
                  : "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              {p.title}
            </button>
          ))}
          {prompts.length === 0 && (
            <p className="px-1 text-[12px] text-[var(--text-secondary)]">
              No saved prompts yet.
            </p>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="glass-subtle flex flex-col gap-3 p-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Prompt title…"
          className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2.5 text-[15px] font-medium text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-2 focus:outline-[var(--accent)]"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          placeholder="Write your prompt…"
          className="w-full resize-y rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4 font-[var(--font-mono)] text-[14px] leading-[1.6] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-2 focus:outline-[var(--accent)]"
        />
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="cursor-pointer rounded-xl bg-[var(--accent)] px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {activeId ? "Save Version" : "Create"}
          </button>
          {activeId && (
            <>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="cursor-pointer rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)]"
              >
                {showHistory ? "Hide History" : "History"}
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer rounded-xl border border-red-200 bg-transparent px-4 py-2 text-[13px] font-medium text-red-500 transition-colors hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
              >
                Delete
              </button>
            </>
          )}
        </div>

        {showHistory && active && active.versions.length > 0 && (
          <div className="mt-2 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
            <h4 className="mb-2 text-[13px] font-medium text-[var(--text-secondary)]">
              Version History
            </h4>
            <div className="flex flex-col gap-2">
              {[...active.versions].reverse().map((v, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-lg bg-[var(--surface-hover)] px-3 py-2"
                >
                  <span className="truncate font-[var(--font-mono)] text-[12px] text-[var(--text-secondary)]">
                    {new Date(v.timestamp).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleRestore(v)}
                    className="shrink-0 cursor-pointer rounded-lg border-0 bg-transparent px-2 py-1 text-[12px] font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {showHistory && active && active.versions.length === 0 && (
          <p className="mt-1 text-[12px] text-[var(--text-secondary)]">
            No previous versions saved yet.
          </p>
        )}
      </div>
    </div>
  );
}
