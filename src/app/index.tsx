import axios from "axios";
import "@/shared/lib/react-i18next/i18n"; // import 해주지 않으면 경고가 발생한다.
import ReactDOM from "react-dom/client";
import { baseClient } from "@/shared/api";
import {
  PATH_REFRESH_TOKEN,
  REFRESH_TOKEN_HEADER,
  SHOULD_ADD_REFRESH_TOKEN,
} from "@/shared/constants/constants";
import { useSessionStore } from "@/shared/session";
import { Provider } from "./providers";

window.addEventListener("error", (event) => {
  if (axios.isAxiosError(event.error)) {
    event.preventDefault();
  }
});

baseClient.interceptors.request.use(
  (config) => {
    const { session } = useSessionStore.getState();

    if (session?.refreshToken && config.headers.get(SHOULD_ADD_REFRESH_TOKEN)) {
      config.headers.set(
        REFRESH_TOKEN_HEADER,
        `Bearer ${session.refreshToken}`,
      );
      config.headers.delete(SHOULD_ADD_REFRESH_TOKEN);
    }

    if (
      session &&
      session.accessToken &&
      !config?.url?.includes(PATH_REFRESH_TOKEN)
    ) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

console.log("ReactDOM -----> ", ReactDOM);

ReactDOM.createRoot(document.getElementById("root")!).render(<Provider />);
