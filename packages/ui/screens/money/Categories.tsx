import React from "react";
import { SafeLayout } from "../../components/SafeLayout";
import {
  FAB,
  SegmentedButtons,
  Appbar,
  List,
  Surface,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
} from "react-native";
import { Category, SubCategory } from "@arthsaathi/helpers/types";
import { router } from "expo-router";

type CategoriesProps = {
  backHandler: () => void;
  categoryValue: Category;
  categoryValueChangeHandler: (value: Category) => void;
  items: SubCategory[];
  loading: boolean;
};

const ListItem = ({ sub_category, category, id }: SubCategory) => {
  const theme = useTheme();
  const screenWidth = Dimensions.get("screen").width;
  return (
    <Surface
      elevation={0}
      style={{
        backgroundColor: theme.colors.backdrop,
        borderRadius: 10,
        marginTop: 8,
        flex: 1,
      }}
    >
      <List.Item
        style={{
          width: screenWidth * 0.9,
        }}
        onLongPress={() => {
          console.log(`Long press with id: ${id}`)
        }}
        title={sub_category}
        left={(props) => {
          if (category === "EXPENSE") {
            return <List.Icon {...props} icon="cash-fast" />;
          } else {
            return <List.Icon {...props} icon="cash-refund" />;
          }
        }}
      />
    </Surface>
  );
};

const Categories = ({
  backHandler,
  categoryValue,
  categoryValueChangeHandler,
  items,
  loading,
}: CategoriesProps) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            backHandler();
          }}
        />
        <Appbar.Content title="Manage Categories" />
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
              padding: 16,
            }}
          >
            <>
              <SegmentedButtons
                value={categoryValue}
                onValueChange={categoryValueChangeHandler}
                buttons={[
                  {
                    value: "EXPENSE",
                    label: "Expense",
                    icon: "cash-minus",
                  },

                  {
                    value: "INCOME",
                    label: "Income",
                    icon: "cash-plus",
                  },
                ]}
              />
              {loading ? (
                <ActivityIndicator
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              ) : (
                <FlatList
                  style={{
                    flex: 1,
                  }}
                  data={items}
                  renderItem={({ item }) => (
                    <ListItem {...item} key={item.id} />
                  )}
                />
              )}
            </>
          </View>
          <FAB
            icon="plus"
            testID="create"
            onPress={() => {
              router.navigate("/create-category");
            }}
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
          />
        </KeyboardAvoidingView>
      </SafeLayout>
    </>
  );
};

export { Categories };
