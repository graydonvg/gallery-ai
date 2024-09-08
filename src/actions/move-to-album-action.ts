"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import cloudinary from "cloudinary";

const schema = z.object({
  publicId: z.string(),
  folderName: z.string(),
});

export const moveToAblumAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { publicId, folderName } }) => {
    try {
      const result = await cloudinary.v2.api.update(publicId, {
        asset_folder: folderName,
      });

      if (result) {
        return { success: "Moved to album successfully" };
      }

      return { error: "An error occurred" };
    } catch (error) {
      return { error: "An error occurred" };
    }
  });
