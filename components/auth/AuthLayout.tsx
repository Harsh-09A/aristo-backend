// components/AuthLayout.tsx
//
// This is a "wrapper" component. Both the Login page and the
// Forgot Password page use this same layout so they look consistent:
// - Left side: a real estate photo with a headline (hidden on small screens)
// - Right side: whatever form is passed in as "children"
//
// Passing components as "children" like this is a common React pattern,
// it means AuthLayout doesn't need to know if it's showing a Login form
// or a Reset Password form - it just wraps whatever it's given.

import styles from "./AuthLayout.module.css";

// This is a simple TypeScript "type" - it just says:
// "children can be any valid React content (JSX)"
type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.wrapper}>
      {/* LEFT SIDE - hero image + branding text */}
      <div className={styles.heroSide}>
        <div className={styles.heroOverlay}></div>
        <div className={`${styles.heroContent} fade-in-up`}>
          <div className={styles.logo}>
            <i className="fa-solid fa-city"></i>
            <span>EstateHub</span>
          </div>
          <h1>Find your dream home with us</h1>
          <p>
            Browse thousands of verified listings, connect with trusted
            agents, and manage everything from one account.
          </p>

          {/* A few small feature bullets with icons - just for visual polish */}
          <ul className={styles.featureList}>
            <li>
              <i className="fa-solid fa-house-circle-check"></i> Verified
              property listings
            </li>
            <li>
              <i className="fa-solid fa-user-tie"></i> Trusted local agents
            </li>
            <li>
              <i className="fa-solid fa-shield-halved"></i> Secure &amp;
              private
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE - the form (Login or Forgot Password) gets rendered here */}
      <div className={styles.formSide}>
        <div className={`${styles.formCard} fade-in-up`}>{children}</div>
      </div>
    </div>
  );
}
