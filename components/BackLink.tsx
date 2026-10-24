import Link from "next/link";

// "Return to events page": a big button after an action, a plain link otherwise.
export function BackLink({ button = false }: { button?: boolean }) {
  return (
    <Link href="/" className={button ? "btn" : "mt-24 inline-block p-2 font-bold text-muted"}>
      Return to events page
    </Link>
  );
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="my-6 font-display text-[2rem] font-bold">{children}</h2>;
}
