import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  avatar: varchar("image", { length: 2048 }).notNull(),
  level: integer("level").notNull().default(1),
  role: varchar("role", { length: 50 }).notNull().default("employee"),
  xp: integer("xp").notNull().default(0),
});

export default users;
