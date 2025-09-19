import z from "zod";
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
] as const;
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.[0], "Image is required for model inference.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Image must be under ${
        MAX_FILE_SIZE / (1024 * 1024)
      }MB for efficient processing.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only JPEG and PNG formats supported for computer vision models."
    ),
  epsilon: z.number(),
});
