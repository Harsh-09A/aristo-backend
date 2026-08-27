// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client, R2_BUCKET } from "@/lib/r2";
import { isRequestFromOurApp } from "@/lib/api-security";

const ALLOWED_FOLDERS = [
  "projects",
  "developers",
  "agents",
  "blogs",
  "configurations",
  "locations",
];

export async function POST(request: NextRequest) {
  if (!isRequestFromOurApp(request)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const folder = formData.get("folder");
  const files = formData.getAll("files");

  if (typeof folder !== "string" || !ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files were sent" }, { status: 400 });
  }

  const savedFilePaths: string[] = [];

  for (const file of files) {
    if (!(file instanceof File)) continue;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.name}`;
    const key = `${folder}/${uniqueName}`; // R2 me "path" nahi, "key" hota hai

    // fs.writeFile ki jagah ab R2 pe PutObjectCommand
    await r2Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      }),
    );

    // Return path SAME format me — proxy route ise handle karega
    savedFilePaths.push(`/api/files/${folder}/${uniqueName}`);
  }

  return NextResponse.json({ paths: savedFilePaths });
}
