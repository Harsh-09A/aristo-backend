// A very simple security check for our internal API routes (like the upload route).
// The idea: our own frontend sends a custom header with a secret key.
// If the header is missing or wrong, we reject the request.
//
// This is NOT full authentication (the project has no login system),
// it's just a basic gatekeeper so random visitors can't call the API directly.

import { NextRequest } from "next/server";

export function isRequestFromOurApp(request: NextRequest): boolean {
  const headerKey = request.headers.get("x-internal-api-key");
  const expectedKey = process.env.INTERNAL_API_KEY;

  // If we forgot to set the env variable, fail closed (deny the request)
  if (!expectedKey) {
    return false;
  }

  return headerKey === expectedKey;
}
