import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    quietDeps: true, // This will silence deprecation warnings
    silenceDeprecations: [
      "legacy-js-api",
      "import",
      "slash-div",
      "global-builtin",
    ],
  },
  images: {
    qualities: [75, 100], // Explicitly allow these values
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.0.101"],
};

export default nextConfig;
