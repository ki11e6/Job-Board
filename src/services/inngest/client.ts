/**
 * This file sets up an Inngest client with Clerk webhook event schemas.
 *
 * Clerk webhooks emit events when a user is created, updated, or deleted.
 * These events are received by the Inngest server and then handled by
 * functions defined in the `src/services/inngest/functions` directory.
 *
 * The `inngest` client is used to send and receive events. The `EventSchemas`
 * class is used to define the schema for each event type.
 *
 * The `Events` type maps each event type to its corresponding data type.
 * The `ClerkWebhookData` type represents the data payload of a Clerk webhook
 * event, which includes the raw event data and headers.
 */
import { DeletedObjectJSON, UserJSON } from "@clerk/nextjs/server";
import { EventSchemas, Inngest } from "inngest";

type ClerkWebhookData<T> = {
  data: {
    data: T;
    raw: string;
    headers: Record<string, string>;
  };
};

type Events = {
  "clerk/user.created": ClerkWebhookData<UserJSON>;
  "clerk/user.updated": ClerkWebhookData<UserJSON>;
  "clerk/user.deleted": ClerkWebhookData<DeletedObjectJSON>;
};

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "Job-Board",
  schemas: new EventSchemas().fromRecord<Events>(),
});
