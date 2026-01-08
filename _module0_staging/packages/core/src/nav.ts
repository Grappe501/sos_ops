export type NavItem = { href: string; label: string; description?: string };

export const navItems: NavItem[] = [
  { href: "/app", label: "Home", description: "Dashboard overview" },
  { href: "/app/admin", label: "Admin", description: "Audit tail and system status" }
];
