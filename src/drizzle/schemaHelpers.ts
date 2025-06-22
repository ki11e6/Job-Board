import { timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Creates a column for the created at timestamp.
 * The column will be a timestamp with timezone, not null, and default to the current timestamp.
 * @returns A column definition for a created at timestamp.
 */
export const createdAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow();

/**
 * Creates a column for the updated at timestamp.
 * The column will be a timestamp with timezone, not null, and default to the current timestamp.
 * When the row is updated, the column will be updated to the current timestamp.
 * @returns A column definition for an updated at timestamp.
 */
export const updatedAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const id = uuid().primaryKey().defaultRandom();
