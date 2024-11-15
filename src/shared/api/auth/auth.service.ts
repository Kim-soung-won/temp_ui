import { AxiosContracts } from "@/shared/lib/axios";
import { apiPathKeys } from "@/shared/lib/axios/config";
import { baseClient } from "..";
import { baseContractsDto } from "../base";
import {
  LoginResponseDtoSchema,
  LoginUserDtoSchema,
  UserDtoSchema,
} from "./auth.contract";
import { LoginUserDto } from "./auth.types";

export class AuthService {
  static currentUserQuery(config: { signal?: AbortSignal }) {
    return baseClient
      .get(`${apiPathKeys.core()}/api/manager/profile`, config)
      .then(AxiosContracts.responseContract(UserDtoSchema));
  }

  static loginUserMutation(data: { loginUserDto: LoginUserDto }) {
    const loginUserDto = AxiosContracts.requestContract(
      LoginUserDtoSchema,
      data.loginUserDto,
    );
    return baseClient
      .post(`${apiPathKeys.auth()}/api/auth/login`, { ...loginUserDto })
      .then(
        AxiosContracts.responseContract(
          baseContractsDto.BaseResponseDtoSchema(LoginResponseDtoSchema),
        ),
      );
  }
}
