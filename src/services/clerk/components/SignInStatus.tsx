
import { SignedOut as ClerkSignedOut, SignedIn as ClerkSignedIn } from "@clerk/nextjs";
import { ReactNode, Suspense } from "react";
export const SignedOut = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense>
            <ClerkSignedOut>
                {children}
            </ClerkSignedOut>
        </Suspense>
    )
}

export const SignIn = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense>
            <ClerkSignedIn>
                {children}
            </ClerkSignedIn>
        </Suspense>)
}

