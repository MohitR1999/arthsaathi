import { router } from "expo-router";
import { Screens } from "@arthsaathi/ui";
import { useState } from "react";
import { Category } from '@arthsaathi/helpers/types'
import { useCategory } from "@arthsaathi/helpers/hooks";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const Categories = () => {
  const [category, setCategory] = useState<Category>("EXPENSE");
  const { data, isLoading } = useCategory({
    base_url: BASE_URL ?? "",
    category: category,
  });

  const categoryChangeHandler = (value: Category) => {
    setCategory(value);
  }

  const backHandler = () => {
    router.back();
  };

  return (
    <Screens.Categories
      backHandler={backHandler}
      categoryValue={category}
      loading={isLoading}
      categoryValueChangeHandler={categoryChangeHandler}
      items={data ?? []}
    />
  );
};

export default Categories;
