import { useMutation } from "@tanstack/react-query";
import { useSignIn } from "./useSignIn";
import axios from "axios";

export const useLogin = ({ base_url }: { base_url: string }) => {
  const performSignIn = useSignIn();
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await axios.post<{ jwt: string }>(
        `${base_url}/api/auth/login`,
        {
          email,
          password,
        },
      );
      performSignIn({
        email,
        jwt: res.data.jwt,
      });
    },
  });
};
