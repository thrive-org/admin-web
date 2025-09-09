import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import { isAllowedRole } from "@/lib/rbac";
import { PUBLIC_ROUTES, URLS } from "./constants/page";

type TokenValidationResult =
  | {
      success: true;
      data: JWT;
    }
  | {
      success: false;
      error:
        | "NOT_VALID_TOKEN"
        | "INVALID_ROLE"
        | "USER_NOT_FOUND"
        | "INVALID_ACCOUNT_ROLE";
      callbackUrl: string;
    };


const isTokenValid = async (
  req: NextRequest
): Promise<TokenValidationResult> => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return { success: false, error: "NOT_VALID_TOKEN", callbackUrl: "/login" };
  }

  if (!isAllowedRole(token.roleName)) {
    return { success: false, error: "INVALID_ROLE", callbackUrl: "/forbidden" };
  }

  return { success: true, data: token };
};

const isPublicRoute = (pathname: string) => {
  return PUBLIC_ROUTES.includes(pathname as (typeof PUBLIC_ROUTES)[number]);
};

export async function middleware(req: NextRequest) {
  console.log("middleware", req.nextUrl.pathname);  
  const result = await isTokenValid(req);

  console.log("result", result);
  const isPublic = isPublicRoute(req.nextUrl.pathname);

  if (isPublic && result.success) {
    const adminDashboardUrl = new URL(URLS.DASHBOARD, req.url);
    return NextResponse.redirect(adminDashboardUrl);
  }

  if (!isPublic && !result.success) {
    const url = new URL(result.callbackUrl || "/login", req.url);
    url.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/data|_next|.*\\..*).*)',
  ],
};
