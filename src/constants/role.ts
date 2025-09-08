export const Roles = Object.freeze({
  MEDICAL_EXAMINER: 'medical_examiner',
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  STAFF: 'staff',
  CLAIMANT: 'claimant',
  ORGANIZATION_MANAGER: 'organization-manager',
} as const);

export type RoleType = (typeof Roles)[keyof typeof Roles];

export const ALLOWED_ROLES = new Set<RoleType>([
  Roles.SUPER_ADMIN,
  Roles.ADMIN,
  Roles.STAFF,
]);

