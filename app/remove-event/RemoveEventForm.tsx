"use client";

import { useActionState } from "react";
import { removeEvents, type RemoveEventState } from "@/app/actions";
import { BackLink, Done, Panel } from "@/components/ui";

type EventSummary = { id: number; match_date: string; match_time: string; number_of_courts: number };

export function RemoveEventForm({ events }: { events: EventSummary[] }) {
  const [state, action, pending] = useActionState<RemoveEventState, FormData>(removeEvents, { status: "idle" });

  if (state.status === "success") {
    return <Done title="Event(s) Removed" message="They no longer appear on the events page." />;
  }

  return (
    <>
      <Panel>
        {events.length === 0 ? (
          <p className="text-center text-ink/70">There are no events to remove.</p>
        ) : (
          <form action={action} className="space-y-3">
            {events.map((e) => (
              <label
                key={e.id}
                className="flex cursor-pointer items-center gap-4 rounded-2xl bg-white/70 p-4 ring-1 ring-ink/5 transition hover:bg-white has-[:checked]:bg-white has-[:checked]:ring-2 has-[:checked]:ring-stop"
              >
                <input type="checkbox" name="tohide" value={e.id} className="size-5 shrink-0 accent-stop" />
                <span className="text-left">
                  <span className="block font-semibold">
                    {e.match_date} at {e.match_time}
                  </span>
                  <span className="text-sm text-ink/60">Number of courts: {e.number_of_courts}</span>
                </span>
              </label>
            ))}
            <button type="submit" disabled={pending} className="btn-stop mt-3 w-full py-3">
              {pending ? "Removing…" : "Remove selected"}
            </button>
          </form>
        )}
      </Panel>
      <BackLink />
    </>
  );
}
