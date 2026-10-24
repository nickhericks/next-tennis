import Link from "next/link";
import { Suspense } from "react";
import { EventCard } from "@/components/EventCard";
import { getVisibleEvents } from "@/lib/db";

async function EventList() {
  const events = await getVisibleEvents();
  return events.map((event) => <EventCard key={event.id} event={event} />);
}

export default function Home() {
  return (
    <>
      <nav className="flex flex-row flex-wrap justify-end bg-ink p-3 shadow-card">
        <Link className="mr-[2%] p-4 pt-2 text-[.75rem] text-cloud" href="/add-event">
          Add Event
        </Link>
        <Link className="mr-[2%] p-4 pt-2 text-[.75rem] text-cloud" href="/remove-event">
          Remove Event
        </Link>
      </nav>

      <h1 className="m-0 p-4 font-display text-[2rem] font-bold min-[751px]:text-[3rem]">Tennis Signup</h1>

      <div className="flex flex-row flex-wrap justify-center">
        <Suspense fallback={<p>Loading events...</p>}>
          <EventList />
        </Suspense>
      </div>

      <footer className="mt-16 bg-footer p-4 text-white">
        <p>
          {"// built by "}
          <a className="font-bold text-cloud" target="_blank" href="http://nickhericks.com/">
            Nick Hericks
          </a>
        </p>
      </footer>
    </>
  );
}
