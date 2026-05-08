// src/pages/ResetPasswordPage.tsx
import { AuthLayout } from '../../features/auth/components/AuthLayout';
import { ResetPasswordForm } from '../../features/auth/components/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the code from your email and choose a new password."
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
