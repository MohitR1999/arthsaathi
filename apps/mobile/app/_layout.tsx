import { Stack } from "expo-router";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { useAuthStore } from "@arthsaathi/helpers/hooks";
import SplashScreenController from "./splash";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const theme = {
  ...MD3DarkTheme,
};

const queryClient = new QueryClient();

const RootNavigator = () => {
  const jwt = useAuthStore((state) => state.jwt);
  const signedIn = !!jwt;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={signedIn}>
        <Stack.Screen name="(signed-in)" />
      </Stack.Protected>

      <Stack.Protected guard={!signedIn}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="login"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen name="register" />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <PaperProvider theme={theme}>
          <SplashScreenController />
          <RootNavigator />
        </PaperProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
