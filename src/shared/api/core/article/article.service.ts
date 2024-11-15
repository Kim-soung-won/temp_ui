import { AxiosResponse } from "axios";
import { ArticlesDtoSchema } from "shared/api/core/article/article.contracts";
import { ArticlesParamsDto } from "shared/api/core/article/article.types";
import { apiPathKeys } from "shared/lib/axios/config";
import { BaseService } from "../../base/base.service";

export class ArticleService extends BaseService {
  static {
    this.setBaseUrl(`${apiPathKeys.core()}/api/article`);
  }

  static articlesQuery(config: {
    params: ArticlesParamsDto;
    signal?: AbortSignal;
  }): Promise<AxiosResponse> {
    const url = `/listPage`;
    return this.getList({
      url,
      params: config.params,
      schema: ArticlesDtoSchema,
      config,
    });
  }
}
