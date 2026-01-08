import { readAuditTail } from "../../lib/audit";
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const tail = await readAuditTail(50);
  return (
    <main className="container">
      <div className="card">
        <h1 style={{marginTop:0}}>Admin</h1>
        <p className="muted">Module 0 shows file-based audit tail (latest events).</p>
      </div>

      <div style={{height:16}} />

      <div className="card" style={{overflow:"auto"}}>
        <h2 style={{marginTop:0}}>Audit Tail</h2>
        <pre style={{whiteSpace:"pre-wrap", margin:0, fontSize:12}}>
{tail.length ? tail.join("\n") : "No audit events yet."}
        </pre>
      </div>
    </main>
  );
}
