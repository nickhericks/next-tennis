"use server";

import { MAX_SLOTS, getEvent, hideEvents, insertEvent, updatePlayers } from "@/lib/db";

export type AddEventState = { status: "idle" | "success" | "error" };

// add-event.php
export async function createEvent(_prev: AddEventState, formData: FormData): Promise<AddEventState> {
  const match_date = String(formData.get("date") ?? "").trim();
  const match_time = String(formData.get("time") ?? "").trim();
  const courts = Number(formData.get("courts"));
  const players = Number(formData.get("max-players"));

  const valid =
    match_date !== "" &&
    match_time !== "" &&
    [1, 2].includes(courts) &&
    Number.isInteger(players) &&
    players >= 1 &&
    players <= MAX_SLOTS;
  if (!valid) return { status: "error" };

  await insertEvent({ match_date, match_time, number_of_courts: courts, number_of_players: players });
  return { status: "success" };
}

export type RemoveEventState = { status: "idle" | "success" };

// remove-event.php
export async function removeEvents(_prev: RemoveEventState, formData: FormData): Promise<RemoveEventState> {
  const ids = formData
    .getAll("tohide")
    .map((v) => Number(v))
    .filter((n) => Number.isInteger(n));
  await hideEvents(ids);
  return { status: "success" };
}

export type SavePlayersState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "conflict"; conflicts: { slot: number; name: string }[]; proposed: string[] };

function readSlots(formData: FormData, prefix: string): string[] {
  return Array.from({ length: MAX_SLOTS }, (_, i) => String(formData.get(`${prefix}${i + 1}`) ?? "").trim());
}

// edit-event.php + override-event.php
export async function savePlayers(_prev: SavePlayersState, formData: FormData): Promise<SavePlayersState> {
  const id = Number(formData.get("match_id"));
  const event = Number.isInteger(id) ? await getEvent(id) : null;
  if (!event) throw new Error("Event not found");

  // Slots above the event's player count are not posted, so they save as ''.
  const proposed = readSlots(formData, "player_");

  if (formData.get("override") == null) {
    // A slot conflicts when someone else changed it after this form was loaded
    // and we'd now be replacing their name.
    const original = readSlots(formData, "original_player_");
    const conflicts = event.players
      .slice(0, event.number_of_players)
      .map((name, i) => ({ slot: i + 1, name }))
      .filter(({ name, slot }) => name !== "" && name !== original[slot - 1] && name !== proposed[slot - 1]);
    if (conflicts.length > 0) return { status: "conflict", conflicts, proposed };
  }

  await updatePlayers(id, proposed);
  return { status: "success" };
}
