'use client';
import { ClerkProvider as OriginalClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { dark } from '@clerk/themes';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';
/**
 * ClerkProvider
 *
 * This component wraps the ClerkProvider from @clerk/nextjs and applies a dark theme
 * if the user's device is set to prefer a dark color scheme.
 *
 * How it works:
 *
 * 1. It uses the useIsDarkMode hook to determine if the user prefers a dark color scheme.
 * 2. If the user prefers dark mode, it applies the dark theme to the ClerkProvider.
 * 3. Otherwise, it uses the default appearance.
 */
const ClerkProvider = ({ children }: { children: ReactNode }) => {
    const isDarkMode = useIsDarkMode();
    return (
        <OriginalClerkProvider
            appearance={isDarkMode ? { baseTheme: [dark] } : undefined}
        >
            {children}
        </OriginalClerkProvider>
    );
};

export default ClerkProvider;
