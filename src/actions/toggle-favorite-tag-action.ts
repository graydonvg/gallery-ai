"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { wait } from "@/lib/utils";

const schema = z.object({
  publicId: z.string(),
  isFavorite: z.boolean(),
  pathToRevalidate: z.string(),
});

export const toggleFavoriteTagAction = actionClient
  .schema(schema)
  .action(
    async ({ parsedInput: { publicId, isFavorite, pathToRevalidate } }) => {
      try {
        if (!isFavorite) {
          await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
        } else {
          await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
        }

        await wait(2000);

        revalidatePath(pathToRevalidate);
        return { success: true };
      } catch (error) {
        return { error: "An error occurred" };
      }
    },
  );
