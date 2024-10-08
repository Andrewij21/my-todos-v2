// export {auth as middleware} from "@/auth"
import { auth } from "@/auth"
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const {nextUrl} = req
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const res = NextResponse.next();

  res.headers.append('ACCESS-CONTROL-ALLOW-ORIGIN','*')
  if(isApiAuthRoute) return undefined;
  if(isAuthRoute){
      if(isLoggedIn) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl));
      return undefined
  }
  if(!isLoggedIn && !isPublicRoute) return NextResponse.redirect(new URL("/auth/signin",nextUrl));
  return undefined;
})
export const config = {
    matcher: [ 
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',],
  }