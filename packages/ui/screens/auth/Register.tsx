import React, { useState } from "react";
import { router } from 'expo-router'
import { SafeLayout } from "../../components/SafeLayout";
import { Text, TextInput, Button } from "react-native-paper";
import { View, Dimensions, KeyboardAvoidingView, Platform } from "react-native";

const Register = () => {
  const screenWidth = Dimensions.get("screen").width;
  const MAX_WIDTH = screenWidth * 0.75;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState<boolean>(true);
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
              justifyContent: 'space-between',
              gap: '4%'
            }}
          >
            <TextInput
              label="First Name"
              mode="outlined"
              value={firstName}
              style={{ width: '48%' }}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              label="Last Name"
              mode="outlined"
              value={lastName}
              style={{ width: '48%' }}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          <TextInput
            label="Email"
            mode="outlined"
            inputMode="email"
            value={email}
            style={{ width: MAX_WIDTH }}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            secureTextEntry={passwordHidden}
            style={{ width: MAX_WIDTH }}
            onChangeText={(text) => setPassword(text)}
            right={
              <TextInput.Icon
                icon={passwordHidden ? 'eye' : 'eye-off'}
                onPress={() => setPasswordHidden(!passwordHidden)}
              />
            }
          />
          <TextInput
            label="Confirm Password"
            mode="outlined"
            value={confirmPassword}
            style={{ width: MAX_WIDTH }}
            secureTextEntry={confirmPasswordHidden}
            onChangeText={(text) => setConfirmPassword(text)}
            right={
              <TextInput.Icon
                icon={confirmPasswordHidden ? 'eye' : 'eye-off'}
                onPress={() => setConfirmPasswordHidden(!confirmPasswordHidden)}
              />
            }
          />
          <Button mode="contained-tonal" disabled={false} style={{ marginTop: 8, width: MAX_WIDTH }} onPress={() => {
            console.log('Pressed!')
            console.log({ email, password })
          }}>
            Register now
          </Button>

          <Button style={{ marginTop: 32 }} onPress={() => {
            console.log('Navigating to login route')
            router.dismissTo('/login')
          }}>
            Already a member? Login now!
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeLayout>
  );
};

export { Register };
