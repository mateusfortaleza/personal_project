import "dotenv/config";
import { asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { language } from "../db/schema";

const databaseUrl = process.env.DATABASE_URL;
let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env before querying languages.",
    );
  }

  db ??= drizzle(databaseUrl);
  return db;
}

export default class LanguageDao {
  public async getLanguages() {
    return getDb()
      .select({
        language: language.language,
        langCode: language.langCode,
      })
      .from(language)
      .orderBy(asc(language.language));
  }
}
