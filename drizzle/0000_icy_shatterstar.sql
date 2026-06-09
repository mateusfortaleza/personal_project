-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "menu" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "menu_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"icon" text NOT NULL,
	"menuText" varchar(200) NOT NULL,
	"menuLink" text NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_card_fields" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"background_image" text NOT NULL,
	"overlay_color" varchar(7) NOT NULL,
	"title" varchar(100) NOT NULL,
	"link" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "language" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language" varchar(100) NOT NULL,
	"lang_code" varchar(2) NOT NULL,
	CONSTRAINT "language_language_unique" UNIQUE("language"),
	CONSTRAINT "language_lang_code_unique" UNIQUE("lang_code")
);
--> statement-breakpoint
CREATE TABLE "hero_card" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hero_card_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"background_image" text NOT NULL,
	"overlay_color" varchar(7) NOT NULL,
	"title" varchar(100) NOT NULL,
	"link" varchar(255) NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"id_lang" varchar(2) DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hero_card" ADD CONSTRAINT "hero_card_id_lang_language_lang_code_fk" FOREIGN KEY ("id_lang") REFERENCES "public"."language"("lang_code") ON DELETE no action ON UPDATE no action;
*/