import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import { useSessionStore } from "@/shared/session";
import { createLoginStore } from "@/features/auth/login/login.model";

export class LoginLoader {
  static async loginPage(args: LoaderFunctionArgs) {
    if (useSessionStore.getState().session) {
      return redirect(pathKeys.login());
    }
    return args;
  }
}

class LoginModel {
  readonly useLoginStore;

  constructor() {
    this.useLoginStore = createLoginStore({
      initialState: { targetUserInfo: {} },
      devtoolsOptions: { name: "Login Store" },
    });
  }
}

export const loginModel = new LoginModel();
