import React from "react";
import { SafeLayout } from "../../components";
import {
  Text,
  List,
  useTheme,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { View } from "react-native";

type ProfileScreenProps = {
  logout: () => void;
  firstName: string;
  loading: boolean;
  handleManageCategories: () => void;
};

const Profile = ({
  logout,
  firstName,
  loading,
  handleManageCategories,
}: ProfileScreenProps) => {
  const theme = useTheme();
  return (
    <SafeLayout>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <>
          <View
            style={{
              paddingHorizontal: 12,
              paddingTop: 12,
            }}
          >
            <Text variant="headlineMedium">{`Welcome ${firstName}`}</Text>
          </View>
          <List.Section>
            <List.Subheader>
              <Text variant="titleMedium">Profile</Text>
            </List.Subheader>
            <Divider />
            <View
              style={{
                paddingLeft: 12,
              }}
            >
              <List.Item
                title="Manage Categories"
                onPress={() => {
                  handleManageCategories();
                }}
                left={() => (
                  <List.Icon
                    color={theme.colors.secondary}
                    icon="note-edit-outline"
                  />
                )}
                right={() => (
                  <List.Icon
                    color={theme.colors.secondary}
                    icon="chevron-right"
                  />
                )}
              />
            </View>
          </List.Section>

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
                  <List.Icon
                    color={theme.colors.secondary}
                    icon="chevron-right"
                  />
                )}
              />
            </View>
          </List.Section>
        </>
      )}
    </SafeLayout>
  );
};

export { Profile };
