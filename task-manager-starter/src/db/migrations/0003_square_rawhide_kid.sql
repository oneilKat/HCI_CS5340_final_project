CREATE TABLE "achievements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"icon" varchar DEFAULT 'trophy' NOT NULL,
	"description" varchar NOT NULL,
	"user_email" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_user_email_user_email_fk" FOREIGN KEY ("user_email") REFERENCES "public"."user"("email") ON DELETE cascade ON UPDATE no action;