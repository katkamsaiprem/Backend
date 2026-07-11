ALTER TABLE "whishlist" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_whishlist_userId" ON "whishlist" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "whishlist" DROP COLUMN "updated_at";