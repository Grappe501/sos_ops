import type { ReactNode } from "react";
import { requireSession } from "../lib/auth";
import { AppShell } from "../../components/AppShell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await requireSession();
  return <AppShell session={session}>{children}</AppShell>;
}
