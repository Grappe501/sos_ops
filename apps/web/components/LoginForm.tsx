"use client";

import { useState } from "react";
import { login } from "../lib/auth-actions";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        try {
          await login(formData);
        } catch (e: any) {
          setError(e?.message ?? "Login failed");
        }
      }}
      style={{display:"grid", gap:12}}
    >
      <label>
        <div style={{fontWeight:600, marginBottom:6}}>Email</div>
        <input className="input" name="email" type="email" required />
      </label>

      <label>
        <div style={{fontWeight:600, marginBottom:6}}>Password</div>
        <input className="input" name="password" type="password" required />
      </label>

      {error ? <div style={{color:"#b00020", fontSize:13}}>{error}</div> : null}
      <button className="btn" type="submit">Sign in</button>
    </form>
  );
}
