import { Screens } from "@arthsaathi/ui";
import { useAuthStore, useProfile } from "@arthsaathi/helpers/hooks";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  const { data, isLoading } = useProfile({ base_url: BASE_URL ?? "" });

  return (
    <Screens.Profile
      loading={isLoading}
      firstName={data?.firstName ?? ""}
      logout={() => {
        logout();
      }}
    />
  );
};

export default Profile;
