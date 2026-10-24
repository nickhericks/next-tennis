import Link from "next/link";
import type { TennisEvent } from "@/lib/db";

export function EventCard({ event }: { event: TennisEvent }) {
  return (
    <div className="mx-6 my-4 w-[80%] text-[1.25rem] min-[601px]:w-[60%] min-[751px]:w-[40%] min-[901px]:w-[25%]">
      <div className="rounded-t-2xl bg-ink pt-8 pb-6 text-cloud shadow-card">
        <h3 className="text-[1.25rem] font-bold">{event.match_date}</h3>
        <h3 className="text-[1.25rem] font-bold">{event.match_time}</h3>
        <div className="mt-6">
          Courts available:&nbsp;&nbsp;&nbsp;<b>{event.number_of_courts}</b>
        </div>
        <div>
          Players allowed:&nbsp;&nbsp;&nbsp;<b>{event.number_of_players}</b>
        </div>
      </div>
      <div className="rounded-b-2xl bg-cloud pt-8 shadow-card">
        <ol className="mx-auto w-[70%] text-left">
          {event.players.slice(0, event.number_of_players).map((name, i) => (
            <li key={i} className="h-6">
              {i + 1}. {name}
            </li>
          ))}
        </ol>
        <Link href={`/edit-event/${event.id}`} className="btn">
          Edit players
        </Link>
      </div>
    </div>
  );
}
