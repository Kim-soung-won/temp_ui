import { ArticleDtoType } from "@/shared/api/core/article";
import { Article, Articles } from "./article.types";

export function transformArticleDtoToArticle(
  articleDto: ArticleDtoType.ArticleTypesDto,
): Article {
  return {
    ...articleDto,
  };
}

export function transformArticlesDtoToArticles(
  articlesDto: ArticleDtoType.ArticlesTypesDto,
): Articles {
  const { list, pagination } = articlesDto;
  const listDto = list.map((article) => transformArticleDtoToArticle(article));
  return {
    list: listDto,
    pagination,
  };
}
