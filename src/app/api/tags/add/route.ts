import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { withAxiom, AxiomRequest } from "next-axiom";
import { constructZodErrorMessage, wait } from "@/lib/utils";
import { updateTagSchema } from "@/lib/types";

type CloudinaryResponse = {
  public_ids: string[];
};

export const POST = withAxiom(async (request: AxiomRequest) => {
  let log = request.log;
  log.info("Add tag function called");

  try {
    const body = await request.json();

    const parsedBody = updateTagSchema.safeParse(body);

    if (!parsedBody.success) {
      log.error("Validation error", { payload: body, error: parsedBody.error });

      return NextResponse.json(
        { error: constructZodErrorMessage(parsedBody.error) },
        { status: 400 },
      );
    }

    const { publicId, tag } = parsedBody.data;
    log = log.with({
      publicId,
      tag,
    });
    log.info("Request data received");

    const response = (await cloudinary.v2.uploader.add_tag(tag, [
      publicId,
    ])) as CloudinaryResponse;

    if (!response.public_ids.length) {
      log.error("Failed to add tag");

      return NextResponse.json({ error: "Failed to add tag" }, { status: 500 });
    }

    await wait(2000);

    log.info("Tag added successfully", { response });

    return NextResponse.json({
      success: `Tag '${tag}' added to asset '${publicId}'`,
    });
  } catch (error) {
    log.error("An unexpected error occurred", { error });

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  } finally {
    await log.flush();
  }
});
