"use client";

import { useActionState } from "react";
import { removeEvents, type RemoveEventState } from "@/app/actions";
import { BackLink } from "@/components/BackLink";

type EventSummary = { id: number; match_date: string; match_time: string; number_of_courts: number };

export function RemoveEventForm({ events }: { events: EventSummary[] }) {
  const [state, action, pending] = useActionState<RemoveEventState, FormData>(removeEvents, { status: "idle" });

  if (state.status === "success") {
    return (
      <>
        <div className="banner-success">Event(s) Removed</div>
        <div className="mt-24">
          <BackLink button />
        </div>
      </>
    );
  }

  return (
    <>
      <p className="font-bold">Select the tennis events that you would like to delete:</p>
      <div className="mx-auto w-full max-w-[700px]">
        <form action={action} className="font-bold">
          {events.map((e) => (
            <label key={e.id} className="mt-8 block">
              <input type="checkbox" name="tohide" value={e.id} />
              &nbsp;&nbsp;{e.match_date} at {e.match_time}
              <br />
              Number of courts: {e.number_of_courts}
            </label>
          ))}
          <button type="submit" disabled={pending} className="btn">
            Remove
          </button>
        </form>
      </div>
      <BackLink />
    </>
  );
}
