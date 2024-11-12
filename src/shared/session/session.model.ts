// Session 모델을 정의하고, zustand를 사용하여 세션을 관리하는 슬라이스를 생성한다.
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { decryptData, encryptData } from "../lib/crypto";
import { createSelectors } from "../lib/zustand/zustand.lib";
import { Session } from "./session.types";

type State = {
  session: Session | null;
};

type Actions = {
  setSession: (session: Session) => void;
  resetSession: () => void;
};

function createSessionSlice() {
  const sessionSlice: StateCreator<
    State & Actions,
    [["zustand/devtools", never], ["zustand/persist", unknown]],
    [],
    State & Actions
  > = (set) => ({
    session: null, // 초기 세션은 null이다.
    setSession: (session: Session) => set({ session }, false, "setSession"), // 새 세션을 설정한다.
    resetSession: () => set({ session: null }, false, "resetSession"), // 세션을 null로 초기화한다.
  });
  return sessionSlice;
}

const slice = createSessionSlice();

const withPersist = persist(slice, {
  name: "session",
  storage: {
    getItem: (name) => {
      const encryptedData = localStorage.getItem(name);
      if (encryptedData) {
        try {
          const decryptedData = decryptData(encryptedData);
          return JSON.parse(decryptedData);
        } catch (error) {
          return null;
        }
      }
      return null;
    },
    setItem: (name, state) => {
      try {
        const encryptedData = encryptData(JSON.stringify(state));
        localStorage.setItem(name, encryptedData);
      } catch (error) {
        console.error(error);
      }
    },
    removeItem: (name) => {
      localStorage.removeItem(name);
    },
  },
});

const withDevtools = devtools(withPersist, { name: "Session Service" });
const store = create(withDevtools);
export const useSessionStore = createSelectors(store);
