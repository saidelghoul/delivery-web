import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ForgotPasswordForm = () => {
  const { forgotPassword, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await forgotPassword({ email });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div
        style={{
          background: "#FFF7ED",
          border: "1px solid #FED7AA",
          borderRadius: "12px",
          padding: "14px 16px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "20px", marginTop: "1px" }}>🔐</span>
        <p style={{ fontSize: "13px", color: "#92400E", lineHeight: "1.6" }}>
          Enter the email linked to your account. We'll send you a one-time code
          to reset your password.
        </p>
      </div>

      {error && <div className="auth-error">⚠️ {error}</div>}

      <div>
        <label className="auth-label">Email address</label>
        <input
          className="auth-input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
          required
          autoComplete="email"
        />
      </div>

      <button className="auth-btn" type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" />
            Sending code...
          </>
        ) : (
          "Send reset code"
        )}
      </button>

      <p style={{ textAlign: "center", fontSize: "14px", color: "#64748B" }}>
        Remembered it?{" "}
        <Link to="/login" className="auth-link">
          Back to login
        </Link>
      </p>
    </form>
  );
};
