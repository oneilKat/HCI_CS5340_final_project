import { pgTable, uuid } from "drizzle-orm/pg-core";
import users from "./users";
import tasks from "./tasks";

export const taskAssignments = pgTable("task_assignments", {
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  }, (table) => ({
    pk: [table.taskId, table.userId],
  }));

  export default taskAssignments;