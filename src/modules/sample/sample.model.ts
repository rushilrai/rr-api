import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface SampleTable {
  id: Generated<number>;
  name: string;
}

export type Sample = Selectable<SampleTable>;
export type NewSample = Insertable<SampleTable>;
export type SampleUpdate = Updateable<SampleTable>;
