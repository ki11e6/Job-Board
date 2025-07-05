import { env } from '@/data/env/server';
import { inngest } from '../client';
import { Webhook } from 'svix';
import { NonRetriableError } from 'inngest';

function varifyWebhook({
    raw,
    headers,
}: {
    raw: string;
    headers: Record<string, string>;
}) {
    return new Webhook(env.CLERK_WEBHOOK_SECRET).verify(raw, headers);
}

export const clerkCreateUser = inngest.createFunction(
    {
        id: 'clerk/create-db-user',
        name: 'Clerk - Create DB User',
    },
    {
        event: 'clerk/user.created',
    },
    async ({ event, step }) => {
        await step.run('varify webhook', async () => {
            try {
                varifyWebhook(event.data);
            } catch (error) {
                throw new NonRetriableError('Invalid webhook', error as Error);
            }
        })
    }
);
