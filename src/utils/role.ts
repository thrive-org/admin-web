import { ALLOWED_ROLES } from "@/constants/role";
import { RoleType } from "@/constants/role";
import { Account, Role } from "@prisma/client";

export const isValidRole = (role: string): role is RoleType => {
  return ALLOWED_ROLES.has(role as RoleType) || false;
};

export const isValidAccountRole = (
  account: Array<Account & { role: Role }>
): boolean => {
  return account.some((account) => isValidRole(account.role.name));
};
