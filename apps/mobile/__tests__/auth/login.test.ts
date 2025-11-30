import { renderRouter, userEvent, screen } from "expo-router/testing-library";
import { createTestRouter } from "../../test-setup/createTestRouter";
import Index from "../../app/index";
import RootLayout from "../../app/_layout";
import SignedInLayout from "../../app/(signed-in)/_layout";
import SignedIn from "../../app/(signed-in)/(tabs)";
import TabLayout from "../../app/(signed-in)/(tabs)/_layout";
import Login from "../../app/login";
import { TestQueryWrapper } from "../../test-setup/wrappers/TestQueryWrapper";

describe("Login screen", () => {
  const user = userEvent.setup();
  let routes: any;

  beforeEach(() => {
    routes = createTestRouter({
      index: Index,
      _layout: RootLayout,
      login: Login,
      register: null,
      "(signed-in)/_layout": SignedInLayout,
      "(signed-in)/(tabs)/_layout": TabLayout,
      "(signed-in)/(tabs)/index": SignedIn,
      "(signed-in)/(tabs)/profile": null,
      "(signed-in)/(tabs)/money": null,
      "(signed-in)/categories": null,
    });
  });

  it("Should navigate to home page when correct credentials are provided", async () => {
    const { findByRole, findByTestId } = renderRouter(routes, {
      initialUrl: "login",
      wrapper: TestQueryWrapper,
    });

    const emailInput = await findByTestId("email-input");
    const passwordInput = await findByTestId("password-input");
    const button = await findByRole("button", { name: "Login" });
    await user.type(emailInput, "test@x.com");
    await user.type(passwordInput, "test-password");
    await user.press(button);
    const loginHeader = screen.queryByText("Log in");
    expect(loginHeader).toBeNull();
  });
});
