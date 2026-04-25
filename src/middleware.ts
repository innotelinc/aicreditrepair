import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/upload(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html|css|js(?!on)|pls|avif|jpg|jpeg|gif|png|svg|ico|webp)).*)',
    '/(api|trpc)(.*)',
  ],
};
