/**
 * This module sets up the environment configuration using the `@t3-oss/env-nextjs` package
 * and validates environment variables using the `zod` library.
 */

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        /**
         * Database host address.
         * Must be a non-empty string.
         */
        DB_HOST: z.string().min(1),

        /**
         * Database port number.
         * Must be a non-empty string.
         */
        DB_PORT: z.string().min(1),

        /**
         * Database name.
         * Must be a non-empty string.
         */
        DB_NAME: z.string().min(1),

        /**
         * Database user name.
         * Must be a non-empty string.
         */
        DB_USER: z.string().min(1),

        /**
         * Database user password.
         * Must be a non-empty string.
         */
        DB_PASSWORD: z.string().min(1),
        /**
         * Clerk secret key for server-side operations.
         * Must be a non-empty string.
         */
        CLERK_SECRET_KEY: z.string().min(1),
        /**
         * Clerk webhook secret for verifying incoming webhooks.
         * Must be a non-empty string.
         */
        CLERK_WEBHOOK_SECRET: z.string().min(1),
    },

    /**
     * Creates the final schema for the environment configuration.
     * Constructs a `DATABASE_URL` from individual database connection parameters.
     * @param env - The environment variables object.
     * @returns A transformed object with `DATABASE_URL` added.
     */
    createFinalSchema: (env) => {
        return z.object(env).transform((val) => {
            const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, ...rest } =
                val;
            return {
                ...rest,
                DATABASE_URL: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
            };
        });
    },

    /**
     * Treat empty strings as undefined values.
     */
    emptyStringAsUndefined: true,

    /**
     * Experimental feature to use the runtime environment variables.
     */
    experimental__runtimeEnv: process.env,
});
