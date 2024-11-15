import { z } from "zod";
import { TestDtoSchema } from "./test.contracts";

export type TestDto = z.infer<typeof TestDtoSchema>;
