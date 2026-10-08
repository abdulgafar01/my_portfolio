
export type UploadedImage = {
  path: string;
  url: string;
  contentType: string;
  size: number;
};

export async function uploadProjectImage(
  file: File,
): Promise<UploadedImage> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message ?? "Image upload failed");
  }

  return result.data as UploadedImage;
}