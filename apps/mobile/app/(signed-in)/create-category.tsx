import { Screens } from "@arthsaathi/ui";
import { router } from "expo-router";
import { useMutateCategory } from "@arthsaathi/helpers/hooks";
import { useState } from "react";
import { Category } from "@arthsaathi/helpers/types";
import { useQueryClient } from "@tanstack/react-query";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const MESSAGES = {
  SUCCESS: "Sub category created successfully",
  FAILURE: "Failed to create subcategory",
};

const CreateCategory = () => {
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const queryClient = useQueryClient()
  const [snackbarText, setSnackbarText] = useState(MESSAGES.SUCCESS);
  const successHandler = () => {
    setIsSnackBarVisible(true);
    queryClient.invalidateQueries({
      queryKey: ["categories"]
    })
  };
  const failureHandler = () => {
    setSnackbarText(MESSAGES.FAILURE);
    setIsSnackBarVisible(false);
  };
  const { mutate, isPending } = useMutateCategory({
    base_url: BASE_URL ?? "",
    successHandler,
    failureHandler,
  });

  const backHandler = () => {
    router.back();
  };

  const onSubmit = ({
    type,
    sub_category,
  }: {
    type: Category;
    sub_category: string;
  }) => {
    mutate({
      type,
      sub_category,
    });
  };

  const onSnackbarDismiss = () => {
    setIsSnackBarVisible(false);
  };

  return (
    <Screens.CreateCategory
      snackbarText={snackbarText}
      isLoading={isPending}
      backHandler={backHandler}
      onSubmit={onSubmit}
      isSnackBarVisible={isSnackBarVisible}
      onSnackbarDismiss={onSnackbarDismiss}
    />
  );
};

export default CreateCategory;
