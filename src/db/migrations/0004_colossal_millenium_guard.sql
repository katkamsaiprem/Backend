ALTER TABLE "users" RENAME COLUMN "name" TO "username";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "bio" TO "is_email_verified";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "Image" TO "image";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "imageArr" TO "image_arr";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "numberOfBathrooms" TO "number_of_bathrooms";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "numberOfguest" TO "number_ofguest";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "numberOfBedrooms" TO "number_of_bedrooms";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "numberOfStudies" TO "number_of_studies";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "hostName" TO "host_name";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "healthAndSafety" TO "health_and_safety";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "houseRules" TO "house_rules";--> statement-breakpoint
ALTER TABLE "properties" RENAME COLUMN "propertyType" TO "property_type";--> statement-breakpoint
DROP INDEX "idx_propertyType";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "refresh_token_hash" text;--> statement-breakpoint
CREATE INDEX "idx_propertyType" ON "properties" USING btree ("property_type");