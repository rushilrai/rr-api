import { DB } from "../../configs/db.config.ts";
import { LOGGER } from "../../configs/logger.config.ts";
import {
  NewSample,
  NewSampleSchema,
  Sample,
  SampleSchema,
} from "./sample.model.ts";

export class SampleService {
  async createSample(sample: NewSample) {
    try {
      NewSampleSchema.parse(sample);

      const result = await DB.insertInto("sample").values(sample).returning(
        "id",
      ).executeTakeFirstOrThrow();

      LOGGER.debug(result);

      return result;
    } catch (error) {
      LOGGER.error("Could not create sample", error);

      throw error;
    }
  }

  async readSampleById(id: Sample["id"]) {
    try {
      SampleSchema.shape.id.parse(id);

      const result = await DB.selectFrom("sample").where("id", "=", id)
        .selectAll().executeTakeFirstOrThrow();

      LOGGER.debug(result);

      return result;
    } catch (error) {
      LOGGER.error("Could not read sample by id", error);

      throw error;
    }
  }
}
