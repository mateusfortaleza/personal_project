import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const heroCardTable = pgTable("hero_card", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    background_image: varchar({length: 200}).notNull(),
    overlay_color: varchar({length: 7}).notNull(),
    title: varchar({length: 100}).notNull(),
    link: varchar({length: 255}).notNull()
})