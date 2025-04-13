ALTER TABLE "task_assignments" RENAME COLUMN "user_id" TO "user_email";--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "manager_id" TO "manager_email";--> statement-breakpoint
ALTER TABLE "task_assignments" DROP CONSTRAINT "task_assignments_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_manager_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "task_assignments" ADD CONSTRAINT "task_assignments_user_email_user_email_fk" FOREIGN KEY ("user_email") REFERENCES "public"."user"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_manager_email_user_email_fk" FOREIGN KEY ("manager_email") REFERENCES "public"."user"("email") ON DELETE cascade ON UPDATE no action;