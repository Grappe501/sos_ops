export type Role = "admin" | "staff" | "organizer" | "volunteer" | "read_only";

/**
 * Module 0 RBAC is intentionally minimal:
 * - Single env-backed staff login treated as admin.
 * - Module 1 introduces DB-backed roles and scoping.
 */
export function getRoleForEmail(_email: string): Role {
  return "admin";
}
