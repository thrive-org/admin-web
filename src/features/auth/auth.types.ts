import { RoleType } from "@/constants/role";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  image: string | null;
  roleName: RoleType;
  accountId: string;
};
