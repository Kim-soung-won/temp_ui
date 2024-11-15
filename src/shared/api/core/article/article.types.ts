import { z } from "zod";
import {
  ArticleDtoSchema,
  ArticlesDtoSchema,
  ArticlesParamsDtoSchema,
} from "./article.contracts";

export type ArticleTypesDto = z.infer<typeof ArticleDtoSchema>;
export type ArticlesTypesDto = z.infer<typeof ArticlesDtoSchema>;
export type ArticlesParamsDto = z.infer<typeof ArticlesParamsDtoSchema>;
