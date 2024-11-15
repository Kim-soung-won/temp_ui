import { z } from "zod";
import { baseContracts } from "@/entities/base";

export const ArticleSchema = baseContracts.BaseSchema.extend({
  title: z.string(),
  content: z.string(),
  activeYn: z.boolean(),
});

export const ArticlesSchema = z.object({
  list: z.array(ArticleSchema),
  pagination: baseContracts.BasePaginationSchema,
});
