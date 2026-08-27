// lib/r2.ts
import { S3Client } from "@aws-sdk/client-s3";

// R2 ka S3-compatible endpoint. Bucket private rakh sakte hain
// kyunki hum proxy route (/api/files) se serve kar rahe hain — direct
// public access ki zaroorat nahi.
export const r2Client = new S3Client({
  region: "auto", // R2 ko region nahi chahiye, but SDK expects a value
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const R2_BUCKET = process.env.R2_BUCKET_NAME!;