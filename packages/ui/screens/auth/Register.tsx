import React, { useState } from "react";
import { router } from "expo-router";
import { SafeLayout } from "../../components/SafeLayout";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { View, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { UserDetails } from "@arthsaathi/helpers/types";

type RegisterScreenProps = {
  loading: boolean;
  onRegister: (userDetails: UserDetails) => void;
};

const Register = ({ loading, onRegister }: RegisterScreenProps) => {
  const screenWidth = Dimensions.get("screen").width;
  const MAX_WIDTH = screenWidth * 0.75;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] =
    useState<boolean>(true);
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
          <Text variant="titleLarge">Join ArthSaathi!</Text>
          <View
            style={{
              width: MAX_WIDTH,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "4%",
            }}
          >
            <TextInput
              label="First Name"
              mode="outlined"
              testID="first-name"
              value={firstName}
              style={{ width: "48%" }}
              onChangeText={(text) => setFirstName(text)}
              disabled={loading}
            />
            <TextInput
              label="Last Name"
              mode="outlined"
              testID="last-name"
              value={lastName}
              style={{ width: "48%" }}
              onChangeText={(text) => setLastName(text)}
              disabled={loading}
            />
          </View>
          <TextInput
            label="Email"
            mode="outlined"
            inputMode="email"
            testID="email"
            value={email}
            style={{ width: MAX_WIDTH }}
            onChangeText={(text) => setEmail(text)}
            disabled={loading}
          />
          <TextInput
            label="Password"
            mode="outlined"
            testID="password"
            value={password}
            secureTextEntry={passwordHidden}
            style={{ width: MAX_WIDTH }}
            onChangeText={(text) => setPassword(text)}
            disabled={loading}
            right={
              <TextInput.Icon
                icon={passwordHidden ? "eye" : "eye-off"}
                onPress={() => setPasswordHidden(!passwordHidden)}
              />
            }
          />
          <TextInput
            label="Confirm Password"
            mode="outlined"
            testID="confirm-password"
            value={confirmPassword}
            style={{ width: MAX_WIDTH }}
            secureTextEntry={confirmPasswordHidden}
            onChangeText={(text) => setConfirmPassword(text)}
            disabled={loading}
            right={
              <TextInput.Icon
                icon={confirmPasswordHidden ? "eye" : "eye-off"}
                onPress={() => setConfirmPasswordHidden(!confirmPasswordHidden)}
              />
            }
          />
          <Button
            mode="contained-tonal"
            disabled={loading}
            style={{ marginTop: 8, width: MAX_WIDTH }}
            onPress={() => {
              onRegister({ firstName, lastName, email, password });
            }}
          >
            {loading ? <ActivityIndicator /> : <Text>Register now</Text>}
          </Button>

          <Button
            style={{ marginTop: 32 }}
            onPress={() => {
              router.dismissTo("/login");
            }}
          >
            Already a member? Login now!
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeLayout>
  );
};

export { Register };
