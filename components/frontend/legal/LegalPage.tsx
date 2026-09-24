// components/legal/LegalPage.tsx
// Shared layout for Terms & Privacy pages (Server Component - no "use client" needed).
// It only handles the title, "last updated" line and the centered Bootstrap container.

import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode; // the actual policy text goes here
};

export default function LegalPage({
  title,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="mb-2">{title}</h1>
            <p className="text-muted mb-4">Last updated: {lastUpdated}</p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
