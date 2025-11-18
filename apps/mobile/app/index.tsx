import { router } from "expo-router";
import { View, Dimensions } from "react-native";
import { Button, Text } from "react-native-paper";
import { Components } from "@arthsaathi/ui";

export default function Index() {
  const screenWidth = Dimensions.get("screen").width;

  return (
    <Components.SafeLayout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Text variant="titleLarge">Welcome to ArthSaathi!</Text>
        <Button
          mode="contained-tonal"
          style={{
            width: screenWidth * 0.50,
          }}
          onPress={() => {
            router.navigate("/login");
          }}
        >
          <Text>Get started</Text>
        </Button>
      </View>
    </Components.SafeLayout>
  );
}
