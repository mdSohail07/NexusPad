"use server";

import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { signIn, signOut } from "@/auth";

export type AuthFormState = {
  error: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(formData: FormData, key: string, trim = true) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return "";
  }
  return trim ? value.trim() : value;
}

export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = readString(formData, "email").toLowerCase();
  const password = readString(formData, "password", false);

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }

    throw error;
  }

  return { error: "" };
}

export async function register(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const name = readString(formData, "name");
  const email = readString(formData, "email").toLowerCase();
  const password = readString(formData, "password", false);
  const confirmPassword = readString(formData, "confirmPassword", false);

  if (name.length < 2) {
    return { error: "Please enter your name." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "An account with this email already exists." };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
    },
  });

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Account created, but sign-in failed. Please try logging in.",
      };
    }

    throw error;
  }

  return { error: "" };
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}
