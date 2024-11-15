import { z } from "zod";
import {
  BaseDtoSchema,
  BaseReseponsePaginationDtoSchema,
} from "@/shared/api/base/base.contracts";

const ArticleDto = BaseDtoSchema.extend({
  title: z.string(),
  content: z.string(),
  activeYn: z.boolean(),
});

export const ArticleDtoSchema = ArticleDto;

export const ArticlesDtoSchema = z.object({
  list: z.array(ArticleDto),
  pagination: BaseReseponsePaginationDtoSchema,
});

export const PageParamsDtoSchema = z.object({
  index: z.number().min(0),
  size: z.number().min(1),
  searchOp: z.enum(["OR", "AND"]).optional(),
  keywords: z.string().optional(),
  sortProperties: z.string().optional(),
});

export const FilterParamsDtoSchema = z.object({});

export const ArticlesParamsDtoSchema = z.intersection(
  PageParamsDtoSchema,
  FilterParamsDtoSchema,
);
