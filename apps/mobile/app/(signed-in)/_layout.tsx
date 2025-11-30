import { Stack } from "expo-router";

const SignedInLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="categories" options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="create-category" options={{ animation: "slide_from_bottom", animationDuration: 50 }} />
    </Stack>
  );
};

export default SignedInLayout;
