import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { JobListingTable } from "@/drizzle/schema/jobListing";
import { UserTable } from "@/drizzle/schema/user";
import { createdAt, updatedAt } from "@/drizzle/schemaHelpers";
import { relations } from "drizzle-orm";

export const applicationStages = [
  "denied",
  "applied",
  "interested",
  "interviewed",
  "hired",
] as const;
export type ApplicationStage = (typeof applicationStages)[number];
export const applicationStageEnum = pgEnum(
  "job_listing_applications_stage",
  applicationStages
);

export const JobListingApplicationTable = pgTable(
  "job_listing_applications",
  {
    jobListingId: uuid()
      .references(() => JobListingTable.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar()
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    coverLetter: text(),
    rating: integer(),
    stage: applicationStageEnum().notNull().default("applied"),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.jobListingId, table.userId] })]
);

export const jobListingApplicationRelations = relations(
  JobListingApplicationTable,
  ({ one }) => ({
    jobListing: one(JobListingTable, {
      fields: [JobListingApplicationTable.jobListingId],
      references: [JobListingTable.id],
    }),
    user: one(UserTable, {
      fields: [JobListingApplicationTable.userId],
      references: [UserTable.id],
    }),
  })
);
