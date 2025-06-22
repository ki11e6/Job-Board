import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schemaHelpers";
import { relations } from "drizzle-orm";
import { JobListingTable } from "@/drizzle/schema/jobListing";
import { OrganizationUserSettingsTable } from "@/drizzle/schema/organizationUserSettings";

export const OrganizationTable = pgTable("user", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  imageUrl: varchar(),
  createdAt,
  updatedAt,
});

export const organizationRelations = relations(
  OrganizationTable,
  ({ many }) => ({
    jobListings: many(JobListingTable),
    organizationUserSettings: many(OrganizationUserSettingsTable),
  })
);
