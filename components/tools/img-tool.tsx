"use client";

import { useState, useRef } from "react";

export function ImgTool() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <div className="glass-subtle p-5">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="glass-subtle glass-lift flex w-full cursor-pointer flex-col items-center gap-2 border border-dashed border-[var(--hairline)] px-6 py-10 text-center"
        >
          <span className="text-3xl">🖼</span>
          <span className="text-[14px] font-medium text-[var(--text)]">
            Click to select an image
          </span>
          <span className="text-[12px] text-[var(--text-secondary)]">
            PNG, JPG, GIF, WebP
          </span>
        </button>

        {preview && (
          <div className="mt-4">
            <p className="mb-2 text-[13px] font-medium text-[var(--text-secondary)]">
              Preview — {fileName}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 w-auto rounded-xl border border-[var(--hairline)]"
            />
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <button
            disabled
            className="cursor-not-allowed rounded-xl bg-[var(--accent)] px-5 py-2 text-[13px] font-semibold text-white opacity-50"
          >
            Upload
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
          <li>Select an image from your device.</li>
          <li>Click &quot;Upload&quot; to host it on iid.sh.</li>
          <li>Copy the shareable link and use it anywhere.</li>
        </ol>
      </div>
    </div>
  );
}
