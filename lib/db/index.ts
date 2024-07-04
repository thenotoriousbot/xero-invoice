import * as schema from "@/lib/db/schema";
import { env } from "@/lib/env.mjs";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const sql: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL);
export const db = drizzle(sql, { schema });
