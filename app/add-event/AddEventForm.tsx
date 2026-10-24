"use client";

import { useActionState, useMemo, useSyncExternalStore } from "react";
import { createEvent, type AddEventState } from "@/app/actions";
import { BackLink, Done, Notice, Panel } from "@/components/ui";

const DAYS_AHEAD = 60;

// 6:00am to 9:00pm in 30-minute steps, e.g. "9:00am", "12:30pm".
const TIMES = Array.from({ length: 31 }, (_, i) => {
  const minutes = 6 * 60 + i * 30;
  const h = Math.floor(minutes / 60);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${minutes % 60 === 0 ? "00" : "30"}${h < 12 ? "am" : "pm"}`;
});

const noopSubscribe = () => () => {};

// Today in the viewer's own time zone. Null during server rendering, so the
// date list is only built in the browser.
function useToday() {
  return useSyncExternalStore(noopSubscribe, () => new Date().toDateString(), () => null);
}

// The next DAYS_AHEAD days, formatted like "Saturday 11/7".
function upcomingDates(today: string | null) {
  if (!today) return [];
  const start = new Date(today);
  return Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
    return `${weekday} ${d.getMonth() + 1}/${d.getDate()}`;
  });
}

export function AddEventForm() {
  const [state, action, pending] = useActionState<AddEventState, FormData>(createEvent, { status: "idle" });
  const today = useToday();
  const dates = useMemo(() => upcomingDates(today), [today]);

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
              <select id="date" name="date" defaultValue="" className="field">
                <option disabled value="">
                  {dates.length ? "Select…" : "Loading…"}
                </option>
                {dates.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="time" className="field-label">
                Time
              </label>
              <select id="time" name="time" defaultValue="" className="field">
                <option disabled value="">
                  Select…
                </option>
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
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
