CREATE TYPE "public"."user_role" AS ENUM('user', 'admin', 'moderater');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "issued_refresh_token_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'user' NOT NULL;