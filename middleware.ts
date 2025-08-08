import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher(['/protected(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  
  // If user is signed in and trying to access root, redirect to analyzer
  if (userId && req.nextpathname === '/') {
    return NextResponse.redirect(new URL('/protected/analyzer', req.url))
  }
  
  // If user is not signed in and trying to access protected routes, redirect to landing
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|api/webhooks).*)",
  ],
}