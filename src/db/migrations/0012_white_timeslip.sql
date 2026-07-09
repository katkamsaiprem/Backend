CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"_id" varchar(20) NOT NULL,
	"sport" varchar(100) NOT NULL,
	"icon" varchar(100) NOT NULL,
	CONSTRAINT "categories__id_unique" UNIQUE("_id")
);
--> statement-breakpoint
CREATE INDEX "idx_category_sport" ON "categories" USING btree ("sport");