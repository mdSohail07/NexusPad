import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthDivider, GoogleButton } from "@/components/auth/google-button";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Start writing with your team in a few seconds."
    >
      <div className="flex flex-col gap-3.5">
        <GoogleButton label="Sign up with Google" />
        <AuthDivider />
        <RegisterForm />
      </div>
    </AuthCard>
  );
}
