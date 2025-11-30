import React from "react";
import { SafeLayout } from "../../components/SafeLayout";
import {
  Appbar,
  ActivityIndicator,
  Text,
  RadioButton,
  Button,
  TextInput,
  Snackbar,
} from "react-native-paper";
import { View, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import type { Category } from "@arthsaathi/helpers/types";

type CreateCategoryProps = {
  onSubmit: ({
    type,
    sub_category,
  }: {
    type: Category;
    sub_category: string;
  }) => void;
  backHandler: () => void;
  isSnackBarVisible: boolean;
  onSnackbarDismiss: () => void;
  isLoading: boolean;
  snackbarText: string;
};

const CreateCategory = ({
  onSubmit,
  backHandler,
  isSnackBarVisible,
  onSnackbarDismiss,
  isLoading,
  snackbarText,
}: CreateCategoryProps) => {
  const [value, setValue] = React.useState<Category>("EXPENSE");
  const [text, setText] = React.useState("");
  const screenWidth = Dimensions.get("screen").width;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            backHandler();
          }}
        />
        <Appbar.Content title="Create a sub-category" />
      </Appbar.Header>

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
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 12,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  display: "flex",
                  height: "auto",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    padding: 16,
                  }}
                >
                  <Text variant="titleMedium">Type:</Text>
                </View>

                <RadioButton.Group
                  onValueChange={(newValue) => {
                    console.log(`Pressed ${newValue}`);
                    setValue(newValue as Category);
                  }}
                  value={value}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexDirection: "row",
                      gap: 12,
                      padding: 12,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <RadioButton
                        disabled={isLoading}
                        value="EXPENSE"
                        testID="expense-btn"
                      />
                      <Text variant="bodyLarge">Expense</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <RadioButton
                        disabled={isLoading}
                        value="INCOME"
                        testID="income-btn"
                      />
                      <Text>Income</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>

              <View
                style={{
                  display: "flex",
                  padding: 16,
                  gap: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text variant="titleMedium">Name:</Text>
                <TextInput
                  label="Sub category name, like Food"
                  value={text}
                  testID="sub-category-name"
                  mode="outlined"
                  disabled={isLoading}
                  style={{ width: screenWidth * 0.7 }}
                  onChangeText={(text) => {
                    setText(text);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                flexDirection: "column",
                gap: 12,
                padding: 16,
              }}
            >
              <Button
                icon="check"
                mode="contained"
                disabled={isLoading}
                style={{ width: screenWidth * 0.85 }}
                onPress={() => {
                  onSubmit({
                    type: value,
                    sub_category: text,
                  });
                  setText("");
                }}
              >
                {isLoading && <ActivityIndicator />}
                Submit
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeLayout>
      <Snackbar visible={isSnackBarVisible} onDismiss={onSnackbarDismiss}>
        {snackbarText}
      </Snackbar>
    </>
  );
};

export { CreateCategory };
