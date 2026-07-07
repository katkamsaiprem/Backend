CREATE TABLE "venues" (
	"id" serial PRIMARY KEY NOT NULL,
	"venue_id" varchar(20) NOT NULL,
	"name" varchar(150) NOT NULL,
	"sport" varchar(100) NOT NULL,
	"image" text NOT NULL,
	"address" varchar(200) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"rating" numeric(3, 1) NOT NULL,
	"price_per_hour" integer NOT NULL,
	"capacity" integer NOT NULL,
	"number_of_courts" smallint NOT NULL,
	"court_type" varchar(100) NOT NULL,
	"amenities" text[] NOT NULL,
	"is_cancelable" boolean NOT NULL,
	"venue_owner" varchar(100) NOT NULL,
	"owner_joined_on" varchar(30) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "venues_venueId_unique" UNIQUE("venue_id")
);
--> statement-breakpoint
CREATE INDEX "idx_venue_sport" ON "venues" USING btree ("sport");--> statement-breakpoint
CREATE INDEX "idx_venue_city" ON "venues" USING btree ("city");--> statement-breakpoint
CREATE INDEX "idx_venue_rating" ON "venues" USING btree ("rating");--> statement-breakpoint
CREATE INDEX "idx_venue_price_per_hour" ON "venues" USING btree ("price_per_hour");--> statement-breakpoint
CREATE INDEX "idx_venue_court_type" ON "venues" USING btree ("court_type");