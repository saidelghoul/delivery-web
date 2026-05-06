// src/pages/ForgotPasswordPage.tsx
import { AuthLayout } from "../../features/auth/components/AuthLayout";
import { ForgotPasswordForm } from "../../features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="No worries — we'll send you a reset code right away."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}