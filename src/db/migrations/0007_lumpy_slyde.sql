CREATE TABLE "whishlist" (
	"hotel_id" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_whishlist_hotelId" ON "whishlist" USING btree ("hotel_id");