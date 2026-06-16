import "dotenv/config";
import { asc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { menu } from "../db/schema";

const databaseUrl = process.env.DATABASE_URL;
let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env before querying menu items.",
    );
  }

  db ??= drizzle(databaseUrl);
  return db;
}

export default class MenuDao {
  public async getMenuItems() {
    return getDb()
      .select({
        id: menu.id,
        icon: menu.svgUrl,
        text: menu.menuText,
        link: menu.menuLink,
      })
      .from(menu)
      .where(eq(menu.isDeleted, false))
      .orderBy(asc(menu.id));
  }
}
