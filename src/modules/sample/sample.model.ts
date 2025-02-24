import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";
import { z } from "zod";

export interface SampleTable {
  id: Generated<number>;
  name: string;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, Date>;
}

export type Sample = Selectable<SampleTable>;
export type NewSample = Insertable<SampleTable>;
export type SampleUpdate = Updateable<SampleTable>;

export const SampleSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2).max(100),
  created_at: z.date(),
  updated_at: z.date(),
});
export const NewSampleSchema = SampleSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
export const SampleUpdateSchema = SampleSchema.partial();
