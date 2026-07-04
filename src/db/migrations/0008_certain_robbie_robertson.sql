ALTER TABLE "whishlist" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "whishlist" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;