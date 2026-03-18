"use client";

const services = [
  { name: "iid.sh", endpoint: "Main site" },
  { name: "Prompt", endpoint: "/tools/prompt" },
  { name: "Color", endpoint: "/tools/color" },
  { name: "Pastebin", endpoint: "/tools/pastebin" },
  { name: "TinyURL", endpoint: "/tools/url" },
  { name: "Diff", endpoint: "/tools/diff" },
  { name: "Img Upload", endpoint: "/tools/img" },
];

function StatusDot({ status }: { status: "ok" | "pending" }) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${
        status === "ok" ? "bg-emerald-500" : "bg-amber-400"
      }`}
    />
  );
}

export function StatusTool() {
  return (
    <div className="space-y-4">
      <div className="glass-subtle p-5">
        <div className="flex flex-col gap-3">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="flex items-center justify-between rounded-xl bg-[var(--surface)] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <StatusDot status="ok" />
                <span className="text-[14px] font-medium text-[var(--text)]">
                  {svc.name}
                </span>
              </div>
              <span className="font-[var(--font-mono)] text-[12px] text-[var(--text-secondary)]">
                {svc.endpoint}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-subtle p-5">
        <h3 className="mb-2 text-[14px] font-semibold text-[var(--text)]">
          About
        </h3>
        <p className="m-0 text-[14px] leading-[1.6] text-[var(--text-secondary)]">
          This page shows the health of iid.sh services. Real-time monitoring
          with incident history will be available once the backend is connected.
        </p>
      </div>
    </div>
  );
}
