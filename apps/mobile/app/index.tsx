import { router } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Components } from "@arthsaathi/ui";

export default function Index() {
  return (
    <Components.SafeLayout>
      <View
        style={{
          flex: 21,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text variant="titleLarge">Welcome to ArthSaathi!</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button mode="outlined" onPress={() => { router.navigate('/login') }}>
          <Text>Get started</Text>
        </Button>
      </View>
    </Components.SafeLayout>
  );
}
