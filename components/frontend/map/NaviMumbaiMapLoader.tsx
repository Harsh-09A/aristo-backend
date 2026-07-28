
"use client";

import dynamic from "next/dynamic";

// ssr: false zaroori hai — isse Next.js is component ko
// server pe bilkul evaluate hi nahi karega, sirf browser mein.
const NaviMumbaiMap = dynamic(() => import("./NaviMumbaiMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "12px",
        background: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Loading map...
    </div>
  ),
});

export default NaviMumbaiMap;