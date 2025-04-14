import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import users from "./users";

export const achievements = pgTable("achievements", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title").notNull(),
    icon: varchar("icon").notNull().default("trophy"),
    description: varchar("description").notNull(),
    userEmail: varchar("user_email")
      .notNull()
      .references(() => users.email, { onDelete: "cascade" }),
  });
  
  export default achievements;