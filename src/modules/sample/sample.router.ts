import { z } from "zod";

import { createHonoInstance } from "../common/configs/hono.config.ts";
import { sampleMiddleware } from "../sample/sample.middleware.ts";
import { NewSampleSchema, SampleSchema } from "./sample.model.ts";
import { SampleService } from "./sample.service.ts";

export const SAMPLE_ROUTER = createHonoInstance();

SAMPLE_ROUTER.use("*", sampleMiddleware);

SAMPLE_ROUTER.put("/create-sample", async (c) => {
  const RequestSchema = NewSampleSchema;
  type RequestType = z.infer<typeof RequestSchema>;

  const ResponseSchema = z.object({
    id: SampleSchema.shape.id,
  });
  type ResponseType = z.infer<typeof ResponseSchema>;

  try {
    const requestBody = await c.req.json() as RequestType;

    try {
      RequestSchema.parse(requestBody);
    } catch (error) {
      console.error("Invalid request body:", error);

      return c.json({ error: "Invalid request body" }, 400);
    }

    const timeOfRequest = c.get("timeOfRequest");
    console.log("Time of request:", timeOfRequest);

    const sampleService = new SampleService();

    const createSampleResult = await sampleService.createSample(
      requestBody,
    );

    const responseBody: ResponseType = {
      id: createSampleResult.id,
    };

    ResponseSchema.parse(responseBody);

    return c.json(responseBody);
  } catch (error) {
    console.error("Server Error:", error);

    return c.json({ error: "Server Error" }, 500);
  }
});
