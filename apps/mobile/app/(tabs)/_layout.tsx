import { Tabs } from "expo-router";

const SignedInLayout = () => {
  console.log("SignedInLayout");
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
    </Tabs>
  );
};

export default SignedInLayout;
