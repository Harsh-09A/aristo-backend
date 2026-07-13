// app/login/page.tsx
// Route: "/login"
// This page stays a server component (no "use client" needed here) -
// it just renders AuthLayout and puts LoginForm inside it.
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
