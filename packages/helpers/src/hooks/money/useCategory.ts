import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../useAuthStore";
import axios from "axios";
import { SubCategory } from '../../types/money/category';

export const useCategory = ({ base_url, category }: { base_url: string, category: 'EXPENSE' | 'INCOME' }) => {
  const jwt = useAuthStore((state) => state.jwt);
  return useQuery({
    queryKey: ["categories", category],
    queryFn: async () => {
      const response = await axios.get<SubCategory[]>(`${base_url}/api/category?type=${category}`, {
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
