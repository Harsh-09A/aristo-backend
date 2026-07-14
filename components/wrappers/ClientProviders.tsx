"use client";

import { useEffect, ReactNode } from "react";
import AOS from "aos";

type Props = {
  children: ReactNode;
};

export default function ClientProviders({ children }: Props) {
  useEffect(() => {
    // Load Bootstrap JS safely in browser
    import("bootstrap");

    // Initialize AOS animation
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return <>{children}</>;
}
