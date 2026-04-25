import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/upload(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    try {
      await auth.protect();
    } catch (e) {
      console.error('Clerk auth protect failed:', e);
      throw e;
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html|css|js(?!on)|pls|avif|jpg|jpeg|gif|png|svg|ico|webp)).*)',
    '/(api|trpc)(.*)',
  ],
};
