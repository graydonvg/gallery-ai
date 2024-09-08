"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import cloudinary from "cloudinary";

const schema = z.object({
  folderName: z.string(),
});

export const addAblumAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { folderName } }) => {
    try {
      const createdFolder = (await cloudinary.v2.api.create_folder(
        folderName,
      )) as {
        success: boolean;
      };

      if (createdFolder.success) {
        return {
          success: `Album added successfully`,
        };
      }

      return { error: "An error occurred" };
    } catch (error) {
      return { error: "An error occurred" };
    }
  });
