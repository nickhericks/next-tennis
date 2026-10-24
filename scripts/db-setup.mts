// Applies db/schema.sql and db/seed.sql to DATABASE_URL.
// Usage: npm run db:setup   (reads .env.local)
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set (add it to .env.local).");
  process.exit(1);
}

const sql = neon(url);

async function run(file: string) {
  const text = readFileSync(join(process.cwd(), "db", file), "utf8");
  await sql.query(text);
  console.log(`Applied db/${file}`);
}

await run("schema.sql");
await run("seed.sql");
