// scripts/migrate-to-r2.ts
import { config } from "dotenv";
config({ path: ".env" });

import { readdir, readFile } from "fs/promises";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Yahan client banate hain — config() ke baad, isliye env vars already loaded honge
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const R2_BUCKET = process.env.R2_BUCKET_NAME!;

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

async function migrate() {
  const folders = await readdir(UPLOADS_DIR);

  for (const folder of folders) {
    const folderPath = path.join(UPLOADS_DIR, folder);
    const files = await readdir(folderPath);

    for (const filename of files) {
      const filePath = path.join(folderPath, filename);
      const buffer = await readFile(filePath);

      await r2Client.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET,
          Key: `${folder}/${filename}`,
          Body: buffer,
        }),
      );

      console.log(`Uploaded: ${folder}/${filename}`);
    }
  }

  console.log("Migration done!");
}

migrate();