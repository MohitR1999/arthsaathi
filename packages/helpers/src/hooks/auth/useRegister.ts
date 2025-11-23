import { useMutation } from "@tanstack/react-query";
import type { UserDetails } from "../../types/auth/authTypes";
import axios from "axios";

export const useRegister = ({ base_url, success_handler }: { base_url: string, success_handler: () => void }) => {
  return useMutation({
    mutationFn: async (userDetails: UserDetails) => {
      const response = await axios.post<{ message: string }>(`${base_url}/api/auth/register`, {
        ...userDetails,
      });

      return response.data
    },

    onSuccess: () => {
      success_handler()
    }
  });
};
