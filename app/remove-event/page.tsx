import type { Metadata } from "next";
import { Suspense } from "react";
import { PageTitle } from "@/components/BackLink";
import { getVisibleEvents } from "@/lib/db";
import { RemoveEventForm } from "./RemoveEventForm";

export const metadata: Metadata = { title: "Remove Event | Tennis" };

async function EventChoices() {
  const events = await getVisibleEvents();
  return (
    <RemoveEventForm
      events={events.map(({ id, match_date, match_time, number_of_courts }) => ({
        id,
        match_date,
        match_time,
        number_of_courts,
      }))}
    />
  );
}

export default function RemoveEventPage() {
  return (
    <>
      <PageTitle>Remove an event</PageTitle>
      <Suspense fallback={<p>Loading events...</p>}>
        <EventChoices />
      </Suspense>
    </>
  );
}
