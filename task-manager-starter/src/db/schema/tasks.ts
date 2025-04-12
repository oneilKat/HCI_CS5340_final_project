import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import users from "./users";

export const taskStatusEnum = pgEnum("task_status", ["pending", "in_progress", "completed"]);
export const taskPriorityEnum = pgEnum("task_priority", ["low", "medium", "high"]);

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
  status: taskStatusEnum("task_status").notNull().default("pending"),
  priority: taskPriorityEnum("task_priority").notNull().default("medium"),
  managerEmail: uuid("manager_email")
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
});

export default tasks;
