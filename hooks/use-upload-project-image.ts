
"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadProjectImage } from "@/lib/api/uploads";

export function useUploadProjectImage() {
  return useMutation({
    mutationFn: uploadProjectImage,
  });
}