import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schemaHelpers";
import { relations } from "drizzle-orm";
import { OrganizationUserSettingsTable } from "@/drizzle/schema/organizationUserSettings";
import { UserNotificationSettingsTable } from "@/drizzle/schema/userNotificationSettings";
import { UserResumeTable } from "@/drizzle/schema/userResume";

export const UserTable = pgTable("users", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  imageUrl: varchar().notNull(),
  createdAt,
  updatedAt,
});

export const userRelations = relations(UserTable, ({ one, many }) => ({
  notificationSettings: one(UserNotificationSettingsTable),
  resume: one(UserResumeTable),
  organizationUserSettings: many(OrganizationUserSettingsTable),
}));
