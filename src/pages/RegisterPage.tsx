// src/pages/RegisterPage.tsx
import { AuthLayout } from "../features/auth/components/AuthLayout";
import { RegisterForm } from "../features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join SwiftDeliver and start managing deliveries today."
    >
      <RegisterForm />
    </AuthLayout>
  );
}