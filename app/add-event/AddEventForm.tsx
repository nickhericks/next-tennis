"use client";

import { useActionState } from "react";
import { createEvent, type AddEventState } from "@/app/actions";
import { BackLink } from "@/components/BackLink";

export function AddEventForm() {
  const [state, action, pending] = useActionState<AddEventState, FormData>(createEvent, { status: "idle" });

  if (state.status === "success") {
    return (
      <>
        <div className="banner-success mt-12">
          Success!
          <br />
          Event created.
        </div>
        <div className="mt-24">
          <BackLink button />
        </div>
      </>
    );
  }

  return (
    <>
      {state.status === "error" && (
        <div className="banner-warning">
          Please fill all fields!
          <br />
          Event not created.
        </div>
      )}
      <form action={action} className="font-bold">
        <label htmlFor="date">Date:</label> <input type="text" id="date" name="date" className="field" />
        <br />
        <label htmlFor="time">Time:</label> <input type="text" id="time" name="time" className="field" />
        <br />
        <label htmlFor="courts"># of courts available:</label>{" "}
        <select id="courts" name="courts" defaultValue="" className="field">
          <option disabled value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <br />
        <label htmlFor="max-players"># of players allowed:</label>{" "}
        <select id="max-players" name="max-players" defaultValue="" className="field">
          <option disabled value=""></option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <br />
        <button type="submit" disabled={pending} className="btn mt-10 font-bold">
          Create new event
        </button>
      </form>
      <BackLink />
    </>
  );
}
