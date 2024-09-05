"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

const schema = z.object({
  publicId: z.string(),
  albumName: z.string(),
});

export const addToAblumAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { publicId, albumName } }) => {
    try {
      const createdFolder = (await cloudinary.v2.api.create_folder(
        albumName,
      )) as {
        success: boolean;
        name: string;
      };

      if (createdFolder.success) {
        const result = await cloudinary.v2.api.update(publicId, {
          asset_folder: createdFolder.name,
        });

        if (result) {
          return { success: true };
        }

        revalidatePath("albums");

        return { error: "An error occurred" };
      }

      return { error: "An error occurred" };
    } catch (error) {
      return { error: "An error occurred" };
    }
  });
