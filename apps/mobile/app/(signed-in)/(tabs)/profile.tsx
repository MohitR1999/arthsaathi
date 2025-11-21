import { Screens } from "@arthsaathi/ui";
import { useAuthStore } from '@arthsaathi/helpers/hooks'

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  
  return (
    <Screens.Profile logout={() => {
      logout()
    }} />
  );
}

export default Profile

