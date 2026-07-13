// components/SignupForm.tsx
"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import styles from "./LoginForm.module.css"; // reusing the same styles as LoginForm
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// Shape of our signup form data - kept simple and beginner-friendly
type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
    const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // One function handles changes for ALL text inputs, using the input's "name"
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");

    // Basic validation - simple checks, easy to follow
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);

    const email = formData.email;
    const password = formData.password;
    const name = formData.name;

    const { error } = await authClient.signUp.email({
      name,
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
      <div className={`${styles.header} fade-in`}>
        <div className={styles.iconCircle}>
          <i className="fa-solid fa-user-plus"></i>
        </div>
        <h2>Create Account</h2>
        <p>Sign up to start listing &amp; saving properties</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Full name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full name
          </label>
          <div className={styles.inputGroup}>
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
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

        {/* Password */}
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
              placeholder="At least 6 characters"
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

        {/* Confirm password */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm password
          </label>
          <div className={styles.inputGroup}>
            <i className="fa-solid fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Terms checkbox */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <label
            className="form-check-label"
            htmlFor="agreeTerms"
            style={{ fontSize: "0.85rem" }}
          >
            I agree to the Terms &amp; Conditions
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div
            className="alert alert-danger py-2 fade-in"
            role="alert"
            style={{ fontSize: "0.85rem" }}
          >
            <i className="fa-solid fa-circle-exclamation me-1"></i>
            {error}
          </div>
        )}

        {/* Submit button */}
        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i> Creating
              account...
            </>
          ) : (
            <>
              <i className="fa-solid fa-user-plus"></i> Sign Up
            </>
          )}
        </button>
      </form>

      {/* Success message */}
      {message && (
        <div className="alert alert-success mt-3 fade-in" role="alert">
          <i className="fa-solid fa-circle-check me-1"></i>
          {message}
        </div>
      )}

      <p className={styles.footerText}>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
