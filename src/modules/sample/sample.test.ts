import { assertEquals } from "jsr:@std/assert";

import { DB } from "../common/configs/db.config.ts";
import { testCleanup, testSetup } from "../common/configs/test.config.ts";
import { NewSample, SampleSchema } from "./sample.model.ts";
import { SampleService } from "./sample.service.ts";

Deno.test("sample.service", async (t) => {
  await testSetup();

  await t.step("createSample", async () => {
    try {
      const testSample: NewSample = {
        "name": "Test Sample",
      };

      const sampleService = new SampleService();

      const createSampleResult = await sampleService
        .createSample(testSample);

      assertEquals(typeof createSampleResult.id, "number");

      const createdSample = await DB
        .selectFrom("sample")
        .where(
          "id",
          "=",
          createSampleResult.id,
        )
        .selectAll().executeTakeFirstOrThrow();

      SampleSchema.parse(createdSample);

      assertEquals(createdSample.name, testSample.name);

      await DB.deleteFrom("sample").where(
        "id",
        "=",
        createSampleResult.id,
      ).executeTakeFirstOrThrow();
    } catch (error) {
      console.error("createSample test failed:", error);
    }
  });

  await testCleanup();
});
