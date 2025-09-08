import { User, Account, Role } from "@prisma/client";
import { RoleType } from '../../../constants/role';

type UserWithAccounts = User & { accounts: Array<Account & { role: Role }> };

export type AuthDtoType = {
  id: string;
  email: string;
  name: string;
  image: string | null;
  roleName: RoleType;
  accountId: string;
};

export class AuthDto {
  static toAuthUser(u: UserWithAccounts): AuthDtoType | null {
    const primary = u.accounts[0] ?? null;
    const roleName = (primary?.role?.name as RoleType | undefined) ?? undefined;
    if (!roleName) return null;
    return {
      id: u.id,
      email: u.email,
      name: `${u.firstName} ${u.lastName}`.trim(),
      image: null,
      roleName,
      accountId: primary?.id ?? "",
    };
  }
}
