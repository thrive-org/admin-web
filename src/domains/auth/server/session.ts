import {
  getServerSession,
  User,
} from "next-auth";
import { authOptions } from "./nextauth/options";
import { NextRequest } from "next/server";
import { HttpError } from "@/utils/httpError";
import { getToken as getTokenNextAuth, JWT } from "next-auth/jwt";

export const getCurrentUser = async (): Promise<User | null> => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  return session.user;
};

export const getToken = async (req: NextRequest): Promise<JWT> => {
  const token = await getTokenNextAuth({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    throw HttpError.unauthorized("Token not found", {
      code: "TOKEN_NOT_FOUND",
    });
  }
  return token;
};
