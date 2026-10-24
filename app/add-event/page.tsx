import type { Metadata } from "next";
import { PageTitle } from "@/components/BackLink";
import { AddEventForm } from "./AddEventForm";

export const metadata: Metadata = { title: "Add Event | Tennis" };

export default function AddEventPage() {
  return (
    <>
      <PageTitle>Add an event</PageTitle>
      <AddEventForm />
    </>
  );
}
