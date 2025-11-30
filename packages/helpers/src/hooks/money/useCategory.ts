import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../useAuthStore";
import axios from "axios";
import { SubCategory, Category } from "../../types/money/category";

export const useCategory = ({
  base_url,
  category,
}: {
  base_url: string;
  category: "EXPENSE" | "INCOME";
}) => {
  const jwt = useAuthStore((state) => state.jwt);
  return useQuery({
    queryKey: ["categories", category],
    queryFn: async () => {
      const response = await axios.get<SubCategory[]>(
        `${base_url}/api/category?type=${category}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      return response.data;
    },
    refetchInterval: 10 * 60 * 1000,
    enabled: !!jwt,
  });
};

export const useMutateCategory = ({
  base_url,
  successHandler,
  failureHandler,
}: {
  base_url: string;
  successHandler: () => void;
  failureHandler: () => void;
}) => {
  const jwt = useAuthStore((state) => state.jwt);
  return useMutation({
    mutationFn: async ({
      type,
      sub_category,
    }: {
      type: Category;
      sub_category: string;
    }) => {
      const response = await axios.post(
        `${base_url}/api/category?type=${type}`,
        {
          sub_category,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      return response.data;
    },

    onSuccess: () => {
      successHandler();
    },

    onError: (error) => {
      console.log(error);
      failureHandler();
    },
  });
};
