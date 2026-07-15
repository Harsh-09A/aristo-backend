import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isRequestFromOurApp } from "@/lib/api-security";

// The folders we allow uploading into. This stops someone from trying to
// write files into a random/unsafe folder name.
const ALLOWED_FOLDERS = [
  "projects",
  "developers",
  "agents",
  "blogs",
  "configurations",
  "locations",
];

export async function POST(request: NextRequest) {
  // 1. Simple security check: only allow requests from our own app
  if (!isRequestFromOurApp(request)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  // 2. Read the uploaded files from the form data
  const formData = await request.formData();
  const folder = formData.get("folder");
  const files = formData.getAll("files");

  // 3. Check the folder is one we allow
  if (typeof folder !== "string" || !ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files were sent" }, { status: 400 });
  }

  // 4. Make sure the destination folder exists
  const uploadDir = path.join(process.cwd(), "uploads", folder);
  await mkdir(uploadDir, { recursive: true });

  const savedFilePaths: string[] = [];

  // 5. Save each file to disk with a unique name
  for (const file of files) {
    if (!(file instanceof File)) {
      continue;
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Build a unique file name so uploads never overwrite each other
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.name}`;
    const filePath = path.join(uploadDir, uniqueName);

    await writeFile(filePath, buffer);

    // This is the public URL path we store in the database and show in <img> tags
    savedFilePaths.push(`/api/files/${folder}/${uniqueName}`);

  }

  return NextResponse.json({ paths: savedFilePaths });
}
