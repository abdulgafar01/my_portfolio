
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { fileTypeFromBuffer } from "file-type";

import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const BUCKET = "portfolio-projects";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
} as const;

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Add your server-side admin authorization check here
    // before accepting uploads. Do not deploy this endpoint unprotected.

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "An image file is required" },
        { status: 400 },
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Image must be greater than 0 bytes and no larger than 5 MB",
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const detectedType = await fileTypeFromBuffer(buffer);

    if (
      !detectedType ||
      !(detectedType.mime in ALLOWED_TYPES)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Only JPEG, PNG, WebP, and AVIF images are allowed",
        },
        { status: 415 },
      );
    }

    const extension =
      ALLOWED_TYPES[
        detectedType.mime as keyof typeof ALLOWED_TYPES
      ];

    const path = `projects/${randomUUID()}.${extension}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, buffer, {
        contentType: detectedType.mime,
        cacheControl: "31536000",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase Storage upload failed:", uploadError.message);

      return NextResponse.json(
        { success: false, message: "Image upload failed" },
        { status: 500 },
      );
    }

    const { data } = supabaseAdmin.storage
      .from(BUCKET)
      .getPublicUrl(path);

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        data: {
          path,
          url: data.publicUrl,
          contentType: detectedType.mime,
          size: file.size,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/uploads failed:", error);

    return NextResponse.json(
      { success: false, message: "Failed to upload image" },
      { status: 500 },
    );
  }
}