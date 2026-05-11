import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { heroCardTable } from '../db/schema';

const databaseUrl = process.env.DATABASE_URL;
let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set. Add it to .env before querying hero cards.");
  }

  db ??= drizzle(databaseUrl);
  return db;
}

export default class HeroCardsDao {
  public async getHeroCardsWithoutId() {
    return getDb()
      .select({
        background_image: heroCardTable.background_image,
        overlay_color: heroCardTable.overlay_color,
        title: heroCardTable.title,
        link: heroCardTable.link,
      })
      .from(heroCardTable);
  }
}
