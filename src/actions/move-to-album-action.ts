"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

const schema = z.object({
  publicId: z.string(),
  albumName: z.string(),
});

export const moveToAblumAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { publicId, albumName } }) => {
    try {
      const result = await cloudinary.v2.api.update(publicId, {
        asset_folder: albumName,
      });

      if (result) {
        revalidatePath("/albums");
        return { success: "Moved to album successfully" };
      }

      return { error: "An error occurred" };
    } catch (error) {
      return { error: "An error occurred" };
    }
  });
