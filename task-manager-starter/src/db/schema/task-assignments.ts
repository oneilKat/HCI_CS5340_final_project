import { pgTable, uuid } from "drizzle-orm/pg-core";
import users from "./users";
import tasks from "./tasks";

export const taskAssignments = pgTable("task_assignments", {
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    userEmail: uuid("user_email")
      .notNull()
      .references(() => users.email, { onDelete: "cascade" }),
  }, (table) => ({
    pk: [table.taskId, table.userEmail],
  }));

  export default taskAssignments;