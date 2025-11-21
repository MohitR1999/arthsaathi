import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthSession, AuthSessionActions } from "../types/auth/authTypes";
import * as SecureStore from "expo-secure-store";

const SecureStorage = {
  getItem: async (key: string, options?: SecureStore.SecureStoreOptions) => {
    const value = await SecureStore.getItemAsync(key, options);
    return value;
  },

  setItem: async (
    key: string,
    value: string,
    options?: SecureStore.SecureStoreOptions,
  ) => {
    await SecureStore.setItemAsync(key, value, options);
  },

  removeItem: async (key: string, options?: SecureStore.SecureStoreOptions) => {
    await SecureStore.deleteItemAsync(key, options);
  },
};

type AuthStore = AuthSession & AuthSessionActions;

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      email: "",
      jwt: "",
      login: ({ email, jwt }: AuthSession) => {
        set({ email, jwt });
      },
      logout: () => {
        set({ email: "", jwt: "" });
      },
    }),
    {
      name: "auth-store",
      skipHydration: true,
      storage: createJSONStorage(() => SecureStorage)
    },
  ),
);

export { useAuthStore };
