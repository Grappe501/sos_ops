import LoginForm from "../../../components/LoginForm";
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="container" style={{maxWidth:520}}>
      <div className="card">
        <h1 style={{marginTop:0}}>Staff Login</h1>
        <p className="muted">Use your configured email and password.</p>
        <LoginForm />
      </div>
      <p className="muted" style={{fontSize:12, marginTop:12}}>
        Module 0 auth is env-backed for speed. DB-backed users arrive in Module 1.
      </p>
    </main>
  );
}
