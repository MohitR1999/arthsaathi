import React, { useState } from "react";
import { router } from "expo-router";
import { SafeLayout } from "../../components/SafeLayout";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { View, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { useLogin } from "@arthsaathi/helpers/hooks";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const screenWidth = Dimensions.get("screen").width;
  const { mutate, isPending } = useLogin({
    base_url: BASE_URL ?? "",
  });

  return (
    <SafeLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <Text variant="titleLarge">Log in</Text>
          <TextInput
            label="Email"
            mode="outlined"
            inputMode="email"
            value={email}
            testID="email-input"
            disabled={isPending}
            style={{ width: screenWidth * 0.75 }}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry={passwordHidden}
            value={password}
            testID="password-input"
            style={{ width: screenWidth * 0.75 }}
            onChangeText={(p) => setPassword(p)}
            disabled={isPending}
            right={
              <TextInput.Icon
                icon={passwordHidden ? "eye" : "eye-off"}
                onPress={() => setPasswordHidden(!passwordHidden)}
              />
            }
          />
          <Button
            mode="contained-tonal"
            disabled={isPending}
            style={{ marginTop: 8, width: screenWidth * 0.75 }}
            onPress={() => {
              mutate({ email, password });
            }}
          >
            {isPending ? <ActivityIndicator /> : <Text>Login</Text>}
          </Button>

          <Button
            style={{ marginTop: 32 }}
            onPress={() => {
              console.log("Navigating to register route");
              router.navigate("/register");
            }}
          >
            New to ArthSaathi? Register now!
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeLayout>
  );
};

export { Login };
