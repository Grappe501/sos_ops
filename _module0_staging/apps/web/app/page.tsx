export default function HomePage() {
  return (
    <main className="container">
      <div className="card">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:12}}>
          <div>
            <h1 style={{margin:"0 0 6px 0"}}>SOS OPS</h1>
            <p className="muted" style={{margin:0}}>
              Foundation scaffold is live. Use the dashboard to operate campaign programs.
            </p>
          </div>
          <a className="btn" href="/login">Staff Login</a>
        </div>
      </div>
    </main>
  );
}
