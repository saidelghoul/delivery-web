// src/pages/LoginPage.tsx
import { AuthLayout } from "../features/auth/components/AuthLayout";
import { LoginForm } from "../features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your SwiftDeliver account to continue."
    >
      <LoginForm />
    </AuthLayout>
  );
}