import { AxiosResponse } from "axios";
import { baseClient } from "@/shared/api";
import { AxiosContracts } from "@/shared/lib/axios";
import { apiPathKeys } from "@/shared/lib/axios/config";
import { baseContractsDto } from "../../base";
import { TestDtoSchema } from "./test.contracts";

export class TestService {
  static testQuery(): Promise<AxiosResponse> {
    return baseClient
      .get(`${apiPathKeys.core()}/api/no-auth/test`)
      .then(
        AxiosContracts.responseContract(
          baseContractsDto.BaseResponseDtoSchema(TestDtoSchema),
        ),
      );
  }
}
