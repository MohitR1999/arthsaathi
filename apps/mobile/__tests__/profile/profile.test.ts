import "../../test-setup/mockSession";

import { renderRouter, userEvent } from "expo-router/testing-library";
import { createTestRouter } from "../../test-setup/createTestRouter";
import SignedInLayout from "../../app/(signed-in)/_layout";
import Profile from "../../app/(signed-in)/(tabs)/profile";
import Index from "../../app/index";
import RootLayout from "../../app/_layout";
import TabLayout from "../../app/(signed-in)/(tabs)/_layout";
import TabIndex from "../../app/(signed-in)/(tabs)/";
import { TestQueryWrapper } from "../../test-setup/wrappers/TestQueryWrapper";

describe("Profile tests", () => {
  const user = userEvent.setup();
  const routerForLogin = createTestRouter({
    _layout: RootLayout,
    index: Index,
    login: null,
    register: null,
    "(signed-in)/(tabs)/index": TabIndex,
    "(signed-in)/(tabs)/_layout": TabLayout,
    "(signed-in)/_layout": SignedInLayout,
    "(signed-in)/(tabs)/profile": Profile,
    "(signed-in)/(tabs)/money": null,
    "(signed-in)/categories": null,
  });

  it("Should show username when navigated to profile page", async () => {
    const { findByText } = renderRouter(routerForLogin, {
      initialUrl: "(signed-in)/(tabs)",
      wrapper: TestQueryWrapper,
    });
    const profileTabButton = await findByText("Profile");
    await user.press(profileTabButton);
    
    await findByText("Welcome John")
  });
});
