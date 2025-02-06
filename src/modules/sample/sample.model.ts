import { Generated, Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export interface SampleTable {
  id: Generated<number>;
  name: string;
}

export type Sample = Selectable<SampleTable>;
export type NewSample = Insertable<SampleTable>;
export type SampleUpdate = Updateable<SampleTable>;

export const SampleSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2).max(100),
});
export const NewSampleSchema = SampleSchema.omit({ id: true });
export const SampleUpdateSchema = SampleSchema.partial();
