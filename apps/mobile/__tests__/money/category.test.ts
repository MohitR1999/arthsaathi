import "../../test-setup/mockSession";

import { renderRouter, userEvent } from "expo-router/testing-library";
import { createTestRouter } from "../../test-setup/createTestRouter";
import Index from "../../app/index";
import RootLayout from "../../app/_layout";
import TabLayout from "../../app/(signed-in)/(tabs)/_layout";
import TabIndex from "../../app/(signed-in)/(tabs)/";
import SignedInLayout from "../../app/(signed-in)/_layout";
import Profile from "../../app/(signed-in)/(tabs)/profile";
import Money from "../../app/(signed-in)/(tabs)/money";
import Categories from "../../app/(signed-in)/categories";

describe("Money / Sub category tests", () => {
  const user = userEvent.setup();

  it("Should list all sub categories on manage categories page", async () => {
    const routerForRegister = createTestRouter({
      _layout: RootLayout,
      index: Index,
      login: null,
      register: null,
      "(signed-in)/(tabs)/index": TabIndex,
      "(signed-in)/(tabs)/_layout": TabLayout,
      "(signed-in)/_layout": SignedInLayout,
      "(signed-in)/(tabs)/profile": Profile,
      "(signed-in)/(tabs)/money": Money,
      "(signed-in)/categories": Categories,
    });

    const { findByText } = renderRouter(
      routerForRegister,
      {
        initialUrl: "/(signed-in)/(tabs)/profile",
      },
    );
    const profileTab = await findByText("Profile");
    await user.press(profileTab);

    // On manage categories page, list all sub categories
    const manageCategoriesButton = await findByText("Manage Categories");
    await user.press(manageCategoriesButton);

    await findByText("Food - Eating out");
  });
});
