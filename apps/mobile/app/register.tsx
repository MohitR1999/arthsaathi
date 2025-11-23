import { Screens } from "@arthsaathi/ui";
import { useRegister } from "@arthsaathi/helpers/hooks";
import { UserDetails } from "@arthsaathi/helpers/types";
import { router } from "expo-router";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const Register = () => {
  const successHandler = () => {
    router.dismissTo("/login");
  };
  const { mutate: register, isPending } = useRegister({
    base_url: BASE_URL ?? "",
    success_handler: successHandler,
  });

  return (
    <Screens.Register
      loading={isPending}
      onRegister={(userDetails: UserDetails) => {
        register(userDetails);
      }}
    />
  );
};

export default Register;
