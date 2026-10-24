import Link from "next/link";
import type { TennisEvent } from "@/lib/db";

export function EventCard({ event }: { event: TennisEvent }) {
  const slots = event.players.slice(0, event.number_of_players);
  const filled = slots.filter((name) => name !== "").length;
  const full = filled === slots.length;

  return (
    <article className="glass flex flex-col overflow-hidden p-2 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="rounded-[1.25rem] bg-ink p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight">{event.match_date}</h2>
            <p className="mt-0.5 text-white/70">{event.match_time}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${full ? "bg-stop/90" : "bg-white/15"}`}
          >
            {full ? "Full" : `${slots.length - filled} open`}
          </span>
        </div>

        <div className="mt-5 flex gap-2 text-sm">
          <Stat label={event.number_of_courts === 1 ? "court" : "courts"} value={event.number_of_courts} />
          <Stat label="players max" value={event.number_of_players} />
        </div>

        <div className="mt-5">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-[#d9f24a] transition-all" style={{ width: `${(filled / slots.length) * 100}%` }} />
          </div>
          <p className="mt-2 text-xs text-white/60">
            {filled} of {slots.length} spots taken
          </p>
        </div>
      </div>

      <ol className="flex-1 space-y-1.5 px-3 pt-4 pb-3">
        {slots.map((name, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                name ? "bg-ink text-white" : "border border-dashed border-ink/25 text-ink/40"
              }`}
            >
              {name ? name.charAt(0).toUpperCase() : i + 1}
            </span>
            {name ? <span className="truncate font-medium">{name}</span> : <span className="text-ink/40">Open spot</span>}
          </li>
        ))}
      </ol>

      <Link href={`/edit-event/${event.id}`} className="btn-primary m-2 mt-0">
        Edit players
      </Link>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <span className="rounded-xl bg-white/10 px-3 py-1.5">
      <b className="font-bold">{value}</b> <span className="text-white/70">{label}</span>
    </span>
  );
}
