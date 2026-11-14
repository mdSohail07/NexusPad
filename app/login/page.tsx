import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthDivider, GoogleButton } from "@/components/auth/google-button";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to your documents."
    >
      <div className="flex flex-col gap-3.5">
        <GoogleButton />
        <AuthDivider />
        <LoginForm />
      </div>
    </AuthCard>
  );
}
