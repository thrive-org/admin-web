import { RoleType } from '@/constants/role';
import { ALLOWED_ROLES } from './auth.types';
export const isAllowedRole = (role?: string) => !!role && ALLOWED_ROLES.has(role as RoleType);
