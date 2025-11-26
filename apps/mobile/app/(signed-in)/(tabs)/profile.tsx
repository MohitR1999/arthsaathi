import { router } from 'expo-router'
import { Screens } from "@arthsaathi/ui";
import { useAuthStore, useProfile } from "@arthsaathi/helpers/hooks";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  const { data, isLoading } = useProfile({ base_url: BASE_URL ?? "" });
  const handleManageCategories = () => {
    console.log("Navigating to manage categories")
    router.navigate("/categories");
  }

  return (
    <Screens.Profile
      loading={isLoading}
      firstName={data?.firstName ?? ""}
      logout={() => {
        logout();
      }}
      handleManageCategories={handleManageCategories}
    />
  );
};

export default Profile;
