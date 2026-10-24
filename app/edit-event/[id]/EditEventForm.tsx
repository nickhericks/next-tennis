"use client";

import { useActionState } from "react";
import { savePlayers, type SavePlayersState } from "@/app/actions";
import { BackLink } from "@/components/BackLink";
import type { TennisEvent } from "@/lib/db";

export function EditEventForm({ event }: { event: TennisEvent }) {
  const [state, action, pending] = useActionState<SavePlayersState, FormData>(savePlayers, { status: "idle" });
  const slots = event.players.slice(0, event.number_of_players);

  if (state.status === "success") {
    return (
      <>
        <div className="banner-success mt-12">
          Success!
          <br />
          Change(s) saved.
        </div>
        <div className="mt-24">
          <BackLink button />
        </div>
      </>
    );
  }

  return (
    <>
      {state.status === "conflict" && (
        <ConflictAlert eventId={event.id} conflicts={state.conflicts} proposed={state.proposed} action={action} />
      )}

      <form action={action} className="font-bold">
        <input type="hidden" name="match_id" value={event.id} />
        {slots.map((name, i) => (
          <input key={i} type="hidden" name={`original_player_${i + 1}`} value={name} />
        ))}

        <div>{event.match_date}</div>
        <div>{event.match_time}</div>
        <div className="mt-6">
          Courts available:&nbsp;&nbsp;&nbsp;<b>{event.number_of_courts}</b>
        </div>
        <div className="mb-6">
          Players allowed:&nbsp;&nbsp;&nbsp;<b>{event.number_of_players}</b>
        </div>

        {slots.map((name, i) => (
          <div key={i}>
            <label htmlFor={`player_${i + 1}`}>Player:</label>{" "}
            <input
              type="text"
              id={`player_${i + 1}`}
              name={`player_${i + 1}`}
              defaultValue={state.status === "conflict" ? state.proposed[i] : name}
              className="field"
            />
          </div>
        ))}

        <button type="submit" disabled={pending} className="btn">
          Save
        </button>
      </form>
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
    <div className="absolute top-2 left-1/2 z-10 w-[300px] -translate-x-1/2 rounded-2xl border-[6px] border-go bg-cloud p-2 shadow-card min-[601px]:top-20 min-[601px]:w-[400px] min-[601px]:p-4 min-[901px]:w-[600px]">
      Warning!
      <br />
      <br />
      {conflicts.length === 1 ? "This spot has" : "These spots have"} already been reserved by another player:{" "}
      <span className="font-bold">
        {conflicts.map((c) => `${c.name} (spot ${c.slot})`).join(", ")}
      </span>
      <br />
      <br />
      If the spot appeared to be available, it may be that in the time since you loaded this webpage, another player
      has confirmed this spot.
      <br />
      <br />
      To avoid unintentionally removing the current player from this spot, click the &apos;REFRESH PAGE&apos; button
      below to see this match&apos;s current player list.
      <br />
      <br />
      If you do wish to override {names}&apos;s reservation, click the &apos;Override&apos; button below.
      <br />
      <br />
      <div className="flex flex-row flex-wrap justify-center">
        <form action={action}>
          <input type="hidden" name="match_id" value={eventId} />
          {proposed.map((name, i) => (
            <input key={i} type="hidden" name={`player_${i + 1}`} value={name} />
          ))}
          <button type="submit" name="override" value="1" className="btn btn-stop">
            Override
          </button>
        </form>
        {/* Full page load so the form re-reads the latest players. */}
        <a href={`/edit-event/${eventId}`} className="btn btn-go">
          Refresh page
        </a>
      </div>
    </div>
  );
}
