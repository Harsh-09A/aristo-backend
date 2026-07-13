"use client";

import { useEffect } from "react";

// Bootstrap's JavaScript (needed for dropdowns, alerts closing, etc.)
// only works in the browser, so we load it inside useEffect.
export default function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}
