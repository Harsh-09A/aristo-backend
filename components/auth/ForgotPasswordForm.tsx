// components/ForgotPasswordForm.tsx
"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import styles from "./LoginForm.module.css"; // reusing the same styles as LoginForm

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    // Fake delay to simulate an API call sending the reset email.
    // Replace this with a real fetch() call to your backend later.
    setTimeout(() => {
      setLoading(false);
      setMessage(`A password reset link has been sent to ${email}`);
      setEmail("");
    }, 1200);
  }

  return (
    <div>
      <div className={`${styles.header} fade-in`}>
        <div className={styles.iconCircle}>
          <i className="fa-solid fa-key"></i>
        </div>
        <h2>Reset Password</h2>
        <p>Enter your email and we&apos;ll send you a reset link</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <div className={styles.inputGroup}>
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i> Sending...
            </>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane"></i> Send Reset Link
            </>
          )}
        </button>
      </form>

      {message && (
        <div className="alert alert-info mt-3 fade-in" role="alert">
          {message}
        </div>
      )}

      <p className={styles.footerText}>
        Remembered your password? <Link href="/login">Back to Login</Link>
      </p>
    </div>
  );
}
