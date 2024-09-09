import { ApiResponse, UpdateTag } from "@/lib/types";
import axios from "axios";
import { Logger } from "next-axiom";

const log = new Logger();

export default async function addTag(payload: UpdateTag): Promise<ApiResponse> {
  const logger = log.with({ context: "service: addTag" });
  logger.info("Add tag function called");

  try {
    const response = await axios.post<ApiResponse>("/api/tags/add", payload);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        logger.error("Server responded with an error", {
          error: error.response,
        });

        const serverError =
          error.response.data?.error || "Unknown server error";

        return { error: serverError };
      }

      if (error.request) {
        logger.error("Network error", { error });
        return { error: "Network error" };
      }
    }

    logger.error("An unexpected error occurred", { error });
    return { error: "An unexpected error occurred" };
  } finally {
    await logger.flush();
  }
}
