// src/pages/VerifyOTPPage.tsx
import { AuthLayout } from "../features/auth/components/AuthLayout";
import { OTPForm } from "../features/auth/components/OTPForm";

export default function VerifyOTPPage() {
  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We need to confirm your identity before activating your account."
    >
      <OTPForm />
    </AuthLayout>
  );
}