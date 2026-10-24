"use client";

import { useActionState } from "react";
import { createEvent, type AddEventState } from "@/app/actions";
import { BackLink, Done, Notice, Panel } from "@/components/ui";

export function AddEventForm() {
  const [state, action, pending] = useActionState<AddEventState, FormData>(createEvent, { status: "idle" });

  if (state.status === "success") {
    return <Done title="Success!" message="Event created." />;
  }

  return (
    <>
      <Panel>
        <form action={action} className="space-y-5">
          {state.status === "error" && (
            <Notice tone="warning" title="Please fill all fields!">
              Event not created.
            </Notice>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className="field-label">
                Date
              </label>
              <input type="text" id="date" name="date" placeholder="Saturday 11/7" className="field" />
            </div>
            <div>
              <label htmlFor="time" className="field-label">
                Time
              </label>
              <input type="text" id="time" name="time" placeholder="9:00am" className="field" />
            </div>
            <div>
              <label htmlFor="courts" className="field-label">
                Courts available
              </label>
              <select id="courts" name="courts" defaultValue="" className="field">
                <option disabled value="">
                  Select…
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div>
              <label htmlFor="max-players" className="field-label">
                Players allowed
              </label>
              <select id="max-players" name="max-players" defaultValue="" className="field">
                <option disabled value="">
                  Select…
                </option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" disabled={pending} className="btn-primary w-full py-3">
            {pending ? "Creating…" : "Create new event"}
          </button>
        </form>
      </Panel>
      <BackLink />
    </>
  );
}
