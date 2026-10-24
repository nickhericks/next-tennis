import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHeader, Panel } from "@/components/ui";
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
      <PageHeader title="Edit players" subtitle="Add your name to an open spot, or update the list." />
      <Suspense
        fallback={
          <Panel>
            <div className="h-64 animate-pulse rounded-2xl bg-ink/5" />
          </Panel>
        }
      >
        <EditEvent params={params} />
      </Suspense>
    </>
  );
}
