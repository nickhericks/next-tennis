import Link from "next/link";

export function TennisBall({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="15" fill="#d9f24a" />
      <path d="M4.5 7.5c5 3.5 5 13.5 0 17M27.5 7.5c-5 3.5-5 13.5 0 17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 text-ink/70">{subtitle}</p>}
    </div>
  );
}

export function Panel({ children }: { children: React.ReactNode }) {
  return <div className="glass mx-auto w-full max-w-lg p-6 sm:p-8">{children}</div>;
}

export function BackLink() {
  return (
    <div className="mt-6 text-center">
      <Link href="/" className="text-sm font-semibold text-ink/70 transition hover:text-ink">
        ← Back to events
      </Link>
    </div>
  );
}

const icons = {
  success: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  warning: <path d="M12 8v5m0 3.5v.01M10.3 3.9L2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />,
};

export function Notice({ tone, title, children }: { tone: "success" | "warning"; title: string; children?: React.ReactNode }) {
  const color = tone === "success" ? "bg-go" : "bg-stop";
  return (
    <div role={tone === "warning" ? "alert" : "status"} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 text-left ring-1 ring-ink/5">
      <span className={`grid size-9 shrink-0 place-items-center rounded-full ${color} text-white`}>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {icons[tone]}
        </svg>
      </span>
      <div>
        <p className="font-bold">{title}</p>
        {children && <p className="text-sm text-ink/70">{children}</p>}
      </div>
    </div>
  );
}

// Shown after a successful add / remove / save.
export function Done({ title, message }: { title: string; message: string }) {
  return (
    <Panel>
      <Notice tone="success" title={title}>
        {message}
      </Notice>
      <Link href="/" className="btn-primary mt-6 w-full">
        Return to events
      </Link>
    </Panel>
  );
}
