import React from "react";
import { SafeLayout } from "../../components";
import { Text, List, useTheme, Divider } from "react-native-paper";
import { View } from "react-native";

type ProfileScreenProps = {
  logout: () => void;
};

const Profile = ({ logout }: ProfileScreenProps) => {
  const theme = useTheme();
  return (
    <SafeLayout>
      <View
        style={{
          paddingHorizontal: 12,
          paddingTop: 12,
        }}
      >
        <Text variant="headlineMedium">Welcome</Text>
      </View>
      <List.Section>
        <List.Subheader>
          <Text variant="titleMedium">Security</Text>
        </List.Subheader>
        <Divider />
        <View
          style={{
            paddingLeft: 12,
          }}
        >
          <List.Item
            title="Logout"
            onPress={() => {
              logout();
            }}
            left={() => (
              <List.Icon color={theme.colors.secondary} icon="logout" />
            )}
            right={() => (
              <List.Icon color={theme.colors.secondary} icon="chevron-right" />
            )}
          />
        </View>
      </List.Section>
    </SafeLayout>
  );
};

export { Profile };
