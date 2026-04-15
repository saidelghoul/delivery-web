import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const OTPForm = () => {
  const { verifyOTP, loading, error, clearError } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const userId = sessionStorage.getItem("pending_verification_userId") || "";
  const email = sessionStorage.getItem("pending_verification_email") || "";

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    clearError();
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last char
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted) {
      const newOtp = Array(6).fill("");
      pasted.split("").forEach((ch, i) => {
        newOtp[i] = ch;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;
    await verifyOTP({ userId, code });
  };

  const maskedEmail = email
    ? email.replace(/^(.{2}).*(@.*)$/, "$1****$2")
    : "your email";

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
    >
      <div
        style={{
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
          borderRadius: "12px",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "22px" }}>📬</span>
        <p style={{ fontSize: "13px", color: "#1E40AF", lineHeight: "1.5" }}>
          We sent a 6-digit code to <strong>{maskedEmail}</strong>. It expires
          in 15 minutes.
        </p>
      </div>

      {error && <div className="auth-error">⚠️ {error}</div>}

      <div>
        <label
          className="auth-label"
          style={{
            textAlign: "center",
            display: "block",
            marginBottom: "14px",
          }}
        >
          Enter verification code
        </label>
        <div className="otp-grid" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              className={`otp-box ${digit ? "filled" : ""}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
            />
          ))}
        </div>
      </div>

      <button
        className="auth-btn"
        type="submit"
        disabled={loading || otp.join("").length !== 6}
      >
        {loading ? (
          <>
            <span className="spinner" />
            Verifying...
          </>
        ) : (
          "Verify account"
        )}
      </button>

      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "8px" }}>
          Didn't receive the code?
        </p>
        <Link to="/register" className="auth-link">
          Try registering again
        </Link>
      </div>
    </form>
  );
};
