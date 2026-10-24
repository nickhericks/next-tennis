import "server-only";
import { neon } from "@neondatabase/serverless";
import { connection } from "next/server";

export const MAX_SLOTS = 8;

export type TennisEvent = {
  id: number;
  match_date: string;
  match_time: string;
  number_of_courts: number;
  number_of_players: number;
  players: string[]; // always MAX_SLOTS long, '' = open slot
};

type EventRow = Omit<TennisEvent, "players"> & Record<`player_${number}`, string>;

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

function toEvent(row: EventRow): TennisEvent {
  const players = Array.from({ length: MAX_SLOTS }, (_, i) => row[`player_${i + 1}`] ?? "");
  return {
    id: row.id,
    match_date: row.match_date,
    match_time: row.match_time,
    number_of_courts: row.number_of_courts,
    number_of_players: row.number_of_players,
    players,
  };
}

export async function getVisibleEvents(): Promise<TennisEvent[]> {
  await connection();
  const rows = await db()`SELECT * FROM events WHERE display = 'Y' ORDER BY id`;
  return (rows as EventRow[]).map(toEvent);
}

export async function getEvent(id: number): Promise<TennisEvent | null> {
  await connection();
  const rows = await db()`SELECT * FROM events WHERE id = ${id} AND display = 'Y'`;
  return rows[0] ? toEvent(rows[0] as EventRow) : null;
}

export async function insertEvent(e: {
  match_date: string;
  match_time: string;
  number_of_courts: number;
  number_of_players: number;
}) {
  await db()`
    INSERT INTO events (match_date, match_time, number_of_courts, number_of_players)
    VALUES (${e.match_date}, ${e.match_time}, ${e.number_of_courts}, ${e.number_of_players})`;
}

export async function hideEvents(ids: number[]) {
  if (ids.length === 0) return;
  await db()`UPDATE events SET display = 'N' WHERE id = ANY(${ids})`;
}

export async function updatePlayers(id: number, p: string[]) {
  await db()`
    UPDATE events SET
      player_1 = ${p[0]}, player_2 = ${p[1]}, player_3 = ${p[2]}, player_4 = ${p[3]},
      player_5 = ${p[4]}, player_6 = ${p[5]}, player_7 = ${p[6]}, player_8 = ${p[7]}
    WHERE id = ${id}`;
}
