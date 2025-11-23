import "../../test-setup/mockSession";

import { renderRouter, userEvent } from "expo-router/testing-library";
import { createTestRouter } from "../../test-setup/createTestRouter";
import SignedInLayout from "../../app/(signed-in)/_layout";
import Profile from "../../app/(signed-in)/(tabs)/profile";
import Index from "../../app/index";
import RootLayout from "../../app/_layout";
import Login from "../../app/login";
import Register from "../../app/register";
import { TestQueryWrapper } from "../../test-setup/wrappers/TestQueryWrapper";

describe("Profile tests", () => {
  const user = userEvent.setup();

  const routerForLogin = createTestRouter({
    _layout: RootLayout,
    index: Index,
    "(signed-in)/_layout": SignedInLayout,
    "(signed-in)/(tabs)/profile": Profile,
  });

  it("Should navigate to index page when logout is pressed", async () => {
    const { findByText } = renderRouter(routerForLogin, {
      initialUrl: "(signed-in)/(tabs)/profile",
      wrapper: TestQueryWrapper,
    });
    
    await findByText("Welcome John")
  });
});
