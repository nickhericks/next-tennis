"use client";

import { useActionState } from "react";
import { savePlayers, type SavePlayersState } from "@/app/actions";
import { BackLink, Done, Panel } from "@/components/ui";
import type { TennisEvent } from "@/lib/db";

export function EditEventForm({ event }: { event: TennisEvent }) {
  const [state, action, pending] = useActionState<SavePlayersState, FormData>(savePlayers, { status: "idle" });
  const slots = event.players.slice(0, event.number_of_players);

  if (state.status === "success") {
    return <Done title="Success!" message="Change(s) saved." />;
  }

  return (
    <>
      {state.status === "conflict" && (
        <ConflictAlert eventId={event.id} conflicts={state.conflicts} proposed={state.proposed} action={action} />
      )}

      <Panel>
        <div className="-mx-2 -mt-2 mb-6 rounded-[1.25rem] bg-ink p-5 text-white sm:-mx-4 sm:-mt-4">
          <h2 className="text-xl font-bold tracking-tight">{event.match_date}</h2>
          <p className="mt-0.5 text-white/70">{event.match_time}</p>
          <div className="mt-4 flex gap-2 text-sm">
            <span className="rounded-xl bg-white/10 px-3 py-1.5">
              <b>{event.number_of_courts}</b> <span className="text-white/70">{event.number_of_courts === 1 ? "court" : "courts"} available</span>
            </span>
            <span className="rounded-xl bg-white/10 px-3 py-1.5">
              <b>{event.number_of_players}</b> <span className="text-white/70">players allowed</span>
            </span>
          </div>
        </div>

        <form action={action} className="space-y-3">
          <input type="hidden" name="match_id" value={event.id} />
          {slots.map((name, i) => (
            <input key={i} type="hidden" name={`original_player_${i + 1}`} value={name} />
          ))}

          {slots.map((name, i) => (
            <div key={i} className="flex items-center gap-3">
              <label
                htmlFor={`player_${i + 1}`}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-ink/5 text-sm font-bold text-ink/60"
              >
                <span className="sr-only">Player </span>
                {i + 1}
              </label>
              <input
                type="text"
                id={`player_${i + 1}`}
                name={`player_${i + 1}`}
                defaultValue={state.status === "conflict" ? state.proposed[i] : name}
                placeholder="Open spot"
                autoComplete="off"
                className="field"
              />
            </div>
          ))}

          <button type="submit" disabled={pending} className="btn-primary mt-3 w-full py-3">
            {pending ? "Saving…" : "Save"}
          </button>
        </form>
      </Panel>
      <BackLink />
    </>
  );
}

function ConflictAlert({
  eventId,
  conflicts,
  proposed,
  action,
}: {
  eventId: number;
  conflicts: { slot: number; name: string }[];
  proposed: string[];
  action: (formData: FormData) => void;
}) {
  const names = conflicts.map((c) => c.name).join(", ");
  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-ink/40 p-4 backdrop-blur-sm">
      <div role="alertdialog" aria-labelledby="conflict-title" className="glass w-full max-w-md bg-white/95 p-6 text-left">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-stop/15 text-stop">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 8v5m0 3.5v.01M10.3 3.9L2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
            </svg>
          </span>
          <h2 id="conflict-title" className="text-lg font-bold">
            Warning! {conflicts.length === 1 ? "This spot is" : "These spots are"} taken
          </h2>
        </div>

        <ul className="mt-4 space-y-1.5">
          {conflicts.map((c) => (
            <li key={c.slot} className="flex items-center gap-2 rounded-xl bg-ink/5 px-3 py-2 text-sm">
              <span className="font-semibold text-ink/50">Spot {c.slot}</span>
              <span className="font-bold">{c.name}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-2 text-sm text-ink/70">
          <p>
            In the time since you loaded this page, another player may have confirmed{" "}
            {conflicts.length === 1 ? "this spot" : "these spots"}.
          </p>
          <p>
            Click <b>Refresh page</b> to see the current player list, or <b>Override</b> to replace {names}&apos;s
            reservation.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <form action={action}>
            <input type="hidden" name="match_id" value={eventId} />
            {proposed.map((name, i) => (
              <input key={i} type="hidden" name={`player_${i + 1}`} value={name} />
            ))}
            <button type="submit" name="override" value="1" className="btn-stop w-full">
              Override
            </button>
          </form>
          {/* Full page load so the form re-reads the latest players. */}
          <a href={`/edit-event/${eventId}`} className="btn-go">
            Refresh page
          </a>
        </div>
      </div>
    </div>
  );
}
