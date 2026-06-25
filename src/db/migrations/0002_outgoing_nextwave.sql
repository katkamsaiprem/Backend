ALTER TABLE "properties" RENAME COLUMN "propertyId" TO "id";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "propertyName" TO "name";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "propertyImage" TO "Image";--> statement-breakpoint
CREATE INDEX "idx_city" ON "properties" USING btree ("city");--> statement-breakpoint
CREATE INDEX "idx_country" ON "properties" USING btree ("country");--> statement-breakpoint
CREATE INDEX "idx_category" ON "properties" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_propertyType" ON "properties" USING btree ("propertyType");--> statement-breakpoint
CREATE INDEX "idx_price" ON "properties" USING btree ("price");--> statement-breakpoint
CREATE INDEX "idx_rating" ON "properties" USING btree ("rating");--> statement-breakpoint
CREATE INDEX "idx_createdAt" ON "properties" USING btree ("created_at");