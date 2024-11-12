import { z } from "zod";
import { FilterQuerySchema } from "./base.contracts";

export type SearchOp = "OR" | "AND";
export type Order = "asc" | "desc";
export type FilterQuery = z.infer<typeof FilterQuerySchema>;
