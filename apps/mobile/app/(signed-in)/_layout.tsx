import { Tabs, Stack } from "expo-router";

const SignedInLayout = () => {
  console.log("SignedInLayout");
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default SignedInLayout;
