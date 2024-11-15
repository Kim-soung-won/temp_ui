import { queryOptions } from "@tanstack/react-query";
import { TestService } from "@/shared/api/core/test/test.service";
import { queryClient } from "@/shared/lib/react-query";

export class TestQueries {
  static readonly keys = {
    root: ["test"] as const,
  };

  static testQuery(num: number) {
    return queryOptions({
      queryKey: [...this.keys.root, num],
      queryFn: async () => {
        const response = await TestService.testQuery();
        return response.data;
      },
      initialData: () => queryClient.getQueryData(this.keys.root),
      initialDataUpdatedAt: () => this.getQueryDataUpdateAt(this.keys.root),
    });
  }

  private static getQueryDataUpdateAt<T>(queryKey: ReadonlyArray<unknown>) {
    return queryClient.getQueryState<T>(queryKey)?.dataUpdatedAt;
  }
}
