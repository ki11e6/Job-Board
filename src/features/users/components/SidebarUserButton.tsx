import { auth } from '@clerk/nextjs/server';
import { SidebarUserButtonClient } from './_SidebarUserButtonClient';
import { Suspense } from 'react';

export function SidebarUserButton() {
    return (
        <Suspense>
            <SidebarUserSuspense />
        </Suspense>
    );
}

async function SidebarUserSuspense() {
    const { userId } = await auth();

    return (
        <SidebarUserButtonClient
            user={{
                email: 'sharath@gmail.com',
                name: 'Sharath S',
                imageUrl: '',
            }}
        />
    );
}
