import React, { useState } from "react";
import { router } from 'expo-router'
import { SafeLayout } from "../../components/SafeLayout";
import { Text, TextInput, Button } from "react-native-paper";
import { View, Dimensions, KeyboardAvoidingView, Platform } from "react-native";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const screenWidth = Dimensions.get("screen").width;

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
          <Text variant="displayMedium">Log in</Text>
          <TextInput
            label="Email"
            mode="outlined"
            inputMode="email"
            value={email}
            style={{ width: screenWidth * 0.75 }}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry={passwordHidden}
            value={password}
            style={{ width: screenWidth * 0.75 }}
            onChangeText={(p) => setPassword(p)}
            right={
              <TextInput.Icon
                icon={passwordHidden ? 'eye' : 'eye-off'}
                onPress={() => setPasswordHidden(!passwordHidden)}
              />
            }
          />
          <Button mode="contained-tonal" disabled={false} style={{ marginTop: 8, width: screenWidth * 0.75 }} onPress={() => {
            console.log('Pressed!')
            console.log({ email, password })
          }}>
            Login
          </Button>

          <Button style={{ marginTop: 32 }} onPress={() => {
            console.log('Navigating to register route')
            router.navigate('/register')
          }}>
            New to ArthSaathi? Register now!
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeLayout>
  );
};

export { Login };
