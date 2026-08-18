"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: Errors = {};
    if (!name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      nextErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    }
    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  return (
    <div className="flex min-h-svh flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8">
        <div className="mb-6 text-center">
          <h1 className="text-lg font-semibold text-foreground">UniErp</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            errorMessage={errors.name}
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            errorMessage={errors.email}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            errorMessage={errors.password}
            required
          />
          <Input
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            errorMessage={errors.confirmPassword}
            required
          />

          <Button variant="primary" type="submit" className="w-full">
            Sign up
          </Button>

          {submitted && (
            <p className="text-center text-sm text-muted-foreground">
              This form isn&apos;t connected to a backend yet.
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
