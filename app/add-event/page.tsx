import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { AddEventForm } from "./AddEventForm";

export const metadata: Metadata = { title: "Add Event | Tennis" };

export default function AddEventPage() {
  return (
    <>
      <PageHeader title="Add an event" subtitle="Set the date, time and how many can play." />
      <AddEventForm />
    </>
  );
}
