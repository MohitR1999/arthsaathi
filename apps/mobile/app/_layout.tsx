import { Stack } from "expo-router";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";

const theme = {
  ...MD3DarkTheme,
};

const RootNavigator = () => {
  const signedIn = false;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!signedIn}>
        <Stack.Screen name="(signed-in)" />
      </Stack.Protected>

      <Stack.Protected guard={!signedIn}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name="register" />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <RootNavigator />
    </PaperProvider>
  );
}
