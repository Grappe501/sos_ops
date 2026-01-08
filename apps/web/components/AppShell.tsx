import type { ReactNode } from "react";
import Link from "next/link";
import { navItems } from "@sos-ops/core/nav";
import type { Session } from "../lib/auth";

export function AppShell({ children, session }: { children: ReactNode; session: Session }) {
  return (
    <div style={{display:"grid", gridTemplateColumns:"260px 1fr", minHeight:"100vh"}}>
      <aside style={{padding:16, borderRight:"1px solid rgba(0,0,0,.08)", background:"#fff"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:12}}>
          <div>
            <div style={{fontWeight:800}}>SOS OPS</div>
            <div className="muted" style={{fontSize:12}}>Module 0</div>
          </div>
          <span className="badge">{session.role}</span>
        </div>

        <div style={{height:16}} />
        <nav className="nav">
          {navItems.map((item) => (
            <Link key={item.href} className="card" style={{padding:10}} href={item.href}>
              <div style={{fontWeight:700}}>{item.label}</div>
              {item.description ? <div className="muted" style={{fontSize:12}}>{item.description}</div> : null}
            </Link>
          ))}
        </nav>

        <div style={{height:16}} />
        <Link className="btn secondary" href="/logout">Logout</Link>
      </aside>

      <div>
        <header style={{padding:16, borderBottom:"1px solid rgba(0,0,0,.08)", background:"#fff"}}>
          <div className="container" style={{padding:0, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <div className="muted">Kelly Grappe — Arkansas SOS Ops</div>
            <div className="muted" style={{fontSize:12}}>Logged in as {session.email}</div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
