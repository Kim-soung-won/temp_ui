import { transformArticlesDtoToArticles } from "entities/core/article/article.lib";
import { Articles } from "entities/core/article/article.types";
import { ArticleService } from "@/shared/api/core/article/article.service";
import { queryClient } from "@/shared/lib/react-query";
import { FilterQuery } from "@/entities/base/base.types";

export class ArticleQueries {
  static readonly keys = {
    root: ["article"] as const,
  };

  static articlesQuery(filter?: FilterQuery) {
    const {
      size = 5,
      index = 0,
      searchOp = "OR",
      keywords = "",
      order = "desc",
      orderBy = "",
    } = filter || {};

    const sortProperties = `${orderBy},${order}`;

    const queryKey = [
      ...this.keys.root,
      "general-articles",
      index,
      size,
      searchOp,
      keywords,
      sortProperties,
    ].filter(Boolean) as string[];

    return {
      queryKey,
      queryFn: async () => {
        const response = await ArticleService.articlesQuery({
          params: {
            size,
            index,
            searchOp,
            keywords,
            sortProperties,
          },
        });

        const articles = transformArticlesDtoToArticles(response.data.data);

        this.setArticleData(articles);

        return articles;
      },
      initialData: () => this.getInitialData<Articles>(queryKey),
      initialDataUpdatedAt: () => this.getQueryDataUpdateAt(queryKey),
    };
  }

  private static getInitialData<T>(queryKey: string[]) {
    // 주어진 쿼리 키에 대해 이미 캐시된 데이터가 있는지 확인한다.
    return queryClient.getQueryData<T>(queryKey);
  }

  private static getQueryDataUpdateAt<T>(queryKey: string[]) {
    // 주어진 쿼리 키가 마지막으로 업데이트된 시간을 반환한다.
    return queryClient.getQueryState<T>(queryKey)?.dataUpdatedAt;
  }

  private static setArticleData(articles: Articles) {
    const { list } = articles;
    list.forEach((article) => {
      queryClient.setQueryData([...this.keys.root, article.id], article);
    });
  }
}
