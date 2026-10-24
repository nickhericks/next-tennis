import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageTitle } from "@/components/BackLink";
import { getEvent } from "@/lib/db";
import { EditEventForm } from "./EditEventForm";

export const metadata: Metadata = { title: "Edit Event | Tennis" };

async function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const event = Number.isInteger(id) ? await getEvent(id) : null;
  if (!event) notFound();
  return <EditEventForm event={event} />;
}

export default function EditEventPage({ params }: PageProps<"/edit-event/[id]">) {
  return (
    <>
      <PageTitle>Edit event</PageTitle>
      <Suspense fallback={<p>Loading event...</p>}>
        <EditEvent params={params} />
      </Suspense>
    </>
  );
}
