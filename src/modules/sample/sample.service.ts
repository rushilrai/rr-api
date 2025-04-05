import { NewSample } from "./sample.model.ts";
import { SampleRepository } from "./sample.repository.ts";

export class SampleService {
  private readonly SampleRespository = new SampleRepository();

  async createSample(sample: NewSample) {
    try {
      const createSampleResult = await this.SampleRespository.create(sample);

      return createSampleResult;
    } catch (error) {
      console.error("Error creating sample", error);

      throw error;
    }
  }
}
