import { auth } from "@/auth";

export default auth((req) => {
  const loginpage = new URL("/auth", req.nextUrl.origin);

  if (!req.auth && !req.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(loginpage);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
