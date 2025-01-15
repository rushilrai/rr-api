import { assertEquals } from "jsr:@std/assert";

import { connectToDb, disconnectFromDb } from "../../configs/db.config.ts";
import { LOGGER } from "../../configs/logger.config.ts";
import { testSetup } from "../../configs/test.config.ts";
import { NewSample } from "./sample.model.ts";
import { SampleService } from "./sample.service.ts";

Deno.test("sample - Integration Tests", async (t) => {
  await testSetup();

  await t.step("db tests", async () => {
    try {
      await connectToDb();

      const sampleService = new SampleService();

      const newSample: NewSample = {
        name: "Test Sample",
      };

      const createdSample = await sampleService.createSample(newSample);

      assertEquals(typeof createdSample.id, "number");

      const readNewSample = await sampleService.readSampleById(
        createdSample.id,
      );

      assertEquals(readNewSample.name, newSample.name);
    } catch (error) {
      LOGGER.error("Migration process failed:", error);

      await disconnectFromDb();
    }
  });
});
