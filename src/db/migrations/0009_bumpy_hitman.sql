ALTER TABLE "whishlist" RENAME COLUMN "hotel_id" TO "whishlisted_item_id";--> statement-breakpoint
DROP INDEX "idx_whishlist_hotelId";--> statement-breakpoint
CREATE INDEX "idx_whishlist_itemId" ON "whishlist" USING btree ("whishlisted_item_id");