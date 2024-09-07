"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

const schema = z.object({
  albumName: z.string(),
});

export const addAblumAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { albumName } }) => {
    try {
      const createdFolder = (await cloudinary.v2.api.create_folder(
        albumName,
      )) as {
        success: boolean;
      };

      if (createdFolder.success) {
        revalidatePath("/albums");
        return {
          success: `Album added successfully`,
        };
      }

      return { error: "An error occurred" };
    } catch (error) {
      return { error: "An error occurred" };
    }
  });
