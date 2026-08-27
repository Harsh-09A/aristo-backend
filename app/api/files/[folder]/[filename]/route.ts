// app/api/files/[folder]/[filename]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2Client, R2_BUCKET } from "@/lib/r2";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ folder: string; filename: string }> },
) {
  const { folder, filename } = await params;
  const key = `${folder}/${filename}`;

  try {
    const object = await r2Client.send(
      new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }),
    );

    // AWS SDK v3 body ko web stream me convert karna padta hai
    const stream = object.Body?.transformToWebStream();
    if (!stream) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return new NextResponse(stream, {
      headers: {
        "Content-Type": object.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable", // browser cache
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}