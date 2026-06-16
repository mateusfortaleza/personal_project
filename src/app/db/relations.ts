import { relations } from "drizzle-orm/relations";
import { language, heroCardFields, heroCard } from "./schema";

export const heroCardFieldsRelations = relations(heroCardFields, ({one}) => ({
	language: one(language, {
		fields: [heroCardFields.languageId],
		references: [language.langCode]
	}),
	heroCard: one(heroCard, {
		fields: [heroCardFields.heroCardId],
		references: [heroCard.id]
	}),
}));

export const languageRelations = relations(language, ({many}) => ({
	heroCardFields: many(heroCardFields),
}));

export const heroCardRelations = relations(heroCard, ({many}) => ({
	heroCardFields: many(heroCardFields),
}));
