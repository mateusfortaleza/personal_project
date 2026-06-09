import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { and, eq } from 'drizzle-orm';
import { heroCard, heroCardFields } from '../db/schema';

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
  public async getHeroCardsWithoutId(languageCode: string) {
    return getDb()
      .select({
        background_image: heroCardFields.backgroundImage,
        overlay_color: heroCardFields.overlayColor,
        title: heroCardFields.title,
        link: heroCardFields.link,
      })
      .from(heroCardFields)
      .innerJoin(heroCard, eq(heroCardFields.heroCardId, heroCard.id))
      .where(
        and(
          eq(heroCard.isHeroCardDeleted, false),
          eq(heroCardFields.languageId, languageCode),
        ),
      );
  }
}
