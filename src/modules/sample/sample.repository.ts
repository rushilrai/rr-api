import { DB } from "../common/configs/db.config.ts";
import { NewSample, Sample, SampleUpdate } from "./sample.model.ts";

export class SampleRepository {
  private readonly SAMPLE_TABLE = "sample" as const;

  async create(newSample: NewSample) {
    try {
      const query = DB
        .insertInto(this.SAMPLE_TABLE)
        .values(
          newSample,
        )
        .returning(
          "id",
        );

      const createResult = await query.executeTakeFirstOrThrow();

      return createResult;
    } catch (error) {
      console.error("SampleRepository.create Error:", error);

      throw error;
    }
  }

  async readById(id: Sample["id"]) {
    try {
      const query = DB
        .selectFrom(this.SAMPLE_TABLE)
        .where(
          "id",
          "=",
          id,
        )
        .selectAll();

      const readByIdResult = await query.executeTakeFirstOrThrow();

      return readByIdResult;
    } catch (error) {
      console.error("SampleRepository.readById Error:", error);

      throw error;
    }
  }

  async update(
    id: Sample["id"],
    updatedSample: Pick<SampleUpdate, "name">,
  ) {
    try {
      const updatedData: SampleUpdate = {
        ...updatedSample,
      };

      updatedData.updated_at = new Date();

      const query = DB
        .updateTable(this.SAMPLE_TABLE)
        .set(updatedData)
        .where(
          "id",
          "=",
          id,
        )
        .returning("id");

      const updateResult = await query.executeTakeFirstOrThrow();

      return updateResult;
    } catch (error) {
      console.error(
        "SampleRepository.update Error:",
        error,
      );

      throw error;
    }
  }

  async delete(id: Sample["id"]) {
    try {
      const query = DB
        .deleteFrom(this.SAMPLE_TABLE)
        .where(
          "id",
          "=",
          id,
        );

      const deleteResult = await query.executeTakeFirstOrThrow();

      if (deleteResult.numDeletedRows === BigInt(0)) {
        throw new Error("Nothing deleted");
      }

      return deleteResult;
    } catch (error) {
      console.error("SampleRepository.readById Error:", error);

      throw error;
    }
  }
}
