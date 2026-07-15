import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

// Jaise upload route me tha, waise hi allowed folders ki list yaha bhi rakho
const ALLOWED_FOLDERS = [
  "projects",
  "developers",
  "agents",
  "blogs",
  "configurations",
  "locations",
];

// File extension ke hisaab se browser ko batana ki ye kis type ki file hai
function getContentType(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  const types: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  return types[ext] || "application/octet-stream";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ folder: string; filename: string }> }
) {
  const { folder, filename } = await params;

  // 1. Security: sirf allowed folder names accept karo
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  // 2. Security: filename me ".." ya "/" na ho, warna koi bahar ki file padh sakta hai
  if (filename.includes("..") || filename.includes("/")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  try {
    // 3. Har request pe disk se FRESH file padhi jaati hai — koi cache nahi
    const filePath = path.join(process.cwd(), "uploads", folder, filename);
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": getContentType(filename),
        "Cache-Control": "public, max-age=31536000, immutable", // browser cache theek hai, server cache nahi
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}