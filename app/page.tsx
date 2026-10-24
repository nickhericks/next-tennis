import Link from "next/link";
import { Suspense } from "react";
import { EventCard } from "@/components/EventCard";
import { getVisibleEvents } from "@/lib/db";

async function EventList() {
  const events = await getVisibleEvents();
  if (events.length === 0) {
    return (
      <div className="glass col-span-full mx-auto max-w-md p-8 text-center">
        <p className="font-semibold">No events yet</p>
        <p className="mt-1 text-sm text-ink/70">Create one to start collecting sign-ups.</p>
        <Link href="/add-event" className="btn-primary mt-5">
          Add event
        </Link>
      </div>
    );
  }
  return events.map((event) => <EventCard key={event.id} event={event} />);
}

function CardSkeleton() {
  return <div className="glass h-96 animate-pulse" />;
}

export default function Home() {
  return (
    <>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Claim your spot on the court</h1>
        <p className="mt-3 text-ink/70">Pick a match, add your name, and you&apos;re in.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          }
        >
          <EventList />
        </Suspense>
      </div>
    </>
  );
}
