import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../useAuthStore";
import axios from "axios";

export const useProfile = ({ base_url }: { base_url: string }) => {
  const jwt = useAuthStore((state) => state.jwt);
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axios.get<{
        email: string;
        firstName: string;
        lastName: string;
      }>(`${base_url}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    },
    refetchInterval: 10 * 60 * 1000,
    enabled: !!jwt,
  });
};
