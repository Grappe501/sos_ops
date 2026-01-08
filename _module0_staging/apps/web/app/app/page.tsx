import { audit } from "../lib/audit";
export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  async function createSampleAudit() {
    "use server";
    await audit({
      action: "sample.write",
      entityType: "system",
      entityId: "module_0",
      after: { hello: "world" },
      before: null,
      source: "ui"
    });
  }

  return (
    <main className="container">
      <div className="card">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:12}}>
          <div>
            <h1 style={{margin:"0 0 6px 0"}}>Dashboard</h1>
            <p className="muted" style={{margin:0}}>
              You are authenticated. Module 0 provides shell, auth, RBAC rails, and audit logging.
            </p>
          </div>
          <form action={createSampleAudit}>
            <button className="btn" type="submit">Create sample audit event</button>
          </form>
        </div>
      </div>

      <div style={{height:16}} />

      <div className="card">
        <h2 style={{marginTop:0}}>Next Modules</h2>
        <ol className="muted" style={{marginTop:8}}>
          <li>Module 1 — Database core (tables + views + migrations)</li>
          <li>Module 2 — Import center</li>
          <li>Module 3 — Volunteer CRM</li>
          <li>Module 4 — Messaging</li>
        </ol>
      </div>
    </main>
  );
}
