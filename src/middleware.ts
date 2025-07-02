import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 *
 * This file contains a single middleware function for Next.js that
 * integrates authentication from Clerk.
 *
 * The middleware is built on top of the `clerkMiddleware` function from
 * `@clerk/nextjs/server`, which is a wrapper around the `withApiAuth` function
 * from `@clerk/nextjs/api`.
 *
 * `clerkMiddleware` takes an async function that is called with the `auth`
 * object and the `req` object as arguments. Inside the function, you can call
 * `auth.protect()` to protect the route. If the user is not authenticated,
 * Clerk will redirect them to the sign-in page. If the route is public, you
 * can simply return without calling `auth.protect()`.
 *
 * The `config` object specifies the routes that should be protected by the
 * middleware. The `matcher` property is an array of strings that are used to
 * match routes. The strings are either exact matches or regex patterns.
 */

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
