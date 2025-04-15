CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"due_date" timestamp with time zone NOT NULL,
	"task_status" boolean DEFAULT false NOT NULL,
	"task_priority" integer DEFAULT 1 NOT NULL,
	"manager_email" varchar NOT NULL,
	"employee_email" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_manager_email_user_email_fk" FOREIGN KEY ("manager_email") REFERENCES "public"."user"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_employee_email_user_email_fk" FOREIGN KEY ("employee_email") REFERENCES "public"."user"("email") ON DELETE cascade ON UPDATE no action;