// components/LoginForm.tsx
"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  // formData holds both the email and password in one object
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // Controls whether the password is shown as text or dots
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Message shown to the user after they submit (success or error)
  const [message, setMessage] = useState<string>("");

  // Simple loading state so the button can show a spinner
  const [loading, setLoading] = useState<boolean>(false);

  // One function handles changes for BOTH inputs, using the input's "name"
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the page from refreshing

    // Basic validation - just checking nothing is empty
    if (!formData.email || !formData.password) {
      setMessage("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    setMessage("");

    const email = formData.email;
    const password = formData.password;

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div>
      {/* Small heading with an icon */}
      <div className={`${styles.header} fade-in`}>
        <div className={styles.iconCircle}>
          <i className="fa-solid fa-right-to-bracket"></i>
        </div>
        <h2>Welcome Back</h2>
        <p>Login to manage your properties &amp; saved listings</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Email field with an icon inside the input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <div className={styles.inputGroup}>
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Password field with a show/hide eye icon */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className={styles.inputGroup}>
            <i className="fa-solid fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </button>
          </div>
        </div>

        {/* Forgot password link */}
        <div className={styles.forgotRow}>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>

        {/* Submit button - shows a spinner while "loading" */}
        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i> Logging in...
            </>
          ) : (
            <>
              <i className="fa-solid fa-right-to-bracket"></i> Login
            </>
          )}
        </button>
      </form>

      {/* Message shown after submit */}
      {message && (
        <div className={`alert alert-info mt-3 fade-in`} role="alert">
          {message}
        </div>
      )}

      <p className={styles.footerText}>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
}
