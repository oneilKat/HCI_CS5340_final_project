import { pgTable, text, timestamp, boolean, varchar, serial, integer } from "drizzle-orm/pg-core";
import users from "./users";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
  status: boolean("task_status").notNull().default(false),
  priority: integer("task_priority").notNull().default(1),
  managerEmail: varchar("manager_email")
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
  employeeEmail: varchar("employee_email")
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
  xp: integer("xp")
});

export default tasks;
