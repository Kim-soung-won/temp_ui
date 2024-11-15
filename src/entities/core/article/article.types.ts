import {
  ArticleSchema,
  ArticlesSchema,
} from "entities/core/article/article.contracts";
import { z } from "zod";

export type Article = z.infer<typeof ArticleSchema>;
export type Articles = z.infer<typeof ArticlesSchema>;
