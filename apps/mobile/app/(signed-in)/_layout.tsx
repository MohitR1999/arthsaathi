import { Stack } from "expo-router";

const SignedInLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default SignedInLayout;
