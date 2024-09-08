"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import cloudinary from "cloudinary";

const schema = z.object({
  oldFolderName: z.string(),
  newFolderName: z.string(),
});

export const renameAblumAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { oldFolderName, newFolderName } }) => {
    try {
      const renameFolder = await cloudinary.v2.api.rename_folder(
        oldFolderName,
        newFolderName,
      );

      if (renameFolder.to.name) {
        return {
          success: `Album renamed successfully`,
        };
      }

      return { error: "An error occurred" };
    } catch (error) {
      return { error: "An error occurred" };
    }
  });
