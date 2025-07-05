/**
 * JobListingTable
 *
 * This table stores job listings.
 *
 * @property {string} id - The unique identifier for the job listing.
 * @property {string} organizationId - The id of the organization that posted the job listing.
 * @property {string} title - The title of the job listing.
 * @property {string} description - A description of the job listing.
 * @property {number} wage - The wage for the job listing.
 * @property {WageInterval} wageInterval - The interval at which the wage is paid.
 * @property {string} stateAbbreviation - The abbreviation for the state where the job is located.
 * @property {string} city - The city where the job is located.
 * @property {boolean} isFeatured - Whether the job listing is featured or not.
 * @property {ExperienceLevel} experienceLevel - The level of experience required for the job.
 * @property {JobListingStatus} status - The status of the job listing.
 * @property {JobListingType} type - The type of job listing.
 * @property {Date} postedAt - The date and time when the job listing was posted.
 * @property {Date} createdAt - The date and time when the job listing was created.
 * @property {Date} updatedAt - The date and time when the job listing was last updated.
 *
 * @ relations
 * @property {Organization} organization - The organization that posted the job listing.
 * @property {JobListingApplication[]} applications - The applications for the job listing.
 */

import {
    boolean,
    index,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '@/drizzle/schemaHelpers';
import { OrganizationTable } from '@/drizzle/schema/organization';
import { relations } from 'drizzle-orm';
import { JobListingApplicationTable } from './jobListingApplication';

// wageIntervalEnum
export const wageIntervals = ['hourly', 'yearly'] as const;
export type WageInterval = (typeof wageIntervals)[number];
export const wageIntervalEnum = pgEnum(
    'job_listings_wage_interval',
    wageIntervals
);

// locationRequirementEnum
export const locationRequirements = ['in-office', 'hybrid', 'remote'] as const;
export type LocationRequirement = (typeof locationRequirements)[number];
export const locationRequirementEnum = pgEnum(
    'job_listings_location_requirement',
    locationRequirements
);

// experienceLevelEnum
export const experienceLevels = ['junior', 'mid-level', 'senior'] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];
export const experienceLevelEnum = pgEnum(
    'job_listings_experience_level',
    experienceLevels
);

// jobListingStatusEnum
export const jobListingStatuses = ['draft', 'published', 'delisted'] as const;
export type JobListingStatus = (typeof jobListingStatuses)[number];
export const jobListingStatusEnum = pgEnum(
    'job_listings_status',
    jobListingStatuses
);

// jobListingTypeEnum
export const jobListingTypes = [
    'internship',
    'part-time',
    'full-time',
] as const;
export type JobListingType = (typeof jobListingTypes)[number];
export const jobListingTypeEnum = pgEnum('job_listings_type', jobListingTypes);

export const JobListingTable = pgTable(
    'job_listings',
    {
        id,
        organizationId: varchar()
            .references(() => OrganizationTable.id, { onDelete: 'cascade' })
            .notNull(),
        title: varchar().notNull(),
        description: text().notNull(),
        wage: integer(),
        wageInterval: wageIntervalEnum(),
        stateAbbreviation: varchar(),
        city: varchar(),
        isFeatured: boolean().notNull().default(false),
        experienceLevel: experienceLevelEnum().notNull(),
        status: jobListingStatusEnum().notNull().default('draft'),
        type: jobListingTypeEnum().notNull(),
        postedAt: timestamp({ withTimezone: true }),
        createdAt,
        updatedAt,
    },
    (table) => [index().on(table.stateAbbreviation)]
);

export const JobLIstingReferences = relations(
    JobListingTable,
    ({ one, many }) => ({
        organization: one(OrganizationTable, {
            fields: [JobListingTable.organizationId],
            references: [OrganizationTable.id],
        }),
        applications: many(JobListingApplicationTable),
    })
);
