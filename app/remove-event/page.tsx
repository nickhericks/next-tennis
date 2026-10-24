import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader, Panel } from "@/components/ui";
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
      <PageHeader title="Remove an event" subtitle="Select the tennis events that you would like to delete." />
      <Suspense
        fallback={
          <Panel>
            <div className="h-40 animate-pulse rounded-2xl bg-ink/5" />
          </Panel>
        }
      >
        <EventChoices />
      </Suspense>
    </>
  );
}
