CREATE TABLE "invitations" (
	"id" text PRIMARY KEY,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"token" text NOT NULL UNIQUE,
	"status" text DEFAULT 'pending' NOT NULL,
	"invited_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used_at" timestamp,
	"user_id" text
);
--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_invited_by_user_id_fkey" FOREIGN KEY ("invited_by") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");