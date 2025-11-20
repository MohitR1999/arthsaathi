import { SplashScreen } from "expo-router";
import { useAuthStore } from "@arthsaathi/helpers/hooks";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

function SplashScreenController() {
  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await useAuthStore.persist.rehydrate();
      setIsLoading(false);
    })();
  }, []);

  if (!loading) {
    SplashScreen.hide();
  }

  return null;
}

export default SplashScreenController;
