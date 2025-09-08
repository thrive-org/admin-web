import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { isValidRole } from "@/utils/role";

export class AuthService {
  /** Fetch user with most-recent account + role. Null if user missing OR no role. */
  async getUserWithRoleByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        accounts: {
          include: { role: true },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
    if (!user) return null;
    return user;
  }

  /** Verify password against stored hash. */
  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { password: true },
    });
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }

  // /** Admin-panel login: only SUPER_ADMIN | ADMIN | STAFF. */
  // async login(email: string, password: string) {
  //   const authUser = await this.getUserWithRoleByEmail(email);
  //   if (!authUser) return null;
  //   if (!isValidRole(authUser.accounts[0].role.name)) return null;

  //   const ok = await this.verifyPassword(email, password);
  //   if (!ok) return null;

  //   return authUser; // lean object; NextAuth serializes into its JWT
  // }

  /** Google sign-in: allow only pre-seeded allowed roles. No auto-creation. */
  async resolveGoogleUser(email: string) {
    const authUser = await this.getUserWithRoleByEmail(email);
    if (
      !authUser ||
      !authUser.accounts ||
      authUser.accounts.length === 0 ||
      !authUser.accounts[0].role ||
      !authUser.accounts[0].role.name
    )
      return null;
    if (!isValidRole(authUser.accounts[0].role.name)) return null;
    return authUser;
  }
}

const authService = new AuthService();

export default authService;
