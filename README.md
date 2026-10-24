# next-tennis

A Next.js port of [php-tennis](https://github.com/nickhericks/php-tennis): a simple sign-up board for a weekly tennis group. Anyone can add an event, claim a spot by typing a name into a slot, and remove old events.

Built with Next.js (App Router, Server Actions), TypeScript, Tailwind CSS, and Neon Postgres, deployed on Vercel.

Live: https://next-tennis-rho.vercel.app (pushes to `main` deploy automatically)

## Pages

| Route | Replaces | What it does |
| --- | --- | --- |
| `/` | `index.php` | Event cards: date, time, courts, player slots, "Edit players" |
| `/add-event` | `add-event.php` | Create an event (date from the next 60 days, time in 30-min steps, 1–2 courts, 1–8 players) |
| `/remove-event` | `remove-event.php` | Hide events (soft delete, `display = 'N'`) |
| `/edit-event/[id]` | `edit-event.php` + `override-event.php` | Edit player names, with a conflict warning and Override / Refresh |

## Local development

```bash
npm install
vercel link              # link to the Vercel project
vercel env pull .env.local   # pulls DATABASE_URL from the Neon integration
npm run db:setup         # creates the events table and seeds two sample events
npm run dev
```

Any Postgres works; just put a `DATABASE_URL` in `.env.local` (see `.env.example`).

## Differences from php-tennis

This is meant to be a 1:1 port. The only intentional changes are:

- **Conflict check fixed.** The PHP version missed some conflicts (a slot-1 conflict still saved; only the first conflict in slots 2–8 was shown) and flagged clearing your own name as a conflict. Now a slot conflicts only if someone else changed it after you loaded the form, and every conflicting slot is listed in one alert.
- **Safe queries and output.** All SQL is parameterized and React escapes output, fixing the SQL injection and XSS holes.
- **Edit URL.** `/edit-event/[id]` instead of a POST with `match_id`.
- **Not ported:** `sendemail.php` (broken and unlinked) and the unused `.html` pages.
