import { z } from "zod";
import { TestSchema } from "./test.contract";

export type Test = z.infer<typeof TestSchema>;
